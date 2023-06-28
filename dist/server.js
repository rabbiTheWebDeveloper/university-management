"use strict";
// import mongoose from "mongoose";
// import config from "./config/index";
// import app from "./app";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = __importDefault(require("./config/index"));
const app_1 = __importDefault(require("./app"));
function boostrap() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(index_1.default.database);
            console.log(`🛢   Database is connected successfully`);
            app_1.default.listen(index_1.default.port, () => {
                console.log(`Application  listening on port ${index_1.default.port}`);
            });
        }
        catch (err) {
            console.log("Failed to connect database", err);
        }
    });
}
boostrap();
