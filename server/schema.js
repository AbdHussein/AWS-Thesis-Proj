const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLID,
} = require('graphql');
const knex = require('../database/index');

const bcrypt = require('bcrypt');

const UserType = new GraphQLObjectType({
  name: 'user',
  fields: () => ({
    id: { type: GraphQLID, unique: true },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    pay_service: { type: GraphQLString },
    mobile: { type: GraphQLInt },
    service_name: { type: GraphQLString },
    location: { type: GraphQLString },
    address: { type: GraphQLString },
  }),
});

const CartType = new GraphQLObjectType({
  name: 'cart',
  fields: () => ({
    id: { type: GraphQLID, unique: true },
    userID: { type: GraphQLID },
    productID: { type: GraphQLID },
    sold: { type: GraphQLBoolean },
  }),
});

const ProductType = new GraphQLObjectType({
  name: 'product',
  fields: () => ({
    id: { type: GraphQLID, unique: true },
    name: { type: GraphQLString },
    category: { type: GraphQLString },
    price: { type: GraphQLInt },
    userID: { type: GraphQLID },
    rating: { type: GraphQLInt },
    quantity: { type: GraphQLInt },
  }),
});

const CommentType = new GraphQLObjectType({
  name: 'comment',
  fields: () => ({
    id: { type: GraphQLID, unique: true },
    userID: { type: GraphQLID },
    postID: { type: GraphQLID },
    text: { type: GraphQLString },
    date: { type: GraphQLString },
  }),
});

const PostType = new GraphQLObjectType({
  name: 'post',
  fields: () => ({
    id: { type: GraphQLID, unique: true },
    userID: { type: GraphQLID },
    likes: { type: GraphQLInt },
    date: { type: GraphQLString },
    text: { type: GraphQLString },
    image: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(root, args) {
        return await knex('User').select().where({ id: args.id }).first();
      },
    },
    users: {
      type: new GraphQLList(UserType),
      async resolve(root, args) {
        return await knex('User').select();
      },
    },
    carts: {
      type: new GraphQLList(CartType),
      args: {
        // what we need as an arguments
        userID: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(root, args) {
        return await knex('Cart')
          .select()
          .where({ userID: args.userID });
      },
    },
    product: {
      type: ProductType,
      args: {
        userID: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(root, args) {
        return await knex('Product')
          .select()
          .where({ userID: args.userID })
          .first();
      },
    },
    comment: {
      type: CommentType,
      args: {
        postID: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(root, args) {
        return await knex('Comment')
          .select()
          .where({ postID: args.postID })
          .first();
      },
    },
    post: {
      type: PostType,
      args: {
        userID: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(root, args) {
        return await knex('Post')
          .select()
          .where({ userID: args.userID })
          .first();
      },
    },
    login: {
      type: UserType,
      args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      async resolve(root, args) {
        return await knex('') //TODO Write query
      },
    },
    signUp: {
      type: UserType,
      args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
        //TODO: Add all data
      },
      async resolve(root, args) {
        return await knex('') //TODO: Write query
      },
    }
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // for user table
    addUser: {
      type: UserType,
      args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        mobile: { type: new GraphQLNonNull(GraphQLInt) },
        address: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(root, args) {
        // add User with crpted password to database
        var crptPass = await bcrypt.hash(args.password, 10);
        return await knex('User').insert({
          username: args.username,
          email: args.email,
          password: crptPass,
          mobile: args.mobile,
          address: args.address,
          pay_service: '',
          service_name: '',
          location: '',
        });
      },
    },
    deleteUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(root, args) {
        return await knex('User').where({ id: args.id }).del();
      },
    },
    editUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        mobile: { type: GraphQLInt },
        address: { type: GraphQLString },
      },
      async resolve(root, args) {
        args.password = await bcrypt.hash(args.password, 10);
        return await knex('User').where({ id: args.id }).update(args);
      },
    },
    // for product table
    addProduct: {
      type: ProductType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        category: { type: new GraphQLNonNull(GraphQLString) },
        price: { type: new GraphQLNonNull(GraphQLInt) },
        userID: { type: new GraphQLNonNull(GraphQLID) },
        rating: { type: new GraphQLNonNull(GraphQLInt) },
        quantity: { type: new GraphQLNonNull(GraphQLInt) },
      },
      async resolve(root, args) {
        return await knex('Product').insert(args);
      },
    },
    deleteProduct: {
      type: ProductType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(root, args) {
        return await knex('Product').where({ id: args.id }).del();
      },
    },
    editProduct: {
      type: ProductType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        category: { type: GraphQLString },
        price: { type: GraphQLInt },
        userID: { type: GraphQLID },
        rating: { type: GraphQLInt },
        quantity: { type: GraphQLInt },
      },
      async resolve(root, args) {
        return await knex('Product').where({ id: args.id }).update(args);
      },
    },
    // for cart table
    addCart: {
      type: CartType,
      args: {
        userID: { type: new GraphQLNonNull(GraphQLID) },
        productID: { type: new GraphQLNonNull(GraphQLID) },
        sold: { type: new GraphQLNonNull(GraphQLBoolean) },
      },
      async resolve(root, args) {
        return await knex('Cart').insert(args);
      },
    },
    deleteCart: {
      type: CartType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(root, args) {
        return await knex('Cart').where({ id: args.id }).del();
      },
    },
    editCart: {
      type: CartType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        userID: { type: GraphQLID },
        productID: { type: GraphQLID },
        sold: { type: GraphQLBoolean },
      },
      async resolve(root, args) {
        return await knex('Cart').where({ id: args.id }).update(args);
      },
    },
    // for Comment table
    addComment: {
      type: CommentType,
      args: {
        userID: { type: new GraphQLNonNull(GraphQLID) },
        postID: { type: new GraphQLNonNull(GraphQLID) },
        text: { type: new GraphQLNonNull(GraphQLString) },
        date: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(root, args) {
        return await knex('Comment').insert(args);
      },
    },
    deleteComment: {
      type: CommentType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(root, args) {
        return await knex('Comment').where({ id: args.id }).del();
      },
    },
    editComment: {
      type: CommentType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        postID: { type: GraphQLID },
        text: { type: GraphQLString },
        date: { type: GraphQLString },
      },
      async resolve(root, args) {
        return await knex('Comment').where({ id: args.id }).update(args);
      },
    },
    // for Post table
    addPost: {
      type: PostType,
      args: {
        userID: { type: new GraphQLNonNull(GraphQLID) },
        likes: { type: new GraphQLNonNull(GraphQLInt) },
        date: { type: new GraphQLNonNull(GraphQLString) },
        text: { type: new GraphQLNonNull(GraphQLString) },
        image: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(root, args) {
        return await knex('Post').insert(args);
      },
    },
    deletePost: {
      type: PostType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(root, args) {
        return await knex('Post').where({ id: args.id }).del();
      },
    },
    editPost: {
      type: PostType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        userID: { type: GraphQLID },
        likes: { type: GraphQLInt },
        date: { type: GraphQLString },
        text: { type: GraphQLString },
        image: { type: GraphQLString },
      },
      async resolve(root, args) {
        return await knex('Post').where({ id: args.id }).update(args);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});