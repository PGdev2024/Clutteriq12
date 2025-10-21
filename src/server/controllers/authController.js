// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const supabase = require('../db/supabaseClient');

const JWT_SECRET = process.env.JWT_SECRET;

const signup = async (req, res) => {
    const { email, name, password } = req.body;

    // Validate inputs
    if (!email || !name || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if email already exists
    const { data: existingUser, error: emailError } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

    if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const { data, error } = await supabase
        .from('users')
        .insert([{ id: crypto.randomUUID(), email, name, password: hashedPassword }]);

    if (error) {
        return res.status(500).json({ message: 'Error creating user' });
    }

    // Create JWT
    const token = jwt.sign({ id: data[0].id }, JWT_SECRET, { expiresIn: '1h' });

    // Set HTTP-only cookie
    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'Strict' });
    res.status(201).json({ message: 'User created successfully' });
};

const login = async (req, res) => {
    const { email, password } = req.body;

    // Check if user exists
    const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

    if (!user || error) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create JWT
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });

    // Set HTTP-only cookie
    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'Strict' });
    res.status(200).json({ message: 'Login successful' });
};

const logout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
};

const me = async (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', decoded.id)
            .single();

        if (error) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        res.status(200).json(user);
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = { signup, login, logout, me };
