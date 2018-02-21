const { values } = require('lodash');
const { Kind, GraphQLScalarType } = require('graphql');
const { makeExecutableSchema } = require('graphql-tools');

const sampleData = {
  User: {
    u1: {
      id: 'u1',
      username: 'jdoe',
      email: 'jdoe@email.com',
      currency_id: "c1"
    },
    u2: {
      id: 'u2',
      username: 'jdelacruz',
      email: 'jdelacruz@email.com',
      currency_id: "c2"
    }
  },

  Currency: {
    c1: {
      id: 'c1',
      country: 'United States',
      name: 'US Dollar',
      abbr: 'USD'
    },
    c2: {
      id: 'c2',
      country: 'Philippines',
      name: 'Philippine Peso',
      abbr: 'PHP'
    }
  }
};

const currencyTypeDefs = `
  type Currency {
    id: ID
    country: String
    name: String
    abbr: String
  }
`;

const userTypeDefs = `
    type User {
      id: ID
      username: String
      email: String
      currency: Currency
    }

    type Query {
      users: [User]
    }
  `;

const typeDefs = `
${currencyTypeDefs}
${userTypeDefs}
`

// const resolvers = {
//   Query: {
//     users(parent, {}) {
//       const data = values(sampleData.User);
//       console.log(data);
//       return sampleData.User;
//     },
//   },
//
//   User: {
//     currency(parent) {
//       return sampleData.Currency[parent.currency_id]
//     },
//   },
// };
const resolvers = {
  Query: {
    users:(parent) => {
      const data = values(sampleData.User);
      return data;
    },
  },

  User: {
    currency:(parent) => {
      return sampleData.Currency[parent.currency_id]
    },
  },
};

module.exports = {
  schema: makeExecutableSchema({ typeDefs, resolvers })
}
