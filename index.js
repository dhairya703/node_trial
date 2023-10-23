const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Product = require("./product"); // Import the Product model

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// Connect to MongoDB using async/await
(async () => {
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect("mongodb+srv://dhairya:07030703$@bitebook.xhmgjog.mongodb.net/flutter", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to MongoDB");

        // Define the /api/add_product route for adding products
        app.post("/api/add_product", async (req, res) => {
            console.log("Result", req.body);

            // Create a new instance of the Product model using the dataSchema
            const data = new Product({
                pname: req.body.pname,
                pprice: req.body.pprice,
                pdesc: req.body.pdesc
            });

            try {
                // Save the product data to the database
                const dataToStore = await data.save();
                res.status(200).json(dataToStore);
            } catch (error) {
                res.status(400).json({
                    'status': error.message
                });
            }
        });
        app.get("/api/get_product", async (req, res) => {
            try {
                // Use the `Product` model to find all products in the database
                const data = await Product.find({}); // Use Product.find() to retrieve all products
                
                res.status(200).json(data);
            } catch (error) {
                res.status(500).json({
                    'status': error.message
                });
            }
        });
        // ...

// Define a route to get a product by ID
app.get("/api/get_product/:id", async (req, res) => {
    try {
        // Use the `Product` model to find a product by its ID
        const productId = req.params.id; // Extract the product ID from the request parameters
        const product = await Product.findById(productId);

        if (!product) {
            // If the product with the given ID is not found, return a 404 status code
            res.status(404).json({ 'message': 'Product not found' });
        } else {
            // If the product is found, return it as JSON
            res.status(200).json(product);
        }
    } catch (error) {
        // Handle any errors
        res.status(500).json({
            'status': error.message
        });
    }
});
app.put("/api/update_product/:id", async (req, res) => {
    try {
        const productId = req.params.id;
        console.log("Product ID:", productId);

        const updatedProductData = req.body;
        console.log("Updated Product Data:", updatedProductData);

        const updatedProduct = await Product.findByIdAndUpdate(productId, updatedProductData, { new: true });
        console.log("Updated Product:", updatedProduct);

        if (!updatedProduct) {
            console.log("Product not found");
            res.status(404).json({ 'message': 'Product not found' });
        } else {
            res.status(200).json(updatedProduct);
        }
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ 'status': error.message });
    }
});
app.delete("/api/delete_product/:id", async (req, res) => {
    try {
        const productId = req.params.id; // Extract the product ID from the URL

        // Use the `Product` model to find and delete the product by its ID
        const deletedProduct = await Product.findByIdAndRemove(productId);

        if (!deletedProduct) {
            res.status(404).json({ 'message': 'Product not found' });
        } else {
            res.status(200).json({ 'message': 'Product deleted successfully' });
        }
    } catch (error) {
        res.status(500).json({ 'status': error.message });
    }
});
        // Start your Express server
        app.listen(3000, () => {
            console.log("Connected to server at 3000");
        });
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
})();
