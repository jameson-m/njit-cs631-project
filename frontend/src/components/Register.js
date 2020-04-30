import React, { useState } from 'react';
import { Container, Table, Card, Form } from 'react-bootstrap';

const Register = () => {
  const [ departments, setDepartments ] = useState([
    { code: 'cs', name: 'Computer Science' },
    { code: 'ls', name: 'Life Sciences' },
    { code: 'h', name: 'History' },
  ]);
  const [ courses, setCourses ] = useState([
    { number: 'CS631', name: 'Database Systems Design' },
    { number: 'CS506', name: 'Foundations of Computer Science' },
  ]);
  const [ sections, setSections ] = useState([
    {
      sectionNumber: '235978',
      courseNumber: 'CS631',
      instructor: 'Oria',
      enrolled: 22,
      maxEnroll: 30,
    },
    {
      sectionNumber: '235979',
      courseNumber: 'CS631',
      instructor: 'Oria',
      enrolled: 2,
      maxEnroll: 30,
    },
    {
      sectionNumber: '235980',
      courseNumber: 'CS631',
      instructor: 'Oria',
      enrolled: 0,
      maxEnroll: 30,
    },
  ]);
  const [ selectedDepartment, setSelectedDepartment ] = useState(null);
  const [ selectedCourse, setSelectedCourse ] = useState(null);

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
              <Form.Control as="select" onChange={e => setSelectedDepartment(e.target.value)}>
                <option />
                {departments.map(department => (
                  <option key={department.code} value={department.code}>
                    {department.name}
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
                {courses.map(course => (
                  <option key={course.number} value={course.number}>
                    {course.number}&nbsp;{course.name}
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
