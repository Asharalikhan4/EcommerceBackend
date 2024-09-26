import { Schema, model } from "mongoose";

const ProductSchema = new Schema({
    productName: {
        type: String,
        required: true,
    },
    productId: {
        type: String,
        required: true,
        unqiue: true,
    },
    productDescription: {
        type: String,
        required: true,
    },
    productActualPrice: {
        type: String,
        required: true,
    },
    productSalePrice: {
        type: String,
    },
}, {
    timestamps: true,
});

const Product = model("Product", ProductSchema);
export default Product;