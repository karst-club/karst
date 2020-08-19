import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Link,
  Route,
  useParams
} from "react-router-dom";

import "./App.css";


function PageHeader(props) {
  const img = props.image || 'woodcuts_13.jpg';;
  const imgUrl = require("../flask_api/static/media/" + img)
  return (
    <header>
      <div className="Page-header">
        <img src={imgUrl} className="Page-header-image" alt="header" />
      </div>
    </header>
  );
}

function PageIcon(props) {
  return (
    <div className="Page-header-icon">
      <span className="Page-header-icon">
        {props.emoji}
      </span>
    </div>
  )
}

function ParentPageNavLink(props) {
  if (props.pageData) {
    const linkUrl = "/" + props.pageData.key
    return (
      <div>
        <Link className="NavLink" to={linkUrl}>
          {props.pageData.icon} {props.pageData.title}
        </Link>
      </div>
    )
  }
  return ( <div /> )
}

function ParentPageNav(props) {
  return (
    <div className="ParentPageNav">
      <ParentPageNavLink
        pageData={props.parentPageData}
        onPageChange={props.onPageChange}
      />

      <ParentPageNavLink
        pageData={props.currentPageData}
        onPageChange={props.onPageChange}
      />
    </div>
  );
}

function SubPageNav(props) {
  const subpages = props.subpages || [];
  const listItems = subpages.map((subpage) =>
    <li key={subpage.title}>
      <Link className="NavLink" to={subpage.key}>
        {subpage.icon} {subpage.title}
      </Link>
    </li>
  );
  if (subpages.length > 0) {
    return (
      <div className="SubPageNav">
        <hr />
        <h1>Subpages</h1>
        <ul className="SubPageNav">{listItems}</ul>
      </div>
    );
  }
  return <div />
}

function Page(props) {
  let { pageId } = useParams();
  const currentPageData = props.allPageData[pageId] || {};
  const parentPageData = props.allPageData[currentPageData.parent_page];
  let portraitImageContent;
  let headerImageName;

  if (currentPageData.layout == 'portrait') {
    const imgUrl = require("../flask_api/static/media/" + currentPageData.image);
    portraitImageContent = ( <div>
        <img src={imgUrl} className="Page-portrait-image" alt="header" />
      </div>);
    headerImageName = 'woodcuts_13.jpg'
  } else {
    headerImageName = currentPageData.image
  }
  return (
    <div className="Page">
      <PageHeader image={headerImageName} />
      <div className="Page-content">
        <PageIcon emoji={currentPageData.icon} />
        <ParentPageNav
          currentPageData={currentPageData}
          parentPageData={parentPageData}
        />
        <div className="Page-portrait-container">
          <div>
            <h1>{currentPageData.title}</h1>
            <div
              className="Page-data-html"
              dangerouslySetInnerHTML={{__html: currentPageData.html}} />
          </div>
          {portraitImageContent}
        </div>
        <SubPageNav
          subpages={currentPageData.subpages}
        />
      </div>
    </div>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {pageData: {}}
  }

  componentDidMount() {
    fetch('/api/page_data')
      .then(res => res.json())
      .then(data => {
        this.setState({pageData: data.pages});
      });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
          <Route exact path="/">
            <Page allPageData={this.state.pageData} />
          </Route>
            <Route
              path="/:pageId"
              children={<Page allPageData={this.state.pageData} />}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
