import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Students = ({}) => {
  return (
    <Container>
      <h2>Students Log In</h2>
      <br />
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Student ID</Form.Label>
          <Form.Control type="text" autoComplete="false" />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" disabled />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Remember me" disabled />
        </Form.Group>
        <Button variant="primary" as={Link} to="/students/register">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default Students;
