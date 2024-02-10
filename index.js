const express = require("express");
const cors = require("cors");
const connectDB = require("./mongoDB");
 const employeeRoutes = require("./employeeRoutes");
 const userRoutes = require("./userRoutes");


const app = express();
const port = 3001;

app.use(express.json());

app.use(cors());

connectDB();

app.use("/", employeeRoutes);
app.use("/", userRoutes);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
