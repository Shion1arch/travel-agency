import mongoose from 'mongoose';

const placeSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  location: { type: String, required: true },
  country: { type: String, required: true },
  description: { type: String, required: true },
  shortDesc: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: String, required: true },
  category: {
    type: String,
    enum: ['Adventure', 'Beach', 'Cultural', 'Wildlife', 'Luxury', 'Budget', 'Family'],
    required: true
  },
  image: { type: String, required: true },
  gallery: [{ type: String }],
  rating: { type: Number, default: 4.5, min: 1, max: 5 },
  reviews: { type: Number, default: 0 },
  maxGroupSize: { type: Number, required: true },
  highlights: [{ type: String }],
  included: [{ type: String }],
  notIncluded: [{ type: String }],
  isFeatured: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  startDates: [{ type: Date }]
}, { timestamps: true });

export default mongoose.model('Place', placeSchema);
