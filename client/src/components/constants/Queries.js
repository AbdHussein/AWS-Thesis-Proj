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

const addPost = () =>{
  const mutation = `mutation{
    addPost(userID: , likes: Int!
      date: String!
      text: String!
      image: String!
      )
      token
    }
  }`;
  return mutation;
}

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

module.exports.userByCategory = userByCategory;
module.exports.categoryNameByID = categoryNameByID;
module.exports.request = request;
module.exports.login = login;
module.exports.signUp = signUp;
module.exports.addPost = addPost;
