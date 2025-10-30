const mongoose = require("mongoose");
// Category Schema
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: String,
        parentCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        default: null
    },
        isActive: {
        type: Boolean,
        default: true
    }
});

const categoryModel = mongoose.model("Category", categorySchema);
module.exports=categoryModel;