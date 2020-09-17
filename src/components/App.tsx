import React, { Component } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Page from './Page';
import KarstAPIResponse from '../types/KarstAPIResponse';

export interface Props {}

export interface State {
  data?: KarstAPIResponse;
}

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

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {data: undefined};
  }

  componentDidMount() {
    fetch('/api/page_data')
      .then(res => res.json())
      .then(data => {
        this.setState({ data: data});
      });
  }

  render() {
    const { data } = this.state;
    if (!data) {
      return (
        <h1>Loading Karst</h1>
      )
    };

    return (
      <Router>
        <div className="App">
          <AppContent>
            <Switch>
              <Route exact path="/">
                <Page data={data} />
              </Route>
              <Route path="/:pageId" children={<Page data={data} />} />
            </Switch>
          </AppContent>
        </div>
      </Router>
    );
  }
}

export default App;
