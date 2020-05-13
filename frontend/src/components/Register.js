import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Table, Card, Form, Button } from 'react-bootstrap';
import { fetchDepartments, fetchCourses, fetchSectionsStudent } from '../utils/api';

const Register = ({ studentId }) => {
  const [ departments, setDepartments ] = useState([]);
  const [ courses, setCourses ] = useState([]);
  const [ sections, setSections ] = useState([]);
  const [ selectedDepartment, setSelectedDepartment ] = useState(null);
  const [ selectedCourse, setSelectedCourse ] = useState(null);

  useEffect(() => {
    fetchDepartments('/student')
      .then(departments => setDepartments(departments))
      .catch(err => alert(err.message));
  }, []);

  // Functions
  const register = sectionNumber => {
    console.log('registered for section', sectionNumber);
  };

  return (
    <Container>
      <h2 style={{ marginTop: '15px', marginBottom: '25px' }}>Register For Classes</h2>

      {/* COURSE FILTER */}
      <Card>
        <Card.Body>
          <p>Select the department and course to view all sections for the current semester.</p>
          <Form>
            <Row>
              <Col>
                <Form.Group controlId="form.semesterSelect">
                  <Form.Label>Semester</Form.Label>
                  <Form.Control as="select" onChange={e => console.log(e.target.value)}>
                    <option />
                    <option value="fall">Fall</option>
                    <option value="spring" disabled>
                      Spring
                    </option>
                    <option value="summer" disabled>
                      Summer
                    </option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="form.yearSelect">
                  <Form.Label>Year</Form.Label>
                  <Form.Control as="select" onChange={e => console.log(e.target.value)}>
                    <option />
                    <option value="2020">2020</option>
                    <option value="2021" disabled>
                      2021
                    </option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="form.DepartmentSelect">
              <Form.Label>Department</Form.Label>
              <Form.Control
                as="select"
                onChange={e => {
                  let departmentCode = e.target.value;
                  setSelectedDepartment(departmentCode);
                  fetchCourses('/student', departmentCode)
                    .then(courses => setCourses(courses))
                    .catch(err => alert(err.message));
                }}
              >
                <option />
                {departments.map(({ departmentCode, departmentName }) => (
                  <option key={departmentCode} value={departmentCode}>
                    {departmentName}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="form.CourseSelect">
              <Form.Label>Courses</Form.Label>
              <Form.Control
                as="select"
                onChange={e => {
                  let courseNumber = e.target.value;
                  let selected = courses.find(c => c.courseNumber === parseInt(courseNumber));
                  setSelectedCourse(selected);
                  fetchSectionsStudent(studentId, courseNumber)
                    .then(sections => setSections(sections))
                    .catch(err => alert(err.message));
                }}
                disabled={!selectedDepartment}
              >
                <option />
                {courses.map(({ courseName, courseNumber }) => (
                  <option key={courseNumber} value={courseNumber}>
                    {courseName}&nbsp;({courseNumber})
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>

          <br />

          {/* COURSE SECTIONS */}
          <h3>Sections for Course</h3>
          <p>Click on a section's row to register for the course.</p>
          <Table hover size="md" responsive="md">
            <thead className="thead-light">
              <tr>
                <th>Course</th>
                <th>Section</th>
                <th>Instructor</th>
                <th colSpan={2}>Availability</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {sections.map(section => (
                <tr key={section.sectionNumber}>
                  <td>{selectedCourse.courseName}</td>
                  <td>{section.sectionNumber}</td>
                  <td>{`${section.firstName} ${section.lastName}`}</td>
                  <td>{section.capacity - section.count}</td>
                  <td>{section.capacity}</td>
                  <td>
                    <Button
                      onClick={() => register(section.sectionNumber)}
                      disabled={section.capacity - section.count === 0}
                    >
                      Register
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

const mapStateToProps = state => ({
  studentId: state.auth.user.id,
});

export default connect(mapStateToProps)(Register);
