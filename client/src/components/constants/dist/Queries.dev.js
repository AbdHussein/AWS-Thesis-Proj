"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var axios = require('axios');

var jwt = require('jsonwebtoken');

var dotenv = require('dotenv');

dotenv.config();

var userByCategory = function userByCategory(category) {
  var us = "query{\n        usersByCategory(category:\"".concat(category, "\"){\n            id\n            username\n            email\n            mobile\n            serviceName\n            location\n            address\n            avatar\n            cover\n            video\n            description\n            workingHours\n            categoryID\n        }\n      }");
  return us;
};

var categoryNameByID = function categoryNameByID(categoryID) {
  var name = "query{\n    getCategoryByID(categoryID: ".concat(categoryID, "){\n      category\n    }\n  }");
  return name;
};

var getDate = function getDate() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!

  var yyyy = today.getFullYear();
  today = mm + '/' + dd + '/' + yyyy;
  return today;
};

var addPost = function addPost(id, imageUrl, postText) {
  var mutation = "mutation{\n    addPost(userID: ".concat(id, ", date: \"").concat(getDate(), "\", text: \"").concat(postText, "\", image: \"").concat(imageUrl, "\"){\n      id\n    }\n  }");
  return mutation;
};

var deletePost = function deletePost(id) {
  var mutation = "mutation{\n    deletePost(id: ".concat(id, "){\n      id\n    }\n  }");
  return mutation;
};

var deleteBookmark = function deleteBookmark(id) {
  var mutation = "mutation{\n    deleteBookmark(id: ".concat(id, "){\n      id\n    }\n  }");
  return mutation;
};

var addComment = function addComment(userID, postID, text) {
  var q = "mutation {\n    addComment(userID:".concat(userID, ", postID:").concat(postID, ", text:\"").concat(text, "\", date:\"").concat(getDate(), "\"){\n      id\n    }\n  }");
  return q;
};

var addProduct = function addProduct(name, userID, category, price, pic) {
  var mutation = "mutation {\n    addProduct(name:\"".concat(name, "\", userID: ").concat(userID, ", category:\"").concat(category, "\", price:").concat(price, ", pic:\"").concat(pic, "\", rating:\"0\", quantity:0){\n      id\n    }\n  }");
  return mutation;
};

var addToCart = function addToCart(productID, userID) {
  var mutation = "mutation{\n    addCart(userID: ".concat(userID, ", productID:").concat(productID, ", sold: false){\n      id\n    }\n  }");
  return mutation;
};

var login = function login(email, password) {
  var mutation = "mutation {\n    login(email: \"".concat(email, "\", password: \"").concat(password, "\"){\n      token\n      RoleID\n    }\n  }");
  return mutation;
};

var request = function request(query) {
  return regeneratorRuntime.async(function request$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(axios.post('http://localhost:5000/api', {
            query: query
          }));

        case 3:
          return _context.abrupt("return", _context.sent);

        case 6:
          _context.prev = 6;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", _context.t0);

        case 9:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 6]]);
};

var signUp = function signUp(username, email, password, mobile) {
  var q = "mutation{\n    addUser(username:\"".concat(username, "\", email:\"").concat(email, "\", password:\"").concat(password, "\",RoleID:\"3\", mobile:").concat(Number(mobile), ",avatar:\"").concat(username[0], "\",\n    serviceName:\"\", address:\"\", cover:\"\", thumbnail:\"\", video:\"\", description:\"\"){\n      id\n    }\n  }");
  return q;
};

var getUserByToken = function getUserByToken(token) {
  var result = jwt.verify(token, 'somesuperdupersecret', {
    algorithm: 'HS256'
  });
  var q = "query {\n    user(id:".concat(result.id, "){\n      username\n      avatar\n      id\n      email\n      RoleID\n      payService\n      mobile\n      serviceName\n      location\n      address\n      cover\n      thumbnail\n      video\n      description\n      workingHours\n      categoryID\n    }\n  }");
  return q;
};

var getPostByProviderID = function getPostByProviderID(userID) {
  var q = " query {\n    posts(userID:".concat(userID, "){\n      id\n      userID\n      date\n      text\n      image\n    }\n  }");
  return q;
};

var getProviderById = function getProviderById(userID) {
  var q = "query {\n    user(id:".concat(userID, ") {\n      username\n      avatar\n      id\n      email\n      RoleID\n      payService\n      mobile\n      serviceName\n      location\n      address\n      cover\n      thumbnail\n      video\n      description\n      workingHours\n    }\n  }");
  return q;
};

var getAllCommentsByPostID = function getAllCommentsByPostID(postID) {
  var q = "query {\n    comments(postID:".concat(postID, "){\n      userID\n      postID\n      text\n      date\n      user {\n        username\n        avatar\n      }\n    }\n  }");
  return q;
};

var getAllGalary = function getAllGalary(userID) {
  var q = "query{\n    gallery(userID: ".concat(userID, "){\n      id \n      userID\n      image\n    }\n  }");
  return q;
};

var getAllReviews = function getAllReviews(providerID) {
  var q = "query {\n    getReviews(providerID:".concat(providerID, "){\n      text\n      rating\n      pic\n      date\n      user{\n        username\n        avatar\n      }\n    }\n  }");
  return q;
};

var addReview = function addReview(providerID, userID, text, rating, pic) {
  var q = "mutation{\n    addReview(providerID:".concat(providerID, ", userID:").concat(userID, ", text:\"").concat(text, "\",rating:\"").concat(rating, "\", date:\"").concat(getDate(), "\",pic:\"").concat(pic, "\"){\n      providerID\n    }\n  }");
  return q;
};

