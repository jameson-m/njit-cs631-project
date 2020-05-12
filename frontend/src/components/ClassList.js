import React, { Fragment, useState, useEffect } from 'react';
import { Container, Table, Card, Form } from 'react-bootstrap';
import { fetchDepartments, fetchCourses, fetchSections } from '../utils/api';

const ClassList = () => {
  const [ departments, setDepartments ] = useState([]);
  const [ courses, setCourses ] = useState([]);
  const [ sections, setSections ] = useState([]);
  const [ students, setStudents ] = useState([]);
  const [ selectedDepartment, setSelectedDepartment ] = useState(null);
  const [ selectedCourse, setSelectedCourse ] = useState(null);
  const [ selectedSection, setSelectedSection ] = useState(null);

  useEffect(() => {
    fetchDepartments('/faculty')
      .then(departments => setDepartments(departments))
      .catch(err => alert(err.message));
  }, []);

  useEffect(
    () => {
      students.sort((a, b) => a.lastName > b.lastName);
    },
    [ sections, students ]
  );

  return (
    <Container>
      <h2 style={{ marginTop: '15px', marginBottom: '25px' }}>Class List</h2>

      {/* COURSE FILTER */}
      <Card>
        <Card.Body>
          <p>
            Select the department, course, and section to view section information including a list
            of registered students.
          </p>
          <Form>
            <Form.Group controlId="form.DepartmentSelect">
              <Form.Label>Department</Form.Label>
              <Form.Control
                as="select"
                onChange={e => {
                  let departmentCode = e.target.value;
                  setSelectedDepartment(departmentCode);
                  fetchCourses('/faculty', departmentCode)
                    .then(courses => setCourses(courses))
                    .catch(err => alert(err.message));
                }}
                defaultValue=""
              >
                <option value="" disabled />
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
                  setSelectedCourse(courseNumber);
                  fetchSections('/faculty', courseNumber)
                    .then(sections => setSections(sections))
                    .catch(err => alert(err.message));
                }}
                defaultValue=""
                disabled={!selectedDepartment}
              >
                <option value="" disabled />
                {courses.map(({ courseNumber, courseName }) => (
                  <option key={courseNumber} value={courseNumber}>
                    {courseName}&nbsp;({courseNumber})
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="form.SectionSelect">
              <Form.Label>Sections</Form.Label>
              <Form.Control
                as="select"
                onChange={e => setSelectedSection(e.target.value)}
                disabled={!selectedDepartment || !selectedCourse}
                defaultValue=""
              >
                <option value="" disabled />
                {sections.map(section => (
                  <option key={section.sectionNumber} value={section.sectionNumber}>
                    {section.sectionNumber}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>

          <br />

          {/* COURSE SECTIONS */}
          {selectedSection && (
            <Fragment>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  width: '100%',
                  border: '1px solid #c7ced5',
                  borderRadius: '5px',
                  padding: '10px',
                  marginTop: '10px',
                  marginBottom: '20px',
                }}
              >
                <div style={{ flexGrow: '1' }}>
                  <p>
                    <strong>Course Code:&nbsp;</strong>
                  </p>
                  <p>
                    <strong>Course Name:&nbsp;</strong>
                  </p>
                  <p>
                    <strong>Section Number:&nbsp;</strong>
                  </p>
                  <p>
                    <strong>Instructor:&nbsp;</strong>
                  </p>
                </div>
                <div style={{ flexGrow: '1' }}>
                  <p>
                    <strong>Time:&nbsp;</strong>
                  </p>
                  <p>
                    <strong>Location:&nbsp;</strong>
                  </p>
                  <p>
                    <strong>Weekday(s):&nbsp;</strong>
                  </p>
                </div>
              </div>
              <Table hover size="sm" responsive="md">
                <thead className="thead-light">
                  <tr>
                    <th>Name</th>
                    <th>Student ID</th>
                    <th>Major</th>
                    <th>Year</th>
                  </tr>
                </thead>
                <tbody>
                  {/* TODO: Change this to students.map() */}
                  {sections.map(section => (
                    <tr key={section.sectionNumber} style={{ cursor: 'pointer' }}>
                      <td>{section.courseNumber}</td>
                      <td>{section.sectionNumber}</td>
                      <td>{section.instructor}</td>
                      <td>{section.maxEnroll - section.enrolled}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Fragment>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ClassList;
