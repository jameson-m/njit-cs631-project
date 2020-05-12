import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import { login } from '../store/actions';

const Faculty = ({ login, history }) => {
  const [ ssn, setSSN ] = useState('');

  const handleLogin = ssn => {
    login({ userType: 'faculty', id: ssn });
    history.push('/faculty/class-list');
  };

  return (
    <Container>
      <h2>Faculty Log In</h2>
      <br />
      <Form>
        <Form.Group controlId="formSSN">
          <Form.Label>Faculty SSN</Form.Label>
          <Form.Control type="text" autoComplete="false" onChange={e => setSSN(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" disabled />
        </Form.Group>
        <Form.Group controlId="formRememberCheckbox">
          <Form.Check type="checkbox" label="Remember me" disabled />
        </Form.Group>

        <Button variant="primary" onClick={() => handleLogin(ssn)}>
          Submit
        </Button>
      </Form>
    </Container>
  );
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, { login })(withRouter(Faculty));
