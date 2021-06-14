module.exports = {
  client: {
    service: {
      url: "http://localhost:4000/graphql",
      // also, local copy of the schema can be provided
      // using `localSchemaFile` property
      skipSSLvalidation: true,
    },
  },
};
