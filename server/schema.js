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
const jwt = require('jsonwebtoken');

const UserType = new GraphQLObjectType({
  name: 'user',
  fields: () => ({
    id: { type: GraphQLID, unique: true },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    RoleID: { type: GraphQLInt },
    payService: { type: GraphQLString },
    mobile: { type: GraphQLInt },
    serviceName: { type: GraphQLString },
    location: { type: GraphQLString },
    address: { type: GraphQLString },
    avatar: { type: GraphQLString },
    cover: { type: GraphQLString },
    video: { type: GraphQLString },
    description: { type: GraphQLString },
    workingHours: { type: GraphQLString },
    facilities: { type: GraphQLString },
    categoryID: { type: GraphQLID },
    token: { type: GraphQLString },
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

const CategoryType = new GraphQLObjectType({
  name: 'category',
  fields: () => ({
    id: { type: GraphQLID, unique: true },
    category: { type: GraphQLString },
    // user: {
    //   type: new GraphQLList(UserType),
    //   async resolve(parent, args){
    //     return await knex('User').select().where({categoryID : parent.id});
    //   }
    // }
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
    rating: { type: GraphQLString },
    quantity: { type: GraphQLInt },
    pic: { type: GraphQLString },
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
    user: {
      type: UserType,
      async resolve(root, args) {
        return await knex('User').select().where({ id: root.userID }).first();
      },
    },
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

const GalleryType = new GraphQLObjectType({
  name: 'gallery',
  fields: () => ({
    id: { type: GraphQLID, unique: true },
    userID: { type: GraphQLID },
    image: { type: GraphQLString },
  }),
});

const BookmarkType = new GraphQLObjectType({
  name: 'bookmark',
  fields: () => ({
    id: { type: GraphQLID, unique: true },
    userID: { type: GraphQLID },
    providerID: { type: GraphQLID },
    provider: {
      type: UserType,
      async resolve(root, args) {
        return await knex('User')
          .select()
          .where({ id: root.providerID })
          .first();
      },
    },
  }),
});

const RolesType = new GraphQLObjectType({
  name: 'roles',
  fields: () => ({
    id: { type: GraphQLID, unique: true },
    Role: { type: GraphQLString },
  }),
});

const ReviewType = new GraphQLObjectType({
  name: 'review',
  fields: () => ({
    id: { type: GraphQLID, unique: true },
    userID: { type: GraphQLID },
    providerID: { type: GraphQLID },
    text: { type: GraphQLString },
    rating: { type: GraphQLString },
    pic: { type: GraphQLString },
    date: { type: GraphQLString },
    user: {
      type: UserType,
      async resolve(root, args) {
        return await knex('User').select().where({ id: root.userID }).first();
      },
    },
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
    getUsers: {
      type: new GraphQLList(UserType),
      async resolve(root, args) {
        return await knex('User').select();
      },
    },
    carts: {
      type: new GraphQLList(CartType),
      args: {
        userID: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(root, args) {
        return await knex('Cart')
          .select()
          .where({ userID: args.userID, sold: false }); // why sold is false
      },
    },
    productsByUserID: {
      type: new GraphQLList(ProductType),
      args: {
        userID: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(root, args) {
        return await knex('Product')
          .select()
          .where({ userID: args.userID })
          .limit(50);
      },
    },
    productsByCategory: {
      type: new GraphQLList(ProductType),
      args: {
        category: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(root, args) {
        return await knex('Product')
          .select()
          .where({ category: args.category })
          .limit(50);
      },
    },
    comments: {
      type: new GraphQLList(CommentType),
      args: {
        postID: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(root, args) {
        return await knex('Comment').select().where({ postID: args.postID });
      },
    },
    posts: {
      type: new GraphQLList(PostType),
      args: {
        userID: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(root, args) {
        return await knex('Post').select().where({ userID: args.userID });
      },
    },
    usersByCategory: {
      type: new GraphQLList(UserType),
      args: {
        category: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        try {
          var categoryData = await knex('category')
            .select()
            .where({ category: args.category })
            .first();
          return await knex('User')
            .select()
            .where({ categoryID: categoryData.id });
        } catch (err) {
          return err;
        }
      },
    },
    category: {
      type: CategoryType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(root, args) {
        return await knex('Category').select().where({ id: args.id }).first();
      },
    },
    getAllCategories: {
      type: new GraphQLList(CategoryType),
      async resolve(root, args) {
        return await knex('Category').select();
      },
    },
    gallery: {
      type: new GraphQLList(GalleryType),
      args: {
        userID: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(root, args) {
        return await knex('Gallery').select().where({ userID: args.userID });
      },
    },
    getRoles: {
      type: new GraphQLList(RolesType),
      async resolve(root, args) {
        return await knex('Roles').select();
      },
    },
    bookmark: {
      type: new GraphQLList(BookmarkType),
      args: {
        userID: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(root, args) {
        return await knex('Bookmark').select().where({ userID: args.userID });
      },
    },
    role: {
      type: RolesType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(root, args) {
        return await knex('Roles').select().where({ id: args.id }).first();
      },
    },
    getCategoryByID: {
      type: CategoryType,
      args: {
        categoryID: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        return await knex('category')
          .select('category')
          .where({ id: args.categoryID })
          .first();
      },
    },
    getReviews: {
      type: new GraphQLList(ReviewType),
      args: {
        providerID: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(root, args) {
        return await knex('Review')
          .select()
          .where({ providerID: args.providerID });
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // for user table
    login: {
      type: UserType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(root, args) {
        //login
        try {
          const data = await knex('user')
            .select('*')
            .where({ email: args.email })
            .first();
          // console.log(data.password);
          if (data.password) {
            if (await bcrypt.compare(args.password, data.password)) {
              const token = jwt.sign(
                { id: data.id, username: data.username, email: data.email },
                process.env.SECRET,
                {
                  algorithm: 'HS256',
                  expiresIn: '2 days',
                }
              );
              await knex('user')
                .update({ token: token })
                .where({ email: args.email });
              return await knex('user')
                .select('*')
                .where({ email: args.email })
                .first();
            }
          } else {
            console.log('invalid username or password');
          }
        } catch (err) {
          console.log(err);
        }
      },
    },
    addUser: {
      type: UserType,
      args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        RoleID: { type: GraphQLString },
        mobile: { type: new GraphQLNonNull(GraphQLInt) },
        serviceName: { type: new GraphQLNonNull(GraphQLString) },
        address: { type: new GraphQLNonNull(GraphQLString) },
        avatar: { type: new GraphQLNonNull(GraphQLString) },
        cover: { type: new GraphQLNonNull(GraphQLString) },
        video: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        facilities: { type: GraphQLString },
      },
      async resolve(root, args) {
        // add User with crpted password to database
        var crptPass = await bcrypt.hash(args.password, 10);
        args.password = crptPass;
        return await knex('User').insert(args);
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
        RoleID: { type: GraphQLInt },
        payService: { type: GraphQLString },
        mobile: { type: GraphQLInt },
        serviceName: { type: GraphQLString },
        location: { type: GraphQLString },
        address: { type: GraphQLString },
        avatar: { type: GraphQLString },
        cover: { type: GraphQLString },
        video: { type: GraphQLString },
        description: { type: GraphQLString },
        workingHours: { type: GraphQLString },
        categoryID: { type: GraphQLID },
        facilities: { type: GraphQLString },
      },
      async resolve(root, args) {
        // args.password = await bcrypt.hash(args.password, 10);
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
        rating: { type: GraphQLString },
        quantity: { type: GraphQLInt },
        pic: { type: new GraphQLNonNull(GraphQLString) },
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
        rating: { type: GraphQLString },
        quantity: { type: GraphQLInt },
        pic: { type: GraphQLString },
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
    addCategory: {
      type: CategoryType,
      args: {
        category: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(root, args) {
        return await knex('Category').insert(args);
      },
    },
    deleteCategory: {
      type: CategoryType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(root, args) {
        return await knex('Category').where(args).del();
      },
    },
    editCategory: {
      type: CategoryType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        category: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(root, args) {
        return await knex('Category').where({ id: args.id }).update(args);
      },
    },
    addGallery: {
      type: GalleryType,
      args: {
        userID: { type: new GraphQLNonNull(GraphQLID) },
        image: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(root, args) {
        return await knex('Gallery').insert(args);
      },
    },
    deleteGallery: {
      type: GalleryType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(root, args) {
        return await knex('Gallery').where(args).del();
      },
    },
    editGallery: {
      type: GalleryType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        userID: { type: new GraphQLNonNull(GraphQLID) },
        image: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(root, args) {
        return await knex('Gallery').where({ id: args.id }).update(args);
      },
    },
    addBookmark: {
      type: BookmarkType,
      args: {
        userID: { type: new GraphQLNonNull(GraphQLID) },
        providerID: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(root, args) {
        return await knex('Bookmark').insert(args);
      },
    },
    deleteBookmark: {
      type: BookmarkType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(root, args) {
        return await knex('Bookmark').where(args).del();
      },
    },
    addRole: {
      type: RolesType,
      args: {
        Role: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(root, args) {
        return await knex('Roles').insert(args);
      },
    },
    deleteRoles: {
      type: RolesType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(root, args) {
        return await knex('Roles').where(args).del();
      },
    },
    editRoles: {
      type: RolesType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        Role: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(root, args) {
        return await knex('Roles').where({ id: args.id }).update(args);
      },
    },
    addReview: {
      type: ReviewType,
      args: {
        providerID: { type: new GraphQLNonNull(GraphQLID) },
        userID: { type: new GraphQLNonNull(GraphQLID) },
        text: { type: new GraphQLNonNull(GraphQLString) },
        date: { type: new GraphQLNonNull(GraphQLString) },
        rating: { type: new GraphQLNonNull(GraphQLString) },
        pic: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(root, args) {
        return await knex('Review').insert(args);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
