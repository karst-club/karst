import React, { Component } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Page from './Page';

const AppContent = styled.div`
  font-family: 'Vollkorn', serif;
  background: #fefef5;
  color: #503e3a;
  h1 {
    color: #9a4456;
  }
  h2,
  h3,
  h4,
  h5 {
    color: #429c91;
  }
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        pages: {
          pageData: {
            karst: {
              html: '<h1>Karst</h1>',
              key: 'karst',
            },
          },
        },
      },
    };
  }

  componentDidMount() {
    fetch('/api/page_data')
      .then((res) => res.json())
      .then((data) => {
        this.setState({ data: data });
      });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <AppContent>
            <Switch>
              <Route exact path="/">
                <Page data={this.state.data} />
              </Route>
              <Route
                path="/:pageId"
                children={<Page data={this.state.data} />}
              />
            </Switch>
          </AppContent>
        </div>
      </Router>
    );
  }
}

export default App;
