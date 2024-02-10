const express = require("express");
const mongoose = require('mongoose');
const router = express.Router();
const Employee = require("./models/Employee");

const ObjectId = mongoose.Types.ObjectId;

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

//find by id

router.get("/getEmployee/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    return res.json({ Status: "Success", Result: employee });
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
} catch (err) {
  console.error(err.message)
  return res.status(500).json({Error: "Server Error"})
}

});

//update
router.put("/update/:id", async (req, res) => {
  try {
    const { name, address, contact } = req.body;

    // Check if the provided ID is a valid ObjectId
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ Error: "Invalid ObjectId" });
      console.log(ObjectId)
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      { name, address, contact },
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ Error: "Employee not found" });
    }

    return res.json({ Status: "Success", Result: updatedEmployee });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ Error: "Server Error" });
  }
});


// DELETE an employee
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Employee.findByIdAndDelete(id);
    return res.json({ Status: "Success", Message: "Employee deleted successfully" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ Error: "Server Error" });
  }
});


module.exports = router;
