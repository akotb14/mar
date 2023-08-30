const mongoose = require("mongoose");

module.exports = class ConnectDB {
  static db() {
    mongoose.set('strictQuery', true);
    mongoose
      .connect("mongodb+srv://ahmed17:medocool14@education.w86z5.mongodb.net/DE",
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      )
      .then(() => {
        console.log("db is connected");
      })
      .catch((e) => {
        console.log(e);

      });
           

  }

}; 
  
 
