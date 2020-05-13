import axios from 'axios';

export const fetchDepartments = async url => {
  const result = await axios({
    method: 'POST',
    baseUrl: 'localhost:4444',
    url,
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
    baseUrl: 'localhost:4444',
    url,
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
    url,
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
    baseUrl: 'localhost:4444',
    url: '/student',
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
