import mongoose from "mongoose";

const connectMongo = async () =>
 await mongoose.connect("mongodb+srv://nasim:nasim@expense.ckhwn9v.mongodb.net/?retryWrites=true&w=majority");
console.log("DB connected");

export default connectMongo;
