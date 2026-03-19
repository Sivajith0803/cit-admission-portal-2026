const express = require('express');
const mysql = require('mysql2');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();

// 1. Database Connection Pool (Fixes ECONNREFUSED issues)
const db = mysql.createPool({
    host: 'localhost', 
    user: 'root', 
    password: '', 
    database: 'college_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// 2. Middleware
app.use(express.static('public')); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// 3. Setup Photo Uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, './public/uploads/'),
    filename: (req, file, cb) => cb(null, 'SID-' + Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage: storage });

// 4. HOME ROUTE (Fixes "Cannot GET /")
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 5. API ROUTE: Fetch Student Details for Receipt
app.get('/student-details/:id', (req, res) => {
    const sql = "SELECT * FROM students WHERE id = ?";
    db.query(sql, [req.params.id], (err, result) => {
        if (err || result.length === 0) {
            return res.status(404).json({ error: "Student not found" });
        }
        res.json(result[0]);
    });
});

// 6. The Submit Route
app.post('/submit', upload.single('photo'), (req, res) => {
    const { 
        name, email, level, course, marks, 
        prev_degree, scholarship, scholarship_percent 
    } = req.body;
    
    const photo = req.file ? req.file.filename : 'default.png';
    const txnId = 'TXN' + Math.floor(Math.random() * 1000000);

    const sql = `INSERT INTO students 
                (name, email, level, course, marks, prev_degree, scholarship, scholarship_percent, photo, payment_status, transaction_id) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'Paid', ?)`;
    
    const values = [
        name, email, level, course, marks, 
        prev_degree || 'N/A', 
        scholarship, 
        scholarship_percent || 0, 
        photo, 
        txnId
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("❌ SQL Error:", err);
            return res.status(500).json({ success: false, error: err.message });
        }
        
        console.log(`✅ Student Registered: ${name} for ${course}`);
        res.json({ 
            success: true, 
            id: result.insertId, 
            name: name 
        });
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`\n🚀 COLLEGE ADMISSION SYSTEM ONLINE`);
    console.log(`📍 Link: http://localhost:${PORT}`);
});