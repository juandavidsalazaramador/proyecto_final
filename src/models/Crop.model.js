const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true
    },
    area: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Activo', 'En Crecimiento', 'Cosechado'],
        default: 'Activo'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Crop', cropSchema);