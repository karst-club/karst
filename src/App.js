import React from "react";
import "./App.css";

function PageHeader(props) {
  const imgUrl = require("../flask_api/static/media/" + props.image)
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

class ParentPageNavLink extends React.Component {

  constructor(props) {
    super(props);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handlePageChange(page) {
    this.props.onPageChange(page);
  }

  render () {
    if (this.props.pageData) {
      return (
        <div>
           {this.props.pageData.icon}
           <a onClick={() =>
             this.handlePageChange(this.props.pageData.key)
           }>{this.props.pageData.title}</a>
        </div>
      )
    }
    return ( <div /> )
  }
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

class SubPageNav extends React.Component {
  constructor(props) {
    super(props);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handlePageChange(page) {
    this.props.onPageChange(page);
  }

  render() {
    const subpages = this.props.subpages;
    const listItems = subpages.map((subpage) =>
      <li key={subpage.title}>
        {subpage.icon} <a onClick={() =>
          this.handlePageChange(subpage.key)}>{subpage.title}</a>
      </li>
    );
    if (this.props.subpages.length > 0) {
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
}

function Page(props) {
  const parentPageData = props.allPageData[props.pageData.parent_page];
  let portraitImageContent;
  let headerImageName;
  if (props.pageData.layout == 'portrait') {
    const imgUrl = require("../flask_api/static/media/" + props.pageData.image);
    portraitImageContent = ( <div>
        <img src={imgUrl} className="Page-portrait-image" alt="header" />
      </div>);
    headerImageName = 'woodcuts_13.jpg'
  } else {
    headerImageName = props.pageData.image
  }
  return (
    <div className="Page">
      <PageHeader image={headerImageName} />
      <div className="Page-content">
        <PageIcon emoji={props.pageData.icon} />
        <ParentPageNav
          currentPageData={props.pageData}
          parentPageData={parentPageData}
          onPageChange={props.onPageChange}
        />
        <div className="Page-portrait-container">
          <div>
            <h1>{props.pageData.title}</h1>
            <div
              className="Page-data-html"
              dangerouslySetInnerHTML={{__html: props.pageData.html}} />
          </div>
          {portraitImageContent}
        </div>
        <SubPageNav
          subpages={props.pageData.subpages}
          onPageChange={props.onPageChange}
        />
      </div>
    </div>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageData: {},
      currentPage: 'karst',
      currentPageData: {'subpages': [], 'image': 'woodcuts_13.jpg'},
    }
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handlePageChange(page) {
    this.setState({currentPage: page});
    this.setState({
      currentPageData: this.state.pageData[page]
    });
  }

  componentDidMount() {
    fetch('/api/page_data')
      .then(res => res.json())
      .then(data => {
        this.setState({pageData: data.pages});
        this.handlePageChange('karst');
      });
  }

  render() {
    return (
      <div className="App">
        <Page
          page={this.state.currentPage}
          pageData={this.state.currentPageData}
          allPageData={this.state.pageData}
          onPageChange={this.handlePageChange}
        />
      </div>
    );
  }
}

export default App;
