import employeeSchema from "../models/employeeModel.js";
import mongoose from "mongoose";

export const getAllEmployees = async (userId) => {
    const employees = await employeeSchema.find({ user_id: userId }).sort({ createdAt: -1 });
    return employees;
};

export const createEmployee = async (newEmployee) => {
    try {
        const employee = await employeeSchema.create(newEmployee);
        return employee;
    } catch (error) {
        throw new Error("Error Creating Employee");
    }
};


export const  getEmployeeById = async (id) => {
    try {
      const employee = await employeeSchema.findById(id);
      return employee;
    } catch (error) {
      console.error(`Error fetching employee with id ${id}:`, error);
      throw new Error('Error fetching employee');
    }
  };

  

export const deleteEmployee = async (employeeId) => {
    console.log(employeeId);
    try {
        const deleteEmployee = await employeeSchema.findByIdAndDelete(employeeId);

        if (!deleteEmployee) {
            throw new Error("Employee Not found");
        }
        return deleteEmployee;
    } catch {
        throw new Error("Error in deleting Employee");
    }
};

export const  updateEmployee = async (employeeId, updatedEmployee) => {
    try {
        const employee = await employeeSchema.findByIdAndUpdate(employeeId, updatedEmployee, {
            new: true,
            
        });
        return employee;
    } catch (error) {
        console.error('Error updating employee', error);
        throw new Error('Error updating employee');
    }
};




export const searchEmployees = async ({ page = 1, limit, term, userId }) => {
    const query = [];

    try {
        // Convert userId to ObjectId if necessary (assuming userId is provided as a string)
        const ObjectId = mongoose.Types.ObjectId;
        const userIdObjectId = new ObjectId(userId);

        // Match stage to filter by user_id ObjectId
        query.push({ $match : { user_id : userIdObjectId}});
        console.log(term);
        // Optional: Add another match stage for search term if needed
        if (term) {
            query.push({
                $match: {
                    $or: [
                        { firstName: { $regex: term, $options: 'i' } },
                        { lastName: { $regex: term, $options: 'i' } },
                        { address: { $regex: term, $options: 'i' } },
                        { city: { $regex: term, $options: 'i' } },
                        { country: { $regex: term, $options: 'i' } },
                        { dob: { $regex: term, $options: 'i' } },
                        { email: { $regex: term, $options: 'i' } },
                        { firstName: { $regex: term, $options: 'i' } },
                        { lastName: { $regex: term, $options: 'i' } },
                        { phone: { $regex: term, $options: 'i' } },
                        { pin: { $regex: term, $options: 'i' } },
                        { qualifications: { $regex: term, $options: 'i' } },
                        { salutaion: { $regex: term, $options: 'i' } },
                        { state: { $regex: term, $options: 'i' } },
                        { username: { $regex: term, $options: 'i' } },
                        // Add other fields to search as needed
                    ],
                },
            });
        }

        // Pagination
        const skip = (page - 1) * limit;
        query.push(
            { $skip: skip },
            { $limit: limit }
        );

        // Execute aggregation query
        const employees = await employeeSchema.aggregate(query);

        // Count total employees for pagination
        const totalEmployees = await employeeSchema.countDocuments({
            user_id: userIdObjectId,
            ...(term && {
                $or: [
                    { firstName: { $regex: term, $options: 'i' } },
                    { lastName: { $regex: term, $options: 'i' } },
                    { email: { $regex: term, $options: 'i' } },
                    // Add other fields to search as needed
                ],
            }),
        });

        return { employees, totalEmployees };
    } catch (error) {
        // Handle errors
        console.error('Error searching employees:', error);
        throw new Error('Failed to fetch employees. Please try again.'); // Throw a custom error message or handle gracefully
    }
};
