import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/Users';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      user = new User({
        _id: new mongoose.Types.ObjectId(),
        name,
        email,
        password: hashedPassword,
      });

      // Generate a JWT token without expiration
      const token = jwt.sign({ id: user._id, name: user.name, email: user.email, role: user.role }, process.env.NEXTAUTH_SECRET);

      // Store the token in the user's document
      user.jwtToken = token;
      await user.save();

      // Set the token in a cookie
      res.setHeader('Set-Cookie', serialize('authToken', token, { path: '/', httpOnly: true }));

      res.status(201).json({ message: 'User registered successfully', token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    } catch (err) {
      console.error('Error registering user:', err.message);
      res.status(500).json({ message: 'Server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
