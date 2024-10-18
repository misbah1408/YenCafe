import mongoose,{ Schema } from 'mongoose';

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
    default:true
  },
  img: {
    type: String,
    required: true,
    unique: true
  },
  floor: {
    type: String,
    required: true,
    enum: ['fourth floor', 'sixth floor']
  }  
}, {
  timestamps: true
});

export const MainDishe = mongoose.model('MainDishe', mainDishesSchema);

export default mainDishesSchema;
