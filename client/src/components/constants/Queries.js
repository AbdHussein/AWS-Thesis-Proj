const axios = require('axios');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const userByCategory = (category) => {
  const us = `query{
        usersByCategory(category:"${category}"){
            id
            username
            email
            mobile
            serviceName
            location
            address
            avatar
            cover
            video
            description
            workingHours
            categoryID
        }
      }`;
  return us;
};

const categoryNameByID = (categoryID) => {
  const name = `query{
    getCategoryByID(categoryID: ${categoryID}){
      category
    }
  }`;
  return name;
};

const login = (email, password) => {
  const query = `query {
    login(email: "${email}", password: "${password}"){
      token
      RoleID
    }
  }`;
  return query;
};

const request = async (query) => {
  try {
    return await axios.post('http://localhost:5000/api', {
      query: query,
    });
  } catch (error) {
    return error;
  }
};

const signUp = (username, email, password, mobile) => {
  const q = `mutation{
    addUser(username:"${username}", email:"${email}", password:"${password}",RoleID:"3", mobile:${mobile},avatar:"${username[0]}",serviceName:"",address:"", cover:"", video:"",description:""){
      token
    }
  }`;
  return q;
};

const getUserByToken = (token) => {
  const result = jwt.verify(token, 'somesuperdupersecret', {
    algorithm: 'HS256',
  });
  const q = `query {
    user(id:${result.id}){
      username
      avatar
    }
  }`;
  return q;
};

module.exports.userByCategory = userByCategory;
module.exports.categoryNameByID = categoryNameByID;
module.exports.request = request;
module.exports.login = login;
module.exports.signUp = signUp;
module.exports.getUserByToken = getUserByToken;
