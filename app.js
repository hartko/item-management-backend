const express = require('express');
const app = express();
const connectDB = require('./modules/config/database');
const cors = require("cors");
connectDB();
app.use(express.json());
app.use(cors());

// Set up a basic route
app.get('/', (req, res) => {
  res.send('Hey!');
});

app.use("/api/item", require('./modules/item/item.route'));
app.use("/api/auth", require('./modules/auth/auth.route'));

// Define the port the app will listen on
const PORT = process.env.PORT || 4000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});