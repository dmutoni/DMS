const testFolder = '../uploads/levelSignatures/';
const fs = require('fs');



fs.readdirSync(testFolder).forEach(file => {
  if(file == "test.txt") {
    const fileContent = fs.createReadStream(testFolder+file,'utf8');
    fileContent.on('data',(chunk)=>{
      console.log(chunk)
    }) 
  }

 
  
  // console.log(file)
});