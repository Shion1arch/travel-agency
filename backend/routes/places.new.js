import express from 'express';
import Place from '../models/Place.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

const PLACE_CATEGORIES = new Set(['Adventure', 'Beach', 'Cultural', 'Wildlife', 'Luxury', 'Budget', 'Family']);
const DEFAULT_CATEGORY = 'Adventure';
const DEFAULT_DURATION = 'Custom package';
const DEFAULT_GROUP_SIZE = 10;
const DEFAULT_RATING = 4.5;
const DEFAULT_COUNTRY = 'TBD';

const normalizeText = (value) => String(value || '').trim();

const normalizeNumber = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const normalizeBoolean = (value) => {
  if (typeof value === 'boolean') return value;

  if (typeof value === 'number') {
    if (value === 1) return true;
    if (value === 0) return false;
    return null;
  }

  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase();
    if (['true', '1', 'yes', 'on'].includes(normalized)) return true;
    if (['false', '0', 'no', 'off'].includes(normalized)) return false;
  }

  return null;
};

const normalizeStringArray = (value) => {
  if (Array.isArray(value)) {
    return value.map(normalizeText).filter(Boolean);
  }

  if (typeof value === 'string') {
    return value.split(',').map(normalizeText).filter(Boolean);
  }

  return [];
};

const normalizeDateArray = (value) => {
  const rawValues = Array.isArray(value)
    ? value
    : typeof value === 'string'
      ? value.split(',')
      : [];

  return rawValues
    .map((entry) => new Date(entry))
    .filter((date) => !Number.isNaN(date.getTime()));
};

const buildShortDescription = (description) => {
  const normalized = normalizeText(description);
  if (!normalized) return '';
  return normalized.length > 90 ? `${normalized.slice(0, 87).trim()}...` : normalized;
};

const parseLocationParts = (locationValue, countryValue) => {
  const location = normalizeText(locationValue);
  const country = normalizeText(countryValue);

  if (country) {
    return { location, country };
  }

  if (!location.includes(',')) {
    return { location, country: '' };
  }

  const parts = location
    .split(',')
    .map(normalizeText)
    .filter(Boolean);

  if (parts.length < 2) {
    return { location, country: '' };
  }

  return {
    location: parts.slice(0, -1).join(', '),
    country: parts.at(-1)
  };
};

const normalizeCategory = (value) => {
  const category = normalizeText(value);
  return PLACE_CATEGORIES.has(category) ? category : DEFAULT_CATEGORY;
};

const buildCreatePayload = (body) => {
  const name = normalizeText(body.name);
  const description = normalizeText(body.description);
  const image = normalizeText(body.image);
  const price = normalizeNumber(body.price);
  const { location, country } = parseLocationParts(body.location, body.country);

  if (!name || !location || !description || !image) {
    return { error: 'Name, location, description, and image are required' };
  }

  if (price === null || price < 0) {
    return { error: 'Price must be a valid non-negative number' };
  }

  const rating = normalizeNumber(body.rating);
  const reviews = normalizeNumber(body.reviews);
  const maxGroupSize = normalizeNumber(body.maxGroupSize);

  return {
    payload: {
      name,
      location,
      country: country || DEFAULT_COUNTRY,
      description,
      shortDesc: normalizeText(body.shortDesc) || buildShortDescription(description),
      price,
      duration: normalizeText(body.duration) || DEFAULT_DURATION,
      category: normalizeCategory(body.category),
      image,
      gallery: normalizeStringArray(body.gallery),
      rating: rating === null ? DEFAULT_RATING : Math.min(5, Math.max(1, rating)),
      reviews: reviews === null ? 0 : Math.max(0, reviews),
      maxGroupSize: maxGroupSize === null ? DEFAULT_GROUP_SIZE : Math.max(1, maxGroupSize),
      highlights: normalizeStringArray(body.highlights),
      included: normalizeStringArray(body.included),
      notIncluded: normalizeStringArray(body.notIncluded),
      isFeatured: normalizeBoolean(body.isFeatured) ?? false,
      isActive: normalizeBoolean(body.isActive) ?? true,
      startDates: normalizeDateArray(body.startDates)
    }
  };
};

