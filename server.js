const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config({ path: ".env" });

const DB = process.env.DATABASE_LOCAL;
mongoose
  .connect(DB, {
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Database connected");
  });

const server = app.listen(process.env.PORT || 3002, () => {
  console.log(
    "Server started on port " +
      process.env.PORT +
      " environvent " +
      process.env.NODE_ENV
  );
});
