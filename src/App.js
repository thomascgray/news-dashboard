import React, { Component } from "react";

import Home from "./home/home";
import ThemeSwitcher from "./components/themeSwitcher.js";

class App extends Component {
  render() {
    return (
      <main>
        <ThemeSwitcher />
        <Home />
      </main>
    );
  }
}

export default App;
