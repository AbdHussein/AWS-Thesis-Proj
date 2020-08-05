const express = require('express');
const expressGraphQL = require('express-graphql').graphqlHTTP;
const schema = require('./schema');
const jwt = require('express-jwt')
const app = express();

app.use(express.json());

const authMiddleware = jwt({
  algorithms: ['HS256'],
  secret: process.env.SECRET
});

app.use('/api',// authMiddleware,
  expressGraphQL(req => ({
    schema,
    context: {
      user: req.user
    },
    graphiql: true
  }))
);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));