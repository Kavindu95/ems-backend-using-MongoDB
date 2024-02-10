const express = require("express");
const router = express.Router();
const Employee = require("./models/Employee");
const e = require("express");

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

//enroll new employee

router.post("/create", async(req, res)=>{
try {
  const {name, address, contact} =req.body;
  const newEmployee= new Employee({name, address, contact});
  await newEmployee.save();
  return res.json({Status: "Success", Result: newEmployee})
} catch (error) {
  console.log(error.message)
  return res.status(500).json({Error: "Server Error"})
}

});


module.exports = router;
