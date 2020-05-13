import React, { Fragment, useState, useEffect } from 'react';
import { Container, Table, Card, Form } from 'react-bootstrap';
import { fetchDepartments, fetchCourses, fetchSections, getClassList } from '../utils/api';

const ClassList = () => {
  const [ departments, setDepartments ] = useState([]);
  const [ courses, setCourses ] = useState([]);
  const [ sections, setSections ] = useState([]);
  const [ students, setStudents ] = useState([]);
  const [ classInfo, setClassInfo ] = useState({});
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
                  let selected = courses.find(c => c.courseNumber === parseInt(courseNumber));
                  setSelectedCourse(selected);
                  fetchSections('/faculty', courseNumber)
                    .then(sections => {
                      setSections(sections);
                    })
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
                onChange={e => {
                  let sectionNumber = e.target.value;
                  setSelectedSection(sectionNumber);
                  getClassList(selectedCourse.courseNumber, sectionNumber)
                    .then(classList => {
                      setClassInfo(classList.classInfo);
                      setStudents(classList.students);
                    })
                    .catch(err => alert(err.message));
                }}
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
                    {selectedCourse.courseNumber}
                  </p>
                  <p>
                    <strong>Course Name:&nbsp;</strong>
                    {selectedCourse.courseName}
                  </p>
                  <p>
                    <strong>Section Number:&nbsp;</strong>
                    {selectedSection}
                  </p>
                  <p>
                    <strong>Instructor:&nbsp;</strong>
                    {`${classInfo.firstName} ${classInfo.lastName}`}
                  </p>
                </div>
                <div style={{ flexGrow: '1' }}>
                  <p>
                    <strong>Time:&nbsp;</strong>
                    {classInfo.time}
                  </p>
                  <p>
                    <strong>Location:&nbsp;</strong>Building&nbsp;{classInfo.buildingId}
                  </p>
                  <p>
                    <strong>Weekday:&nbsp;</strong>
                    {classInfo.weekday}
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
                  {students.map(student => (
                    <tr key={student.studentId} style={{ cursor: 'pointer' }}>
                      <td>{student.name}</td>
                      <td>{student.studentId}</td>
                      <td>{student.major}</td>
                      <td>{student.year}</td>
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
