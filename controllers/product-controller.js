const Product = require("../models/product-model");

// Get All the products list

const getProducts = async (req, res, next) => {
  let products;
  try {
    products = await Product.find({});
  } catch (error) {
    res.json({ message: "Unable to process" });
  }
  res.json({
    products: [...products],
    message: "Successfull",
  });
};

// Add Product
const addProduct = async (req, res, next) => {
  let {
    productTitle,
    upc,
    unitCost,
    productCountries,
    productFormats,
    creator,
    currency,
  } = req.body;
  let addedProduct = new Product({
    productTitle,
    upc,
    unitCost,
    productCountries,
    productFormats,
    creator,
    currency,
  });
  let product;
  try {
    product = await Product.findOne({ upc: upc });
    await addedProduct.save();
  } catch (error) {
    res.json({ message: "Unable to add! Please contact support team" });
  }
  if (product) {
    res.json({ message: "Already added! If you want, Please change upc" });
  } else {
    try {
      await addedProduct.save();
    } catch (error) {
      res.json({ message: "Unable to add! Please contact support team" });
    }
  }
  res.json({ message: "Successfully added" });
};

// Search Product

const searchProduct = async (req, res, next) => {
  console.log("Req", req.params.productName);
  let products;
  try {
    products = await (
      await Product.find({})
    ).filter((item) =>
      item.productTitle
        .toLowerCase()
        .includes(req.params.productName.toLowerCase())
    );
  } catch (error) {
    res.json({ message: "Please try after some time" });
  }
  res.json({
    products: [...products],
    message: "Sucessfull",
  });
};

//Search Product along with country and format and (upc or title)

const searchProductAlongwithFormat = async (req, res, next) => {
  const { productFormat, productCountry, upc, productTitle } = req.params;
  let products;
  try {
    products = await (
      await Product.find({})
    ).filter((item) =>
      upc
        ? Number(item.upc) === Number(upc)
        : item.productTitle
            .toLowerCase()
            .includes(productTitle.toLowerCase()) &&
          item.productCountries.map(
            (coun) =>
              coun.toLowerCase().includes(productCountry.toLowerCase()) &&
              item.productFormats.map((format) =>
                format.toLowerCase().includes(productFormat.toLowerCase())
              )
          )
    );
  } catch (error) {
    res.json({ message: "Please try again after some time" });
  }
  res.json({
    productFormat: productFormat,
    prooductCountry: productCountry,
    products: [...products],
    message: "Sucessfull",
  });
};

const deleteProduct = async (req, res, next) => {
  const id = req.params.id;
  let product;
  try {
    product = await Product.findByIdAndDelete(id);
    // getProducts();
  } catch (error) {
    res
      .status("412")
      .json({ message: "Error found! Please contact suport team" });
  }

  if (product) {
    let products;
    try {
      products = await Product.find({});
    } catch (error) {
      res.json({ message: "Unable to process" });
    }
    res.json({
      products: [...products],
      message: "Successfull",
    });
  } else {
    res.status(400).json({ message: "Please contact support team" });
  }
};

exports.addProduct = addProduct;
exports.searchProduct = searchProduct;
exports.searchProductAlongwithFormat = searchProductAlongwithFormat;
exports.getProducts = getProducts;
exports.deleteProduct = deleteProduct;
