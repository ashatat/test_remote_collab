import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Login from './pages/Login';
import Nav from './components/Nav';
import E404 from './pages/E404';

function App() {
  const [counter, setCounter] = useState(1);

  return (
    <div>
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/login">
            {counter > 1 ? <Redirect to="/a/about-us" /> : <Login />}
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/a">
            <Switch>
              <Route exact path="/a/about-us/:id">
                <AboutUs />
              </Route>
              <Route exact path="/a/about-them">
                <AboutUs />
              </Route>
            </Switch>
          </Route>
          <Route path="/404">
            <E404 />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
