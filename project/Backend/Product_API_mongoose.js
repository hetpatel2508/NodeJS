import mongoose from 'mongoose';

const url = 'mongodb://admin:het2508@localhost:27017/test';

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  userId: String,
  company: String,
}, { versionKey: false });

const FirstProjectProducts = mongoose.model('FirstProjectProducts', productSchema);

export async function dbConnect() {
  try {
        await mongoose.connect(url);
        return FirstProjectProducts;
  } catch (err) {
    console.error('Could not connect to MongoDB:', err);
  }
}

export async function dbClose() {
    await mongoose.connection.close();
}

export default FirstProjectProducts;
