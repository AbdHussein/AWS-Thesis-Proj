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

module.exports.userByCategory = userByCategory;
module.exports.categoryNameByID = categoryNameByID;
