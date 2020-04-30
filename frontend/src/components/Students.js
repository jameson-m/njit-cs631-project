import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import { loginStudent } from '../store/actions';

const Students = ({ loginStudent, history }) => {
  const [ studentId, setStudentId ] = useState('');

  const login = studentId => {
    loginStudent(studentId);
    history.push('/students/register');
  };

  return (
    <Container>
      <h2>Students Log In</h2>
      <br />
      <Form>
        <Form.Group controlId="formStudentId">
          <Form.Label>Student ID</Form.Label>
          <Form.Control
            type="text"
            autoComplete="false"
            onChange={e => setStudentId(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" disabled />
        </Form.Group>
        <Form.Group controlId="formRememberCheckbox">
          <Form.Check type="checkbox" label="Remember me" disabled />
        </Form.Group>

        <Button variant="primary" onClick={() => login(studentId)}>
          Submit
        </Button>
      </Form>
    </Container>
  );
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, { loginStudent })(withRouter(Students));
