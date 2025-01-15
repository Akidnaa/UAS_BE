const db = require('../config/database');

class Alumni {
    // Mendapatkan semua data alumni
    static getAll() {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM alumni';
            db.query(sql, (err, results) => {
                if (err) {
                    console.error("Error fetching all alumni:", err); // Log error
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    // Menambahkan data alumni baru
    static create({ name, phone, address, graduation_year, status, company_name, position }) {
        return new Promise((resolve, reject) => {
            const sql =
                'INSERT INTO alumni (name, phone, address, graduation_year, status, company_name, position) VALUES (?, ?, ?, ?, ?, ?, ?)';
            const values = [name, phone, address, graduation_year, status, company_name, position];

            db.query(sql, values, (err, results) => {
                if (err) {
                    console.error("Error inserting alumni:", err); // Log error
                    reject(err);
                } else {
                    resolve({
                        id: results.insertId,
                        name,
                        phone,
                        address,
                        graduation_year,
                        status,
                        company_name,
                        position,
                    });
                }
            });
        });
    }

    // Memperbarui data alumni berdasarkan ID
    static update(id, { name, phone, address, graduation_year, status, company_name, position }) {
        return new Promise((resolve, reject) => {
            const sql =
                'UPDATE alumni SET name = ?, phone = ?, address = ?, graduation_year = ?, status = ?, company_name = ?, position = ? WHERE id = ?';
            const values = [name, phone, address, graduation_year, status, company_name, position, id];

            db.query(sql, values, (err, results) => {
                if (err) {
                    console.error("Error updating alumni:", err); // Log error
                    reject(err);
                } else {
                    resolve(results.affectedRows > 0); // Mengembalikan true jika data berhasil diupdate
                }
            });
        });
    }

    // Menghapus data alumni berdasarkan ID
    static delete(id) {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM alumni WHERE id = ?';
            db.query(sql, [id], (err, results) => {
                if (err) {
                    console.error("Error deleting alumni:", err); // Log error
                    reject(err);
                } else {
                    resolve(results.affectedRows > 0); // Mengembalikan true jika data berhasil dihapus
                }
            });
        });
    }

    // Mencari alumni berdasarkan ID
    static find(id) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM alumni WHERE id = ?';
            db.query(sql, [id], (err, results) => {
                if (err) {
                    console.error("Error finding alumni by ID:", err); // Log error
                    reject(err);
                } else {
                    resolve(results[0] || null); // Mengembalikan null jika data tidak ditemukan
                }
            });
        });
    }

    // Mencari alumni berdasarkan nama
    static search(name) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM alumni WHERE name LIKE ?';
            const searchValue = `%${name}%`; // Gunakan wildcard untuk pencarian
            db.query(sql, [searchValue], (err, results) => {
                if (err) {
                    console.error("Error searching alumni by name:", err); // Log error
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    // Mencari alumni berdasarkan status (employed, unemployed, other)
    static findByStatus(status) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM alumni WHERE status = ?';
            db.query(sql, [status], (err, results) => {
                if (err) {
                    console.error("Error finding alumni by status:", err); // Log error
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }
}

module.exports = Alumni;
