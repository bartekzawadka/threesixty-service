'use strict';

module.exports = {
    db: {
        name: process.env['DB_NAME'] || 'threesixty',
        host: process.env['DB_HOST'] || 'localhost',
        user: process.env['DB_USER'] || 'user',
        password: process.env['DB_PASSWORD'] || 'password',
        port: process.env['DB_PORT'] || 3306
    }
};