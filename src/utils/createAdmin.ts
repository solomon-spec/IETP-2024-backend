import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import { registerUser } from '../controllers/userController';

dotenv.config();

const createAdmin = async () => {
  try {

    // Define the admin user details
    const adminDetails = {
      firstName: 'Solomon',
      middleName: 'Abate',
      lastName: 'Sitotaw',
      email: 'solomonabate18@gmail.com',
      role: 'admin',
    };

    // Create a mock request and response object
    const req = {
      body: adminDetails,
    } as Request;

    const res = {
      status: (code: number) => ({
        json: (data: any) => {
          console.log(`Status: ${code}, Data:`, data);
        },
      }),
    } as unknown as Response;

    const next: NextFunction = (err?: any) => {
      if (err) {
        console.error('Error:', err);
      }
    };

    // Call the registerUser function
    await registerUser(req, res, next);

    console.log('Admin user created successfully');
  } catch (err) {
    console.error('Error creating admin user:', err);
  } finally {
    // Close the database connection
    await mongoose.connection.close();
  }
};

createAdmin();