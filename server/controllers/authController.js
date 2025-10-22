// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { randomUUID } = require('crypto');
const supabase = require('../db/supabaseClient');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-here'; // Fallback for development

const signup = async (req, res) => {
    try {
        const { email, name, password } = req.body;

        // Validate inputs
        if (!email || !name || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if email already exists
        const { data: existingUser } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .maybeSingle(); // Use maybeSingle instead of single to avoid error if not found

        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate user ID
        const userId = randomUUID().toString();

        // Insert new user
        const { data, error } = await supabase
            .from('users')
            .insert([{ id: userId, email, name, password: hashedPassword }])
            .select() // Add .select() to return the inserted data
            .single();

        if (error) {
            console.error('Supabase error:', error);
            return res.status(500).json({ message: 'Error creating user', error: error.message });
        }

        // Create JWT
        const token = jwt.sign({ id: data.id, email: data.email }, JWT_SECRET, { expiresIn: '7d' });

        // Set HTTP-only cookie
        res.cookie('token', token, { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', // Only secure in production
            sameSite: 'lax', // Changed from 'Strict' to 'lax'
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
        
        res.status(201).json({ 
            message: 'User created successfully',
            user: {
                id: data.id,
                name: data.name,
                email: data.email
            }
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Check if user exists
        const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .maybeSingle();

        if (!user || error) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Create JWT
        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

        // Set HTTP-only cookie
        res.cookie('token', token, { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        
        res.status(200).json({ 
            message: 'Login successful',
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const logout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
};

const me = async (req, res) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const { data: user, error } = await supabase
            .from('users')
            .select('id, email, name, created_at')
            .eq('id', decoded.id)
            .single();

        if (error || !user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        res.status(200).json(user);
    } catch (err) {
        console.error('Me error:', err);
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = { signup, login, logout, me };
