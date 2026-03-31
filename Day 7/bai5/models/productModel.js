const db = require('../config/database');

const Product = {
    getAllProducts: (callback) => {
        db.query('SELECT * FROM product', (err, results) => {
            if (err) return callback(err);
            return callback(null, results);
        });
    },
};

module.exports = Product;