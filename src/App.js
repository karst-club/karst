import React from "react";
import "./App.css";
// import headerImage from './woodcuts_13.jpg';

function PageHeader(props) {
  const imgUrl = require("../flask_api/static/" + props.image)
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

class ParentPageNav extends React.Component {
  constructor(props) {
    super(props);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handlePageChange(page) {
    this.props.onPageChange(page);
  }

  render() {
    return (
      <div className="ParentPageNav">
        <a onClick={() =>
          this.handlePageChange(this.props.parentPage)}>{this.props.parentPage}</a>
           ->
        <a onClick={() =>
          this.handlePageChange(this.props.currentPage)}>{this.props.currentPage}</a>
      </div>
    );
  }
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
    return (
      <div className="SubPageNav">
        <ul className="SubPageNav">{listItems}</ul>
      </div>
    );
  }
}

function Page(props) {
  return (
    <div className="Page">
      <PageHeader image={props.pageData.image} />
      <div className="Page-content">
        <PageIcon emoji={props.pageData.icon} />
        <ParentPageNav
          currentPage={props.page}
          parentPage={props.pageData.parent_page}
          onPageChange={props.onPageChange}
        />
        <div dangerouslySetInnerHTML={{__html: props.pageData.html}} />
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
      currentPage: 'home',
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
        this.handlePageChange('home');
      });
  }

  render() {
    return (
      <div className="App">
        <Page
          page={this.state.currentPage}
          pageData={this.state.currentPageData}
          onPageChange={this.handlePageChange}
        />
      </div>
    );
  }
}

export default App;
