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

const request = async (query) => {
  try {
    return await axios.post('http://localhost:5000/api', {
      query: query,
    });
  } catch (error) {
    return error;
  }
};

// .then((response) => {
//   const providers = response.data;
//   this.setState({
//     providers,
//   });
// })
// .catch((err) => {
//   console.log(err);
// });
module.exports.userByCategory = userByCategory;
module.exports.categoryNameByID = categoryNameByID;
module.exports.request = request;
