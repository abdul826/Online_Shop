import Product from "../models/productModel.js";
import asyncHandler from '../middlewre/asyncHandler.js';

// Get All PRoduct
export const getProducts = asyncHandler(async(req,res)=>{
    const pageSize = 8;             // set the size of page
    const page = Number(req.query.pageNumber) || 1;      // get the pagenumber using req.query

    // Search logic
    const keyword = req.query.keyword ? {name: {$regex: req.query.keyword, $options:'i'}} : {}    // we get the search value from 
                                                                                            //query by using req.query.keyword and for case insensitiv use option
    const count = await Product.countDocuments({...keyword}); // count the product
    //console.log(count);

    const products = await Product.find({...keyword})
    .limit(pageSize)
    .skip(pageSize * (page-1));
    res.json({products, page, pages: Math.ceil(count/pageSize)});
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

  // @desc    Delete a product
// @route   delete /api/products/:id
// @access  Private/Admin
export const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
  
    if (product) {
      await Product.deleteOne({_id: product._id});
      res.status(200).json("Product Deleted Successfully");
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  });

  
  // @desc    Review a product
// @route   POST /api/products/:id/reviews
// @access  Private
export const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);       //get the product from perticular ID

  // Check product is already reviewed
  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    // If product already Reviewed
    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed');
    }

    // If product is not reviewed 
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);          // add the review in schema with the help of push method

    product.numReviews = product.reviews.length;     // find the length

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();    // save the project
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
export const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);

  res.json(products);
});