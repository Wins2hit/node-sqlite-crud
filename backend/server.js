require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

const R = 'products';

// GET all
app.get(`/api/${R}`, (req, res) => {
  try {
    const rows = db.prepare(`SELECT * FROM ${R} ORDER BY id DESC`).all();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET one
app.get(`/api/${R}/:id`, (req, res) => {
  try {
    const row = db.prepare(`SELECT * FROM ${R} WHERE id = ?`).get(req.params.id);
    if (!row) return res.status(404).json({ error: 'Not found' });
    res.json(row);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST
app.post(`/api/${R}`, (req, res) => {
  const { product_name, category, brand, price, stock_quantity, description } = req.body;
  try {
    const info = db.prepare(`INSERT INTO ${R} (product_name, category, brand, price, stock_quantity, description) VALUES (?, ?, ?, ?, ?, ?)`)
      .run(product_name, category, brand, price, stock_quantity, description);
    const newRow = db.prepare(`SELECT * FROM ${R} WHERE id = ?`).get(info.lastInsertRowid);
    res.status(201).json(newRow);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT
app.put(`/api/${R}/:id`, (req, res) => {
  const { product_name, category, brand, price, stock_quantity, description } = req.body;
  try {
    const info = db.prepare(`UPDATE ${R} SET product_name=?, category=?, brand=?, price=?, stock_quantity=?, description=?, updated_at=CURRENT_TIMESTAMP WHERE id=?`)
      .run(product_name, category, brand, price, stock_quantity, description, req.params.id);
    
    if (info.changes === 0) return res.status(404).json({ error: 'Not found' });
    
    const updatedRow = db.prepare(`SELECT * FROM ${R} WHERE id = ?`).get(req.params.id);
    res.json(updatedRow);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
app.delete(`/api/${R}/:id`, (req, res) => {
  try {
    const info = db.prepare(`DELETE FROM ${R} WHERE id = ?`).run(req.params.id);
    if (info.changes === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted', id: Number(req.params.id) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(process.env.PORT || 3000, () =>
  console.log(`🚀 API on http://localhost:${process.env.PORT || 3000}`)
);