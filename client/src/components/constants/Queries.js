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

const getDate = () => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  today = mm + '/' + dd + '/' + yyyy;
  return today;
};

const addPost = (id, imageUrl, postText) => {
  const mutation = `mutation{
    addPost(userID: ${id}, likes: 0, date: "${getDate()}", text: "${postText}", image: "${imageUrl}"){
      id
    }
  }`;
  return mutation;
};

const deletePost = (id) => {
  const mutation = `mutation{
    deletePost(id: ${id}){
      id
    }
  }`;
  return mutation;
};
const addComment = (userID, postID, text) => {
  const q = `mutation {
    addComment(userID:${userID}, postID:${postID}, text:"${text}", date:"${getDate()}"){
      id
    }
  }`;
  return q;
};

const addProduct = (name, userID, category, price, pic) => {
  const mutation = `mutation {
    addProduct(name:"${name}", userID: ${userID}, category:"${category}", price:${price}, pic:"${pic}", rating:"0", quantity:0){
      id
    }
  }`;
  return mutation;
};

const addToCart = (productID, userID) => {
  const mutation = `mutation{
    addCart(userID: ${userID}, productID:${productID}, sold: false){
      id
    }
  }`;
  return mutation;
}

const login = (email, password) => {
  const mutation = `mutation {
    login(email: "${email}", password: "${password}"){
      token
      RoleID
    }
  }`;
  return mutation;
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
    addUser(username:"${username}", email:"${email}", password:"${password}",RoleID:"3", mobile: ${Number(
    mobile
  )},avatar:"${username[0]}",
    serviceName:"", address:"", cover:"", thumbnail:"", video:"", description:""){
      id
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
      id
      email
      RoleID
      payService
      mobile
      serviceName
      location
      address
      cover
      thumbnail
      video
      description
      workingHours
      categoryID
    }
  }`;
  return q;
};

const getPostByProviderID = (userID) => {
  const q = ` query {
    posts(userID:${userID}){
      id
      userID
      likes
      date
      text
      image
    }
  }`;
  return q;
};

const getProviderById = (userID) => {
  const q = `query {
    user(id:${userID}) {
      username
      avatar
      id
      email
      RoleID
      payService
      mobile
      serviceName
      location
      address
      cover
      thumbnail
      video
      description
      workingHours
    }
  }`;
  return q;
};

const getAllCommentsByPostID = (postID) => {
  const q = `query {
    comments(postID:${postID}){
      userID
      postID
      text
      date
      user {
        username
        avatar
      }
    }
  }`;
  return q;
};

const getAllGalary = (userID) => {
  const q = `query{
    gallery(userID: ${userID}){
      id 
      userID
      image
    }
  }`;
  return q;
};

const getAllReviews = (providerID) => {
  const q = `query {
    getReviews(providerID:${providerID}){
      text
      rating
      pic
      date
      user{
        username
        avatar
      }
    }
  }`;
  return q;
};

const addReview = (providerID, userID, text, rating, pic) => {
  const q = `mutation{
    addReview(providerID:${providerID}, userID:${userID}, text:"${text}",rating:"${rating}", date:"${getDate()}",pic:"${pic}"){
      providerID
    }
  }`;
  return q;
};

const addPhoto = (userID, image) => {
  const q = `mutation {
    addGallery(userID:${userID}, image:"${image}"){
      id
    }
  }`;
  return q;
};

const addDesc = (id, desc) => {
  const q = `mutation{
    editUser(id:${id}, description:"${desc}"){
      id
    }
  }`;
  return q;
};

const addVideo = (id, videoUrl) => {
  const q = `mutation{
    editUser(id:${id}, video:"${videoUrl}"){
      id
    }
  }`;
  return q;
};

const addFacilities = (id, arrOfFac) => {
  const q = `mutation{
    editUser(id:${id}, facilities:"${arrOfFac}"){
      id
    }
  }`;
  return q;
};

const getFacilities = (userID) => {
  const q = `query {
    user(id:${userID}){
      facilities
    }
  }`;
  return q;
};

const getProducts = (userID) => {
  const q = `query {
    productsByUserID(userID:${userID}){
      id
      name
      price
      pic
    }
  }`;
  return q;
};

const editProviderInfo = (id, serviceName, email, mobile, address, cover) => {
  const q = `mutation {
    editUser(id:${id}, serviceName:"${serviceName}",email:"${email}",mobile:${mobile},address:"${address}",cover:"${cover}"){
      id
    }
  }`;
  return q;
};

const getProvidersByBookmarks = (userID) => {
  const q = `query {
    bookmark(userID:${userID}){
      id
      userID
      providerID
      provider{
        username
        cover
        address
      }
    }
  }`;
  return q;
};

const getPostByFavProv = (userID) => {
  const q = `query {
    bookmark(userID:${userID}){
      provider{
        email
        posts {
          id
          userID
          likes
          date
          text
          image
          user{
            avatar
            serviceName
          }
        }
      }
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
module.exports.getUserByToken = getUserByToken;
module.exports.getPostByProviderID = getPostByProviderID;
module.exports.deletePost = deletePost;
module.exports.getProviderById = getProviderById;
module.exports.addComment = addComment;
module.exports.getAllCommentsByPostID = getAllCommentsByPostID;
module.exports.getAllGalary = getAllGalary;
module.exports.getAllReviews = getAllReviews;
module.exports.addReview = addReview;
module.exports.addPhoto = addPhoto;
module.exports.addDesc = addDesc;
module.exports.addVideo = addVideo;
module.exports.addProduct = addProduct;
module.exports.addFacilities = addFacilities;
module.exports.getFacilities = getFacilities;
module.exports.getProducts = getProducts;
module.exports.editProviderInfo = editProviderInfo;
module.exports.addToCart = addToCart;
module.exports.getProvidersByBookmarks = getProvidersByBookmarks;
module.exports.getPostByFavProv = getPostByFavProv;
