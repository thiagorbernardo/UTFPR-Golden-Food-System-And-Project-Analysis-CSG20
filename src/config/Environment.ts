const mongo = {
  uri: process.env.MONGOURL,
  dbName: process.env.DB_NAME
};

export default Object.freeze({
  mongo,
});
