import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/Users';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Generate a JWT token
      const token = jwt.sign({ id: user._id, name: user.name, email: user.email, role: user.role }, process.env.NEXTAUTH_SECRET, { expiresIn: '1h' });

      // Set the token in a cookie
      res.setHeader('Set-Cookie', serialize('authToken', token, { path: '/', httpOnly: true, maxAge: 60 * 60 }));

      res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    } catch (err) {
      console.error('Error logging in user:', err.message);
      res.status(500).json({ message: 'Server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
