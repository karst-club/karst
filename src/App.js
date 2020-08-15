import React from "react";
import "./App.css";
import headerImage from './woodcuts_13.jpg';

function PageHeader(props) {
  return (
    <header>
      <div className="Page-header">
        <img src={headerImage} className="Page-header-image" alt="header image" />
      </div>
    </header>
  );
}

function PageIcon(props) {
  return (
    <div className="Page-header-icon">
      <span className="Page-header-icon" role="image" aria-label={props.emoji} >
          {props.emoji}
      </span>
    </div>
  )
}

function LandingPage(props) {
  return (
    <div className="Page">
      <PageHeader image="woodcuts_13.jpg" />
      <div className="Page-content">
        <PageIcon emoji="🏞️" />
        <h1>Karst</h1>
        <p>A downtempo post-apocalyptic RPG with themes of adventure, exploration, and soft terror.</p>
        <h2>Hook</h2>
        <p>It has been a generation since the last boat arrived or returned from the now distant shores of our various homelands. Out here in the Archipelago, life has gone on. Most folk cling to island shores. Here, they form alliances with their neighbors and tend to the dying embers of civilization. Still others, restless and possessed, strike out to seek their fortune upon the waves.</p>
        <p>You are one of these folk, out for glory, riches, power, or similar.</p>
      </div>
    </div>
  );
}

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <LandingPage />
      </div>
    );
  }
}

export default App;
