import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import students from '../images/students.jpg';
import faculty from '../images/faculty.jpg';

const Main = ({}) => {
  return (
    <div id="login-options">
      <Card style={{ width: '20rem', margin: 'auto' }}>
        <Card.Img variant="top" src={students} />
        <Card.Body>
          <Card.Title>Students</Card.Title>
          <Card.Text>Sign in to register for classes.</Card.Text>
          <Card.Link as={Link} to={'/students'}>
            Log In
          </Card.Link>
        </Card.Body>
      </Card>
      <Card style={{ width: '20rem', margin: 'auto' }}>
        <Card.Img variant="top" src={faculty} />
        <Card.Body>
          <Card.Title>Faculty</Card.Title>
          <Card.Text>Sign in to view course information.</Card.Text>
          <Card.Link as={Link} to={'/faculty'}>
            Log In
          </Card.Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Main;
