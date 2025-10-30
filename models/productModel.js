const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, index: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  comparePrice: {
    type: Number,
    min: 0,
    validate: {
      validator(v) { return v == null || v >= this.price; },
      message: 'comparePrice debe ser >= price'
    }
  },
  sku: { type: String, required: true, unique: true, uppercase: true, trim: true },
  stock: { type: Number, required: true, min: 0, default: 0 },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  images: [String],
  specifications: { type: Map, of: String },
  isAvailable: { type: Boolean, default: true },
  supplier: { name: String, contact: String },
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

productSchema.index({ name: "text", description: "text" });
productSchema.index({ sku: 1 }, { unique: true });
productSchema.index({ category: 1 });

module.exports = mongoose.model('Product', productSchema);
