import Product from "../models/ProductModel.js";

const createProduct = async (req, res) => {
    try {
        const { productName, productId, productDescription, productActualPrice, productSalePrice } = req.body;
        if(!productName || !productId || !productDescription || !productActualPrice) {
            return res.status(202).json({ message: "All fields are required" });
        };
        const productExist = await Product.findOne({ productId });
        if(productExist) {
            return res.status(202).json({ message: "Product already exist" });
        };
        const product = new Product({
            productName,
            productId,
            productDescription,
            productActualPrice,
            productSalePrice,
        });
        await product.save();
        return res.status(200).json({ message: "Product added successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        return res.status(200).json({ message: "Latest products fetched successfully.", products: products });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error });
    }
};

const getSingleProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findOne({ productId });
        return res.status(200).json({ message: "Product fetched successfully.", product: product });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        await Product.findByIdAndDelete({ productId });
        return res.status(200).json({ message: "Product deleted successfully." });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const { name, price, description } = req.body;
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error });
    }
};

export { createProduct, getAllProducts, getSingleProduct, deleteProduct, updateProduct };