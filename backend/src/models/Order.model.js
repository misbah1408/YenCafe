import mongoose, { Schema } from 'mongoose';

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    userName:{
      type: String,
      required: true,
    },
    orderData: {
      type: Array,
      required: true,
    },
    delivered:{
      type: Boolean,
      default: false,
    },
    location:{
      type: String,
      required: true,
    },
    status:{
      type: String,
      default: "Yet to Deliver",
      required: true,
    },
    total:{
      type: Number,
      required: true,
    }
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);

export default orderSchema;
