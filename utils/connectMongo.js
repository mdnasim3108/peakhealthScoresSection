import mongoose from "mongoose";

const connectMongo = async () =>
 await mongoose.connect("mongodb+srv://support:support@cluster0.qzq2vip.mongodb.net/?retryWrites=true&w=majority")
 .then(console.log("DB connected"))

export default connectMongo;

// mongodb+srv://nasim:nasim@expense.ckhwn9v.mongodb.net/?retryWrites=true&w=majority


// mongodb+srv://support:support@cluster0.qzq2vip.mongodb.net/?retryWrites=true&w=majority