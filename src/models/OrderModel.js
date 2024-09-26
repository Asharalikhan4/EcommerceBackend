import { Model, Schema } from "mongoose";

const OrderSchema = new Schema({
    orderId: {
        type: String,
        required: true,
        unique: true,
    },
    orderItems: {
        type: Array,
        required: true,
    },
    orderTotal: {
        type: Number,
        required: true,
    },
    orderStatus: {
        type: String,
        required: true,
    },
    orderDate: {
        type: Date,
        required: true,
    },
    orderDeliveredDate: {
        type: Date,
    },
    orderPaymentMethod: {
        type: String,
        required: true,
    },
    orderPaymentResult: {
        id: { type: String },
        status: { type: String },
        update_time: { type: String },
        email_address: { type: String },
    },
    orderShippingAddress: {
        address: { type: String },
        city: { type: String },
        postalCode: { type: String },
        country: { type: String },
    },
    orderUser: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {
    timestamps: true,
});

const Order = Model("Order", OrderSchema);
export default Order;