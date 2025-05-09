import express from 'express';
import axios from 'axios';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/api/auth/register', async (req, res) => {
    try {
        const response = await axios.post(`${process.env.AUTH_SERVICE_URL}/api/auth/register`, req.body);
        res.json({ success: true, data: response.data });
    } catch (err) {
        res.status(err.response?.status || 500).json({ error: err.response?.data?.error || 'Server error' });
    }
});

router.post('/api/auth/login', async (req, res) => {
    try {
        const response = await axios.post(`${process.env.AUTH_SERVICE_URL}/api/auth/login`, req.body);
        res.json({ success: true, data: response.data });
    } catch (err) {
        res.status(err.response?.status || 500).json({ error: err.response?.data?.error || 'Server error' });
    }
});

router.get('/api/auth/get-profile', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id

        const response = await axios.get(`${process.env.AUTH_SERVICE_URL}/api/auth/get-profile/${userId}`);
        res.json({ success: true, data: response.data });
    } catch (err) {
        res.status(err.response?.status || 500).json({ error: err.response?.data?.error || 'Server error' });
    }
});

router.get('/api/shorten/user-url', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id

        const response = await axios.get(`${process.env.URL_SERVICE_URL}/api/shorten/user-url/${userId}`);
        res.json({ success: true, data: response.data });
    } catch (err) {
        res.status(err.response?.status || 500).json({ error: err.response?.data?.error || 'Server error' });
    }
});

router.post('/api/shorten', async (req, res) => {
    try {
        const response = await axios.post(`${process.env.URL_SERVICE_URL}/api/shorten`, req.body);
        res.json({ success: true, shortUrl: response.data.shortUrl });
    } catch (err) {
        res.status(err.response?.status || 500).json({ error: err.response?.data?.error || 'Server error' });
    }
});

router.get('/api/:shortId', async (req, res) => {
    try {
        const response = await axios.get(`${process.env.URL_SERVICE_URL}/${req.params.shortId}`);
        res.redirect({ success: true, data: response.request.res.responseUrl }); // redirect theo kết quả
    } catch (err) {
        res.status(404).json({ error: 'Short URL not found' });
    }
});

export default router;
