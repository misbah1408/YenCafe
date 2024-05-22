import mongoose, { Schema } from 'mongoose';

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    orderData: {
      type: Array,
      required: true,
    },
    delivered:{
      type: Boolean,
      default: false,
      
    }
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);

export default orderSchema;
