import mongoose, { Schema } from 'mongoose';

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    campusId:{
      type: Number,
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
    },
    paymentMethod:{
      type: String,
      required: true,
    },
    razorpayOrderId:{
      type: String,
    },
    razorpayPaymentId:{
      type: String,
    },
    paymentStatus:{
      type: String,
    }
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);

export default orderSchema;
