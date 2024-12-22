import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import User from '../models/User';

// Function to generate a random password
const generatePassword = (length: number): string => {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*(){}[]:,.<>/';
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
};

// Function to send an email
const sendEmail = async (email: string, password: string, name : string): Promise<void> => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Welcome to [LMS Name] - Your Account Details',
    html: `
      <h1>Welcome to [LMS Name]</h1>
      <p>Dear ${name},</p>
      <p>Your account has been created successfully! Here are your login credentials:</p>
      <ul>
        <li><strong>Username:</strong> ${email}</li>
        <li><strong>Password:</strong> ${password}</li>
      </ul>
      <p>Please log in using <a href="[Insert Login Link]">this link</a> and change your password upon first login for security purposes.</p>
      <p>Best regards,<br>[Your Team Name]</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${email}`);
  } catch (err) {
    console.error(`Failed to send email to ${email}:`, err);
    throw new Error('Email delivery failed');
  }
};

export const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { firstName, middleName, lastName, email, role } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    // Generate a random password
    const password = generatePassword(10);

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      firstName,
      middleName,
      lastName,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    // Send the email with the password
    await sendEmail(email, password, firstName + " " + lastName);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    next(err);
  }
};