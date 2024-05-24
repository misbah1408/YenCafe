import mongoose from 'mongoose';

const { Schema } = mongoose;

const mainDishesSchema = new Schema({
  category: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  veg: {
    type: Boolean,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  in_stock: {
    type: Boolean,
    required: true,
  },
  img: {
    type: String,
    required: true,
    unique: true
  }
}, {
  timestamps: true
});

export const MainDishe = mongoose.model('MainDishe', mainDishesSchema);

export default mainDishesSchema;
