const mongoose = require("mongoose");

const connectionStr = process.env.DATA_CONN_STR;

const database = {
  connect: function () {
    mongoose
      .connect(connectionStr, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      })
      .then(() => console.log("SUCCESS: connected to database"))
      .catch((e) => console.log("ERROR: did not connect to database", e));
  },

  disconnect: function (done) {
    mongoose.disconnect(done);
  },
};

module.exports = database;
