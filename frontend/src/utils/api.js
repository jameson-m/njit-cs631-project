import axios from 'axios';

export const fetchDepartments = async () => {
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

  return result.data.department;
};

export const fetchCourses = async departmentCode => {
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

  return result.data.course;
};
