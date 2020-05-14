import axios from 'axios';

export const fetchDepartments = async url => {
  const result = await axios({
    method: 'POST',
    // baseUrl: 'localhost:4444',
    url: `http://127.0.0.1:4444${url}`,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data: null,
  });

  return result.data.department;
};

export const fetchCourses = async (url, departmentCode) => {
  const result = await axios({
    method: 'POST',
    // baseUrl: 'localhost:4444',
    url: `http://127.0.0.1:4444${url}`,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data: {
      departmentCode,
    },
  });

  return result.data.course;
};

export const fetchSections = async (url, courseNumber) => {
  const result = await axios({
    method: 'POST',
    baseUrl: 'localhost:4444',
    url: `http://127.0.0.1:4444${url}`,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data: {
      courseNumber,
    },
  });

  return result.data.section;
};

export const fetchSectionsStudent = async (studentId, courseNumber) => {
  const result = await axios({
    method: 'POST',
    // baseUrl: 'localhost:4444',
    url: 'http://127.0.0.1:4444/student',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data: {
      courseNumber,
      studentId,
    },
  });

  return result.data.section;
};

export const register = async (studentId, courseNumber, sectionNumber) => {
  try {
    const result = await axios({
      method: 'POST',
      // baseUrl: 'localhost:4444',
      url: 'http://127.0.0.1:4444/student',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: {
        studentId,
        courseNumber,
        sectionNumber,
      },
    });

    return result.status;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

export const getClassList = async (courseNumber, sectionNumber) => {
  const result = await axios({
    method: 'POST',
    // baseUrl: 'localhost:4444',
    url: 'http://127.0.0.1:4444/faculty',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data: {
      courseNumber,
      sectionNumber,
    },
  });

  return result.data;
};
