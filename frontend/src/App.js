import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Container, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import logo from './images/logo-njit.png';
import Main from './components/Main';
import Students from './components/Students';
import Register from './components/Register';
import Faculty from './components/Faculty';
import ClassList from './components/ClassList';

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
            <Link to="/">
              <Image style={{ height: '5rem' }} src={logo} />
            </Link>
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
            <Route exact path="/faculty">
              <Faculty />
            </Route>
            <Route exact path="/faculty/class-list">
              <ClassList />
            </Route>
          </Switch>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
