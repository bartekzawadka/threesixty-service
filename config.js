'use strict';

module.exports = {
    db: {
        uri: process.env['DB_URI'] || 'mongodb://localhost:27017/threesixty',
        options: {
            user: '',
            pass: ''
        }
    }
};