const mongo = {
  uri: process.env.MONGOURL,
  dbName: process.env.DB_NAME
};

const app = {
  url: process.env.URL
}

export default Object.freeze({
  mongo,
  app
});
