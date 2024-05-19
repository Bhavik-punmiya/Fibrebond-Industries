const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;
const fs = require('fs');
require('dotenv').config();

const WooCommerce = new WooCommerceRestApi({
   url: 'https://fibrebondindustries.com/', 
   consumerKey: process.env.KEY,
   consumerSecret: process.env.SECRET, 
   version: 'wc/v3'
});

// Example of fetching products
WooCommerce.get("products")
  .then((response) => {
    // Write the response data to a file
    fs.writeFileSync('products.json', JSON.stringify(response.data, null, 2));
    console.log("Products have been written to products.json");
  })
  .catch((error) => {
    console.error("Error fetching products:", error.response ? error.response.data : error.message);
  });
