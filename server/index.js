const express = require('express');
const expressGraphQL = require('express-graphql').graphqlHTTP;
const schema = require('./schema');
const path = require('path');
const jwt = require('express-jwt');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const authMiddleware = jwt({
  algorithms: ['HS256'],
  secret: process.env.SECRET,
});

app.use(
  '/api', // authMiddleware,
  expressGraphQL((req) => ({
    schema,
    context: {
      user: req.user,
    },
    graphiql: true,
  }))
);

if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
