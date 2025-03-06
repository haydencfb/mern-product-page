import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({success: true, data: products});
    } catch (error) {
        console.error("Error in Getting product: ", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
};

export const createProduct = async (req, res) => {
    const product = req.body;

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({success: false, message: "Please provide all fields!"});
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({success: true, data: newProduct});
    } catch (error) {
        console.error("Error in Create product: ", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
};

export const deleteOneProduct = async (req, res) => {
    const {id} = req.params;
    console.log("id:", id);

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Product Deleted"});
    } catch (error) {
        console.error("Error in Create product: ", error.message);
        res.status(500).json({success: false, message: "Not a valid product"});
    }
};

export const updateOneProduct = async (req, res) => {
    const {id} = req.params;
    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({success: false, message: "Server Error"});
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});
        res.status(200).json({success: true, data: updatedProduct});
    } catch (error) {
        console.error("Error in Update product: ", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
};