const buildUpdatePayload = (body) => {
  const updates = {};

  if (Object.prototype.hasOwnProperty.call(body, 'name')) {
    const name = normalizeText(body.name);
    if (!name) return { error: 'Name cannot be empty' };
    updates.name = name;
  }

  if (Object.prototype.hasOwnProperty.call(body, 'location')) {
    const rawLocation = normalizeText(body.location);
    if (!rawLocation) return { error: 'Location cannot be empty' };

    const parsed = parseLocationParts(rawLocation, body.country);
    updates.location = parsed.location;

    if (parsed.country) {
      updates.country = parsed.country;
    }
  } else if (Object.prototype.hasOwnProperty.call(body, 'country')) {
    const country = normalizeText(body.country);
    if (!country) return { error: 'Country cannot be empty' };
    updates.country = country;
  }

  if (Object.prototype.hasOwnProperty.call(body, 'description')) {
    const description = normalizeText(body.description);
    if (!description) return { error: 'Description cannot be empty' };
    updates.description = description;

    if (!Object.prototype.hasOwnProperty.call(body, 'shortDesc')) {
      updates.shortDesc = buildShortDescription(description);
    }
  }

  if (Object.prototype.hasOwnProperty.call(body, 'shortDesc')) {
    const shortDesc = normalizeText(body.shortDesc);
    if (!shortDesc) return { error: 'Short description cannot be empty' };
    updates.shortDesc = shortDesc;
  }

  if (Object.prototype.hasOwnProperty.call(body, 'image')) {
    const image = normalizeText(body.image);
    if (!image) return { error: 'Image cannot be empty' };
    updates.image = image;
  }

  if (Object.prototype.hasOwnProperty.call(body, 'duration')) {
    const duration = normalizeText(body.duration);
    if (!duration) return { error: 'Duration cannot be empty' };
    updates.duration = duration;
  }

  if (Object.prototype.hasOwnProperty.call(body, 'category')) {
    updates.category = normalizeCategory(body.category);
  }

  if (Object.prototype.hasOwnProperty.call(body, 'price')) {
    const price = normalizeNumber(body.price);
    if (price === null || price < 0) return { error: 'Price must be a valid non-negative number' };
    updates.price = price;
  }

  if (Object.prototype.hasOwnProperty.call(body, 'rating')) {
    const rating = normalizeNumber(body.rating);
    if (rating === null) return { error: 'Rating must be a number' };
    updates.rating = Math.min(5, Math.max(1, rating));
  }

  if (Object.prototype.hasOwnProperty.call(body, 'reviews')) {
    const reviews = normalizeNumber(body.reviews);
    if (reviews === null) return { error: 'Reviews must be a number' };
    updates.reviews = Math.max(0, reviews);
  }

  if (Object.prototype.hasOwnProperty.call(body, 'maxGroupSize')) {
    const maxGroupSize = normalizeNumber(body.maxGroupSize);
    if (maxGroupSize === null || maxGroupSize < 1) return { error: 'Max group size must be at least 1' };
    updates.maxGroupSize = maxGroupSize;
  }

  if (Object.prototype.hasOwnProperty.call(body, 'gallery')) {
    updates.gallery = normalizeStringArray(body.gallery);
  }

  if (Object.prototype.hasOwnProperty.call(body, 'highlights')) {
    updates.highlights = normalizeStringArray(body.highlights);
  }

  if (Object.prototype.hasOwnProperty.call(body, 'included')) {
    updates.included = normalizeStringArray(body.included);
  }

  if (Object.prototype.hasOwnProperty.call(body, 'notIncluded')) {
    updates.notIncluded = normalizeStringArray(body.notIncluded);
  }

  if (Object.prototype.hasOwnProperty.call(body, 'startDates')) {
    updates.startDates = normalizeDateArray(body.startDates);
  }

  if (Object.prototype.hasOwnProperty.call(body, 'isFeatured')) {
    const isFeatured = normalizeBoolean(body.isFeatured);
    if (isFeatured === null) return { error: 'Featured flag must be true or false' };
    updates.isFeatured = isFeatured;
  }

  if (Object.prototype.hasOwnProperty.call(body, 'isActive')) {
    const isActive = normalizeBoolean(body.isActive);
    if (isActive === null) return { error: 'Active flag must be true or false' };
    updates.isActive = isActive;
  }

  return { payload: updates };
};

const createPlace = async (req, res) => {
  try {
    const { payload, error } = buildCreatePayload(req.body);
    if (error) {
      return res.status(400).json({ message: error });
    }

    const place = await Place.create(payload);
    res.status(201).json(place);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

router.get('/', async (req, res) => {
  try {
    const { category, search, sort } = req.query;
    const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1);
    const limit = Math.min(50, Math.max(1, Number.parseInt(req.query.limit, 10) || 12));
    const query = { isActive: true };

    if (category && category !== 'All') query.category = category;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { country: { $regex: search, $options: 'i' } }
      ];
    }

    let sortObj = {};
    if (sort === 'price-asc') sortObj = { price: 1 };
    else if (sort === 'price-desc') sortObj = { price: -1 };
    else if (sort === 'rating') sortObj = { rating: -1 };
    else sortObj = { createdAt: -1 };

    const total = await Place.countDocuments(query);
    const places = await Place.find(query)
      .sort(sortObj)
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      places,
      total,
      pages: Math.max(1, Math.ceil(total / limit)),
      page
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/featured', async (req, res) => {
  try {
    const places = await Place.find({ isFeatured: true, isActive: true }).limit(6);
    res.json(places);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) return res.status(404).json({ message: 'Place not found' });
    res.json(place);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', protect, adminOnly, createPlace);
router.post('/add', protect, adminOnly, createPlace);

router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const { payload, error } = buildUpdatePayload(req.body);
    if (error) {
      return res.status(400).json({ message: error });
    }

    const place = await Place.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true
    });

    if (!place) return res.status(404).json({ message: 'Place not found' });
    res.json(place);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const place = await Place.findByIdAndDelete(req.params.id);
    if (!place) return res.status(404).json({ message: 'Place not found' });
    res.json({ message: 'Place deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
