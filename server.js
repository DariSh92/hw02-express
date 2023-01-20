const mongoose = require("mongoose");
const app = require("./app");
mongoose.set("strictQuery", true);

const DB = process.env.MONGO_URL;
const Port = process.env.PORT;
console.log(DB);
mongoose
  .connect(DB, {
    usenewurlparser: true,
    useunifiedtopology: true,
  })
  .then(() => {
    app.listen(Port);
    console.log(`Server running. Use our API on port: ${Port}`);
  })
  .catch((error) => {
    console.log(`can not connect to database, ${error}`);
    process.exit(1);
  });
