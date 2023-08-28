import Product from "../models/productModel.js";
import asyncHandler from '../middlewre/asyncHandler.js';

// Get All PRoduct
export const getProducts = asyncHandler(async(req,res)=>{
    const products = await Product.find({});
    res.json(products);
});

// Get Single Product
export const getProduct = asyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.id)
    if(product){
        return res.status(200).json(product);
    }else{
        res.status(404);
        throw new Error("Resource Not Found");
    }

});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
      name: 'Sample name',
      price: 0,
      user: req.user._id,
      image: '/images/sample.jpg',
      brand: 'Sample brand',
      category: 'Sample category',
      countInStock: 0,
      numReviews: 0,
      description: 'Sample description',
    });
  
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  });

  // @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, description,image, brand, category, countInStock } =
      req.body;
  
    const product = await Product.findById(req.params.id);
  
    if (product) {
      product.name = name;
      product.price = price;
      product.description = description;
      product.image = image;
      product.brand = brand;
      product.category = category;
      product.countInStock = countInStock;
  
      const updatedProduct = await product.save();
      // console.log(updatedProduct);
      res.json(updatedProduct);
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  });