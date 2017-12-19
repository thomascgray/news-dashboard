// Slimline version of https://inclusive-components.design/a-theme-switcher/

import React, { Component } from "react";
import "./themeSwitcher.css";

export default class ThemeSwitcher extends Component {
  constructor(props) {
    super(props);
    this.store = typeof localStorage === "undefined" ? null : localStorage;

    this.state = {
      theme: null
    };

    // Cheeky color inverting CSS for dark theme
    this.themes = {
      light: ``,
      dark: `
        html { filter: invert(100%); background: #fefefe; }
        * { background-color: inherit }
        img:not([src*=".svg"]), video { filter: invert(100%) }
    `
    };
  }

  componentDidMount() {
    // Retrieve theme from local storage
    this.store &&
      this.setState({
        theme: this.store.theme || null
      });
  }

  componentDidUpdate() {
    // Bosh theme into local storage
    this.store && this.store.setItem("theme", this.state.theme);
  }

  // Change theme
  setTheme = theme => e => {
    this.setState({
      theme: theme
    });
  };

  render() {
    const buttons = [];
    for (let theme in this.themes) {
      buttons.push(
        <button
          aria-pressed={this.state.theme === theme}
          onClick={this.setTheme(theme)}
          className={"button button--" + theme}
          key={theme}
        >
          {theme}
        </button>
      );
    }
    return (
      <div className="theme-switcher">
        {buttons}
        {this.state.theme === "dark" ? (
          <style>{this.themes[this.state.theme]}</style>
        ) : (
          ""
        )}
      </div>
    );
  }
}
