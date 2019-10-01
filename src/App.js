import React, { Component } from "react";

/*import logo from './logo.svg';*/
import './css/App.css';
import FormContainer from "./containers/FormContainer";


class App extends Component {
  render() {
    return (
      <div className = "App">
        <div className = "container">
          <FormContainer />
        </div>
    </div>
    );
  }
}

export default App;
