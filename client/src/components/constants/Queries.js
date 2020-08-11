const axios = require('axios');

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

const login = (username, password) => {
  const query = `query {
    login(username: "${username}", password: "${password}"){
      token
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
    addUser(username:"${username}", email:"${email}", password:"${password}",roleID:"3", mobile:${mobile},avatar:"${username[0]}",serviceName:"",address:"", cover:"", video:"",description:""){
      token
    }
  }`;
  return q;
};

module.exports.userByCategory = userByCategory;
module.exports.categoryNameByID = categoryNameByID;
module.exports.request = request;
module.exports.login = login;
module.exports.signUp = signUp;
