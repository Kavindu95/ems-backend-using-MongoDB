const express = require("express");
const router = express.Router();
const Employee = require("./models/Employee");

// Get Employees
router.get("/getEmployee", async (req, res) => {
  try {
    const employees = await Employee.find();
    return res.json({ Status: "Success", Result: employees });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ Error: "Server Error" });
  }
});



module.exports = router;
