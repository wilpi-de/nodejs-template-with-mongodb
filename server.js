const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
const app = require("./app");

const postDAO = require("./daos/postDAO");


dotenv.config({path: "./config.env"});


const port = process.env.PORT || 5000


// CONNECT TO DATABASE AND START SERVER
MongoClient
.connect(
    process.env.DB_URI,
    { connectTimeoutMS: 2500, maxPoolSize: 50, useNewUrlParser: true }
)
.catch(err => {
    console.error(err.stack)
    process.exit(1)
})
.then(async client => {
    await postDAO.injectDB(client)
    app.listen(port, () => {
      console.log(`Listening on port ${port}`)
    })
});
