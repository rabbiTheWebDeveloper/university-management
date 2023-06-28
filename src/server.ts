// import mongoose from "mongoose";
// import config from "./config/index";
// import app from "./app";

// async function boostrap() {
//     try{
//         await mongoose.connect(config.database as string);
//         console.log("Data Base Connection SuccessFully");

//         app.listen(config.port , () =>{
//             console.log("sarver start")
//         })
        

//     }catch(e){
//         console.log("Fail to data connection")


//     }
   
  

//   }

//   boostrap() 

import mongoose from "mongoose";
import config from "./config/index";
import app from "./app";

async function boostrap() {
  try {
    await mongoose.connect(config.database as string);
    console.log(`🛢   Database is connected successfully`);

    app.listen(config.port, () => {
      console.log(`Application  listening on port ${config.port}`);
    });
  } catch (err) {
    console.log("Failed to connect database", err);
  }
}

boostrap();