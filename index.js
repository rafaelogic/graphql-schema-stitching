const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema, mergeSchemas } = require('graphql-tools');
const bodyParser = require('body-parser');
const { schema } = require('./schema')
const express = require('express');


const app = express();
app.use('/graphql', bodyParser.json(), graphqlExpress({schema}));
app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
  query:`query{
  users {
    id
    username
    currency {
      name
      abbr
    }
  }
}
  `
}));
// app.use('/graphql', graphqlHTTP(() => ({
//   schema,
//   graphiql: true,
//   pretty: true
// })));

app.listen(3000, () => {
  console.log('Listening API running at port 3000')
});
