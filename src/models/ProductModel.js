import { Schema, model } from "mongoose";

const ProductSchema = new Schema({
    productName: {
        type: String,
        required: true,
    },
    productId: {
        type: String,
        required: true,
    },
    productDescription: {
        type: String,
        required: true,
    },
    productActualPrice: {
        type: Number,
        required: true,
    },
    productSalePrice: {
        type: Number,
    },
}, {
    timestamps: true,
});

const Product = model("Product", ProductSchema);
export default Product;