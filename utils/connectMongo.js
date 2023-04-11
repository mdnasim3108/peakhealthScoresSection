import mongoose from "mongoose";

const connectMongo = async () =>
 await mongoose.connect("mongodb+srv://support:support@cluster0.qzq2vip.mongodb.net/?retryWrites=true&w=majority")
 .then(console.log("DB connected"))
 .catch((error) =>console.error(error));

export default connectMongo;
