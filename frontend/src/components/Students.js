import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { login } from '../store/actions';

const Students = ({ login, history }) => {
  const [ studentId, setStudentId ] = useState('');

  const handleLogin = studentId => {
    let studentIdInt = parseInt(studentId);
    axios({
      method: 'POST',
      // baseUrl: 'localhost:4444',
      // url: 'http://127.0.0.1:4444/login',
      url: 'http://ec2-18-224-40-4.us-east-2.compute.amazonaws.com:4444/login',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        studentId: studentIdInt,
      },
    })
      .then(res => {
        if (res.status === 200) {
          login({ userType: 'student', id: studentIdInt });
          history.push('/students/register');
        } else {
          throw new Error('Error received while logging in. Please try again.');
        }
      })
      .catch(err => {
        console.log(err);
      });
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

        <Button variant="primary" onClick={() => handleLogin(studentId)}>
          Submit
        </Button>
      </Form>
    </Container>
  );
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, { login })(withRouter(Students));
