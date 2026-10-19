require('dotenv').config();
const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

// Use the DB file from .env
const db = new Database(process.env.DB_FILE || 'database.sqlite');

// Read and execute the schema
const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
db.exec(schema);

console.log('✅ Database ready');

module.exports = db;