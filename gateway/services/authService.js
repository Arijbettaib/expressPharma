const axios = require('axios');

exports.login = async (email, password) => {
  const response = await axios.post('http://auth-service:3001/api/login', {
    email,
    password,
  });
  return response.data.token;
};

exports.verifyToken = async (token) => {
  const response = await axios.get('http://auth-service:3001/api/profile', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
