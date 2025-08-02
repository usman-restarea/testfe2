const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const dbPool = mysql.createPool({
    host: 'localhost',
    user: 'root', 
    password: '', 
    database: 'usmanfe2',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

async function testConnection() {
    try {
        const connection = await dbPool.getConnection();
        console.log('✅ Database connected successfully');
        connection.release();
    } catch (error) {
        console.error('❌ Database connection failed:', error.message);
    }
}

app.get('/api/active-projects', async (req, res) => {
    try {
        const [results] = await dbPool.execute('SELECT * FROM products');
        
        res.status(200).json({
            success: true,
            count: results.length,
            data: results
        });
    } catch (error) {
        console.error('Database query error:', error);
        res.status(500).json({ 
            success: false,
            error: 'Failed to fetch data',
            message: error.message 
        });
    }
});

app.get('/api/active-projects/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [results] = await dbPool.execute('SELECT * FROM products WHERE id = ?', [id]);
        
        if (results.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }
        
        res.status(200).json({
            success: true,
            data: results[0]
        });
    } catch (error) {
        console.error('Database query error:', error);
        res.status(500).json({ 
            success: false,
            error: 'Failed to fetch data',
            message: error.message 
        });
    }
});

app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'API is running',
        timestamp: new Date().toISOString()
    });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, async () => {
    console.log(`🚀 API server running on http://localhost:${PORT}`);
    console.log(`🔗 Active projects: http://localhost:${PORT}/api/active-projects`);
    await testConnection();
});