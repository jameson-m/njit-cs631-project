import React, { useState, useEffect } from 'react';
import { Container, Table, Card, Form } from 'react-bootstrap';
import axios from 'axios';

const Register = () => {
  const [ departments, setDepartments ] = useState([]);
  const [ courses, setCourses ] = useState([]);
  const [ sections, setSections ] = useState([]);
  const [ selectedDepartment, setSelectedDepartment ] = useState(null);
  const [ selectedCourse, setSelectedCourse ] = useState(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      const result = await axios({
        method: 'POST',
        baseUrl: 'localhost:4444',
        url: '/student',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        data: null,
      });

      setDepartments(result.data.department);
    };

    fetchDepartments();
  }, []);

  const fetchCourses = async departmentCode => {
    const result = await axios({
      method: 'POST',
      baseUrl: 'localhost:4444',
      url: '/student',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: {
        departmentCode,
      },
    });

    setCourses(result.data.course);
  };

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
            <Form.Group controlId="form.DepartmentSelect">
              <Form.Label>Department</Form.Label>
              <Form.Control
                as="select"
                onChange={e => {
                  let departmentCode = e.target.value;
                  setSelectedDepartment(departmentCode);
                  fetchCourses(departmentCode);
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
                onChange={e => setSelectedCourse(e.target.value)}
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
          <h3>Sections for {selectedCourse}</h3>
          <p>Click on a section's row to register for the course.</p>
          <Table hover size="sm" responsive="md">
            <thead className="thead-light">
              <tr>
                <th>Course</th>
                <th>Section</th>
                <th>Instructor</th>
                <th colSpan={2}>Availability</th>
              </tr>
            </thead>
            <tbody>
              {sections.map(section => (
                <tr
                  key={section.sectionNumber}
                  onClick={() => register(section.sectionNumber)}
                  style={{ cursor: 'pointer' }}
                >
                  <td>{section.courseNumber}</td>
                  <td>{section.sectionNumber}</td>
                  <td>{section.instructor}</td>
                  <td>{section.maxEnroll - section.enrolled}</td>
                  <td>{section.maxEnroll}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Register;
