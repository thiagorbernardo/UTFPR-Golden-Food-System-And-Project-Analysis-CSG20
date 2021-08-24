const mongo = {
  uri: process.env.MONGOURL,
  dbName: process.env.DB_NAME
};

const app = {
  url: process.env.URL || "http://localhost:3000"
}

export default Object.freeze({
  mongo,
  app
});
