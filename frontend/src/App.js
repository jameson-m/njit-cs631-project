import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Container, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import Main from './components/Main';
import Students from './components/Students';
import Register from './components/Register';
import logo from './images/logo-njit.png';

function App() {
  return (
    <Fragment>
      <Router>
        <div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              padding: '10px',
            }}
          >
            <Image style={{ height: '5rem' }} src={logo} />
          </div>
          <Switch>
            <Route exact path="/">
              <Container style={{ marginTop: '100px' }}>
                <Main />
              </Container>
            </Route>
            <Route exact path="/students">
              <Students />
            </Route>
            <Route exact path="/students/register">
              <Register />
            </Route>
          </Switch>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
