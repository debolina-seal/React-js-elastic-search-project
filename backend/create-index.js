const elasticClient = require("./elastic-client");
//This function is used to indexing 
const createIndex = async (indexName) => {
  await elasticClient.indices.create({ index: indexName });
  console.log("Index created");
};
// As program is dealing with document, index name has been given Document
createIndex("Document");
