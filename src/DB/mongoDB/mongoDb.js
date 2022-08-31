import mongoose from "mongoose";

export const connectMongo = async () => {
    const URL = "mongodb+srv://rgonzalezled:18940461@cluster0.mstabwq.mongodb.net/ecommerce?retryWrites=true&w=majority";
    await mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("DB Connected - MongoDB");
}