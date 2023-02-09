const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
async function connect() {
  try {
    await mongoose.connect(
      "mongodb+srv://admin:admin@cluster0.nxcyn.mongodb.net/carproject?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useFindAndModify: false,
        // useCreateIndex: true,
      }
    );
    console.log("Connect successfully!!");
  } catch (error) {
    console.log("Connect failure!!", error);
  }
}
module.exports = { connect };