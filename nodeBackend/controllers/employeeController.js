import asyncHandler from "express-async-handler";
import Employee from "../models/employeeModel.js";
import * as employeeService from "../service/employeeService.js";
import upload from "../config/multerConfig.js";
import { uploadFileToS3, deleteFileFromS3 } from "../service/s3Service.js";

// Get all employees
export const getDatas = asyncHandler(async (req, res) => {
    try {
        const employees = await employeeService.getAllEmployees(req.user.id);
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// Create a new employee with image
export const createEmployeeWithImage = [
    
    asyncHandler(async (req, res) => {
        const {
            salutation, firstName, lastName, email, phone, username, password, dob,
            gender, qualifications, address, country, state, city, pin
        } = req.body;
        console.log(req.body);

        if (
            !salutation || !firstName || !lastName || !email || !phone || !username || !password ||
            !dob || !gender || !qualifications || !address || !country || !state || !city || !pin
        ) {
            res.status(404).json({ message: "All fields are mandatory" });
            return;
        }

        try {
            let imageUrl = '';
            if (req.file) {
                imageUrl = await uploadFileToS3(req.file);
            }
            console.log(imageUrl);
            console.log(req.user);
            const newEmployee = {
                user_id: req.user.id,
                salutation, firstName, lastName, email, phone, username, password, dob,
                gender, qualifications, address, country, state, city, pin,
                image: imageUrl
            };

            console.log(newEmployee);

            const employees = await employeeService.createEmployee(newEmployee);
            res.status(201).json(employees);
        } catch (error) {
            console.error('Error creating employee with image', error);
            res.status(500).json({ message: "Failed to create employee" });
        }
    })
];

// Update an employee
export const updateEmployeeWithImage = asyncHandler(async (req, res) => {
    const employeeId = req.body._id;
    console.log(employeeId);
    const {
        salutation, firstName, lastName, email, phone, username, password, dob,
        gender, qualifications, address, country, state, city, pin
    } = req.body;

    if (
        !salutation || !firstName || !lastName || !email || !phone || !username || !password ||
        !dob || !gender || !qualifications || !address || !country || !state || !city || !pin
    ) {
        res.status(400).json({ message: "All fields are mandatory" });
        return;
    }

    try {
        const existingEmployee = await employeeService.getEmployeeById(employeeId);
        if (!existingEmployee) {
            res.status(404).json({ message: "Employee not found" });
            return;
        }

        let imageUrl = existingEmployee.image; // Retain existing image URL

        if (req.file) {
            // If a new image is provided, upload it and replace the old one
            if (existingEmployee.image) {
                // Delete the old image from S3
                const oldImageKey = existingEmployee.image.split('/').pop();
                await deleteFileFromS3(oldImageKey);
            }
            // Upload the new image to S3
            imageUrl = await uploadFileToS3(req.file);
        }

        const updatedEmployee = {
            salutation, firstName, lastName, email, phone, username, password, dob,
            gender, qualifications, address, country, state, city, pin,
            image: imageUrl
        };

        const result = await employeeService.updateEmployee(employeeId, updatedEmployee);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error updating employee with image', error);
        res.status(500).json({ message: "Failed to update employee" });
    }
});

// Delete an employee
export const deleteEmployee = asyncHandler(async (req, res) => {
    try {
        const employeeId = req.params.id;
        const deletedEmployee = await employeeService.deleteEmployee(employeeId);

        if (!deletedEmployee) {
            return res.status(404).json({ error: "Employee Not Found" });
        }

        res.status(200).json(deletedEmployee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Get an employee by ID
export const getData = asyncHandler(async (req, res) => {
    try {
        const employeeId = req.params.id;
        const employee = await employeeService.getEmployeeById(employeeId);
        res.status(200).json(employee);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// Search employees
export const searchEmployees = asyncHandler(async (req, res) => {
    try {
        const { page, limit, term } = req.query;
        const userId = req.user.id; // Assuming userId is available in req.user
        const employeesData = await employeeService.searchEmployees({ page: parseInt(page), limit: parseInt(limit), term, userId });
        res.status(200).json(employeesData);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});