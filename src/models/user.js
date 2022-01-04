// Mongoose
const { Schema, model } = require('mongoose');

// Models
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    photo: {
        type: String
    },
    description: {
        type: String
    },
    servicesOffered: {
        type: Array
    },
    workHistory: {
        type: Array
    },
    employeeHistory: {
        type: Array
    },
    reputation: {
        type: Array
    }
},{
    timestamps: true,
    versionKey: false 
});

// exportamos modelo
module.exports = model('user', userSchema);