import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Page from './Page';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageData: {
        karst: {
          html: '<h1>Karst</h1>',
          key: 'karst',
        },
      },
    };
  }

  componentDidMount() {
    fetch('/api/page_data')
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
