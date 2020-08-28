import React from "react";
import MDX from "@mdx-js/runtime";
import {
  BrowserRouter as Router,
  Switch,
  Link,
  Route,
  useParams,
} from "react-router-dom";

import "./App.css";

function PageHeader(props) {
  const img = props.image || "woodcuts_13.jpg";
  const imgUrl = require("../flask_api/static/media/" + img);
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
      <span className="Page-header-icon">{props.emoji}</span>
    </div>
  );
}

function ParentPageNavLink(props) {
  if (props.pageData) {
    const linkUrl = "/" + props.pageData.key;
    return (
      <div className="ParentPageNavLink">
        <Link className="NavLink" to={linkUrl}>
          {props.pageData.icon} {props.pageData.title}
        </Link>
      </div>
    );
  }
  return <div />;
}

function ParentPageNav(props) {
  let pageLineage = [];

  let constructLineage = (pageId) => {
    // recursively trace navigation lineage
    let currentPageData = props.allPageData[pageId];
    pageLineage.push(currentPageData);
    if (currentPageData && currentPageData.parent_page) {
      constructLineage(currentPageData.parent_page);
    }
  };

  constructLineage(props.currentPage);

  const parentNavItems = pageLineage
    .reverse()
    .map((pageData) => (
      <ParentPageNavLink key={pageData.key} pageData={pageData} />
    ));

  return <div className="ParentPageNav">{parentNavItems}</div>;
}

function SubPageNav(props) {
  const subpages = props.subpages || [];
  const listItems = subpages.map((subpage) => (
    <li key={subpage.title}>
      <Link className="NavLink" to={subpage.key}>
        {subpage.icon} {subpage.title}
      </Link>
    </li>
  ));
  if (subpages.length > 0) {
    return (
      <div className="SubPageNav">
        <hr />
        <h1>Subpages</h1>
        <ul className="SubPageNav">{listItems}</ul>
      </div>
    );
  }
  return <div />;
}

function Page(props) {
  let { pageId } = useParams();
  pageId = pageId || "karst";
  const currentPageData = props.allPageData[pageId];

  if (!currentPageData) {
    return (
      <div>
        <h1>Page {pageId} Not Found</h1>
      </div>
    );
  }
  let portraitImageContent;
  let headerImageName;

  if (currentPageData.layout === "portrait") {
    const imgUrl = require("../flask_api/static/media/" +
      currentPageData.image);
    portraitImageContent = (
      <div>
        <img src={imgUrl} className="Page-portrait-image" alt="header" />
      </div>
    );
    headerImageName = "woodcuts_13.jpg";
  } else {
    headerImageName = currentPageData.image;
  }
  return (
    <div className="Page">
      <PageHeader image={headerImageName} />
      <div className="Page-content">
        <PageIcon emoji={currentPageData.icon} />
        <ParentPageNav currentPage={pageId} allPageData={props.allPageData} />
        <div className="Page-portrait-container">
          <div>
            <h1>{currentPageData.title}</h1>
            <div className="Page-data-html">
              <MDX>{currentPageData.content}</MDX>
            </div>
          </div>
          {portraitImageContent}
        </div>
        <SubPageNav subpages={currentPageData.subpages} />
      </div>
    </div>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageData: {
        karst: {
          html: "<h1>Karst</h1>",
          key: "karst",
        },
      },
    };
  }

  componentDidMount() {
    fetch("/api/page_data")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ pageData: data.pages });
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
