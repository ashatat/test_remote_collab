import { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
} from "react-router-dom";
import axios from "axios";

import "./App.css";

import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import ContactUS from "./pages/ContactUS";
import AboutUs from "./pages/AboutUs";
import Login from "./pages/Login";

class App extends Component {
  state = {
    isAuthenticated: false,
  };

  handleLogin = () => {
    this.setState({ isAuthenticated: true });
  };

  handleLogout = () => {
    // send get request /auth/logout
    this.setState({ isAuthenticated: false });
  };

  componentDidMount() {
    axios.get("/v1/user/info").then((res) => {
      this.handleLogin();
    });
  }

  render() {
    const { isAuthenticated } = this.state;
    return (
      <div className="App">
        <Router>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/contact-us">contact us</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <button onClick={this.handleLogout}>logout </button>
              </li>
            </ul>
          </nav>
          <Switch>
            <PrivateRoute isAuthenticated={isAuthenticated} exact path="/">
              <Home />
            </PrivateRoute>
            <Route exact path="/login">
              <Login handleLogin={this.handleLogin} />
            </Route>
            <Route exact path="/contact-us">
              <ContactUS handleLogin={this.handleLogin} />
            </Route>
            <PrivateRoute isAuthenticated={isAuthenticated} exact path="/about">
              <AboutUs />
            </PrivateRoute>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