var addPhoto = function addPhoto(userID, image) {
  var q = "mutation {\n    addGallery(userID:".concat(userID, ", image:\"").concat(image, "\"){\n      id\n    }\n  }");
  return q;
};

var addDesc = function addDesc(id, desc) {
  var q = "mutation{\n    editUser(id:".concat(id, ", description:\"").concat(desc, "\"){\n      id\n    }\n  }");
  return q;
};

var addVideo = function addVideo(id, videoUrl) {
  var q = "mutation{\n    editUser(id:".concat(id, ", video:\"").concat(videoUrl, "\"){\n      id\n    }\n  }");
  return q;
};

var addThumbnail = function addThumbnail(id, thumbnailUrl) {
  var q = "mutation{\n    editUser(id:".concat(id, ", thumbnail:\"").concat(thumbnailUrl, "\"){\n      id\n    }\n  }");
  return q;
};

var addFacilities = function addFacilities(id, arrOfFac) {
  var q = "mutation{\n    editUser(id:".concat(id, ", facilities:\"").concat(arrOfFac, "\"){\n      id\n    }\n  }");
  return q;
};

var addBookmark = function addBookmark(userID, providerID) {
  var mutation = "mutation{\n    addBookmark(userID:".concat(userID, ", providerID: ").concat(providerID, "){\n      id\n    }\n  }");
  return mutation;
};

var addLike = function addLike(userID, postID) {
  var mutation = "mutation{\n    addLike(userID:".concat(userID, ", postID: ").concat(postID, "){\n      id\n    }\n  }");
  return mutation;
};

var deleteLike = function deleteLike(id) {
  var mutation = "mutation{\n    deleteLike(id:".concat(id, "){\n      id\n    }\n  }");
  return mutation;
};

var getFacilities = function getFacilities(userID) {
  var q = "query {\n    user(id:".concat(userID, "){\n      facilities\n    }\n  }");
  return q;
};

var getLikesByPostID = function getLikesByPostID(postID) {
  var query = "query {\n    getLikesByPostID(postID:".concat(postID, "){\n      id\n      postID\n      userID\n    }\n  }");
  return query;
};

var getProducts = function getProducts(userID) {
  var q = "query {\n    productsByUserID(userID:".concat(userID, "){\n      id\n      name\n      price\n      pic\n    }\n  }");
  return q;
};

var editProviderInfo = function editProviderInfo(id, serviceName, email, mobile, address, cover) {
  var q = "mutation {\n    editUser(id:".concat(id, ", serviceName:\"").concat(serviceName, "\",email:\"").concat(email, "\",mobile:").concat(mobile, ",address:\"").concat(address, "\",cover:\"").concat(cover, "\"){\n      id\n    }\n  }");
  return q;
};

var getProvidersByBookmarks = function getProvidersByBookmarks(userID) {
  var q = "query {\n    bookmarks(userID:".concat(userID, ") {\n      id\n      userID\n      providerID\n      provider {\n        username\n        cover\n        address\n      }\n    }\n  }");
  return q;
};

var getBookmarksByProvider = function getBookmarksByProvider(providerID) {
  var q = "query {\n    allBookmarks(providerID:".concat(providerID, ") {\n      id\n      userID\n      providerID   \n    }\n  }");
  return q;
};

var getPostByFavProv = function getPostByFavProv(userID) {
  var q = "query {\n    bookmark(userID:".concat(userID, "){\n      provider{\n        email\n        posts {\n          id\n          userID\n          date\n          text\n          image\n          user{\n            avatar\n            serviceName\n          }\n        }\n      }\n    }\n  }");
  return q;
};

var editWorkingHours = function editWorkingHours(providerID, workingHours) {
  var q = "mutation {\n    editUser(id:".concat(providerID, ", workingHours:\"").concat(workingHours, "\"){\n      id\n    }\n  }");
  return q;
};

var getUsersByRoleID = function getUsersByRoleID(RoleID) {
  var q = "query {\n    getUsers(RoleID: ".concat(RoleID, "){\n     id\n    username\n    email\n    mobile\n    serviceName\n    location\n    address\n    avatar\n    cover\n    video\n    description\n    workingHours\n    categoryID\n    RoleID\n    categoryName{\n      category\n    }\n    }\n  }");
  return q;
};

var _default = {
  userByCategory: userByCategory,
  categoryNameByID: categoryNameByID,
  request: request,
  login: login,
  signUp: signUp,
  addPost: addPost,
  getUserByToken: getUserByToken,
  getPostByProviderID: getPostByProviderID,
  deletePost: deletePost,
  deleteBookmark: deleteBookmark,
  getProviderById: getProviderById,
  addComment: addComment,
  getAllCommentsByPostID: getAllCommentsByPostID,
  getAllGalary: getAllGalary,
  getAllReviews: getAllReviews,
  addReview: addReview,
  addPhoto: addPhoto,
  addDesc: addDesc,
  addVideo: addVideo,
  addThumbnail: addThumbnail,
  addProduct: addProduct,
  addFacilities: addFacilities,
  getFacilities: getFacilities,
  getProducts: getProducts,
  editProviderInfo: editProviderInfo,
  addToCart: addToCart,
  getProvidersByBookmarks: getProvidersByBookmarks,
  getPostByFavProv: getPostByFavProv,
  editWorkingHours: editWorkingHours,
  getUsersByRoleID: getUsersByRoleID,
  getBookmarksByProvider: getBookmarksByProvider,
  getLikesByPostID: getLikesByPostID,
  addBookmark: addBookmark,
  addLike: addLike,
  deleteLike: deleteLike
};
exports["default"] = _default;