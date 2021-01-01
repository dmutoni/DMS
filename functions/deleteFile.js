const testFolder = './uploads/levelSignatures/';
const fs = require('fs');

exports.deleteFile = (fileName) => {
    fs.readdirSync(testFolder).forEach(file => {
        if(file == fileName) {
          try {
              console.log(testFolder+file)
            fs.unlinkSync(testFolder+file)
            console.log(file);
            console.log("successfully deleted this file")
          } catch (e) {
            throw e;
          }
        }
      });
}

