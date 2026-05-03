import express from 'express';
import User from '../models/User.js';
import Place from '../models/Place.js';
import Contact from '../models/Contact.js';
import Service from '../models/Service.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.get('/stats', protect, adminOnly, async (req, res) => {
  try {
    const [totalUsers, totalPlaces, totalContacts, totalServices, unreadContacts] = await Promise.all([
      User.countDocuments({ role: 'user' }),
      Place.countDocuments({ isActive: true }),
      Contact.countDocuments(),
      Service.countDocuments({ isActive: true }),
      Contact.countDocuments({ status: 'unread' })
    ]);

    const recentUsers = await User.find({ role: 'user' })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('-password');

    const recentContacts = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalUsers,
      totalPlaces,
      totalContacts,
      totalServices,
      unreadContacts,
      recentUsers,
      recentContacts
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/users', protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/users/:id', protect, adminOnly, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role: req.body.role, isActive: req.body.isActive },
      { new: true }
    ).select('-password');

    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/users/:id', protect, adminOnly, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/seed', protect, adminOnly, async (req, res) => {
  try {
    const places = [
      {
        name: 'Santorini Sunset Escape', location: 'Santorini', country: 'Greece',
        description: 'Experience the iconic white-washed buildings perched on volcanic cliffs, breathtaking caldera views and world-famous sunsets. Santorini offers a perfect blend of natural beauty, rich history, and vibrant culture.',
        shortDesc: 'Iconic caldera views & world-famous sunsets',
        price: 2499, duration: '7 Days / 6 Nights', category: 'Luxury',
        image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800',
        rating: 4.9, reviews: 342, maxGroupSize: 12, isFeatured: true,
        highlights: ['Caldera sunset cruise', 'Wine tasting tour', 'Oia village walk', 'Black sand beach'],
        included: ['Accommodation', 'Breakfast daily', 'Airport transfers', 'Guided tours'],
        notIncluded: ['Flights', 'Travel insurance', 'Personal expenses']
      },
      {
        name: 'Bali Spirit Journey', location: 'Ubud', country: 'Indonesia',
        description: 'Immerse yourself in Balinese culture among ancient temples, lush rice terraces and spiritual traditions. Discover the island of the gods through its art, cuisine and natural wonders.',
        shortDesc: 'Ancient temples & lush rice terraces',
        price: 1299, duration: '10 Days / 9 Nights', category: 'Cultural',
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
        rating: 4.8, reviews: 567, maxGroupSize: 16, isFeatured: true,
        highlights: ['Tegallalang Rice Terraces', 'Temple hopping', 'Cooking class', 'Yoga retreat'],
        included: ['Accommodation', 'Breakfast daily', 'Airport transfers', 'Cultural experiences'],
        notIncluded: ['International flights', 'Visa fees', 'Personal shopping']
      },
      {
        name: 'Safari Serengeti Adventure', location: 'Serengeti', country: 'Tanzania',
        description: 'Witness one of Earth\'s greatest spectacles â€“ the Great Migration. Vast plains teeming with lions, elephants and zebras await you in one of Africa\'s most iconic national parks.',
        shortDesc: 'Witness the great wildebeest migration',
        price: 3899, duration: '8 Days / 7 Nights', category: 'Wildlife',
        image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800',
        rating: 4.9, reviews: 218, maxGroupSize: 8, isFeatured: true,
        highlights: ['Big Five game drives', 'Hot air balloon safari', 'Maasai village visit', 'Bush dinner'],
        included: ['Luxury lodge stay', 'All meals', 'Game drives', 'Park fees'],
        notIncluded: ['International flights', 'Visa', 'Tips & gratuities']
      },
      {
        name: 'Machu Picchu Discovery', location: 'Cusco', country: 'Peru',
        description: 'Trek to one of the world\'s most iconic ancient sites, the lost city of the Incas. Wind through cloud forests, Andean villages and centuries of history.',
        shortDesc: 'Trek to the lost city of the Incas',
        price: 1899, duration: '9 Days / 8 Nights', category: 'Adventure',
        image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800',
        rating: 4.8, reviews: 445, maxGroupSize: 14, isFeatured: true,
        highlights: ['Inca Trail trek', 'Sun Gate sunrise', 'Sacred Valley tour', 'Cusco city walk'],
        included: ['Accommodation', 'Most meals', 'Guided hikes', 'Train tickets'],
        notIncluded: ['International flights', 'Travel insurance', 'Extra meals']
      },
      {
        name: 'Maldives Overwater Paradise', location: 'North MalÃ© Atoll', country: 'Maldives',
        description: 'Live your dream in a private overwater bungalow. Crystal-clear lagoons, vibrant coral reefs and pristine white-sand beaches create the ultimate tropical escape.',
        shortDesc: 'Overwater bungalow in turquoise lagoon',
        price: 4299, duration: '6 Days / 5 Nights', category: 'Beach',
        image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800',
        rating: 5.0, reviews: 189, maxGroupSize: 4, isFeatured: false,
        highlights: ['Overwater villa stay', 'Snorkeling & diving', 'Sunset dolphin cruise', 'Private beach'],
        included: ['Overwater bungalow', 'Full board meals', 'Seaplane transfers', 'Water sports'],
        notIncluded: ['International flights', 'Alcohol', 'Spa treatments']
      },
      {
        name: 'Bangkok Street Food Tour', location: 'Bangkok', country: 'Thailand',
        description: 'Dive into the vibrant chaos of Bangkok â€“ a city of golden temples, bustling markets and incredible street food. From tuk-tuks to night markets, Bangkok delivers nonstop excitement.',
        shortDesc: 'Temples, markets & sizzling street food',
        price: 699, duration: '5 Days / 4 Nights', category: 'Budget',
        image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800',
        rating: 4.6, reviews: 734, maxGroupSize: 20, isFeatured: false,
        highlights: ['Grand Palace visit', 'Floating market tour', 'Street food crawl', 'Muay Thai show'],
        included: ['Hotel accommodation', 'Breakfast', 'City tour', 'Airport pickup'],
        notIncluded: ['Flights', 'Lunches & dinners', 'Optional excursions']
      }
    ];

    const services = [
      { title: 'Flight Booking', description: 'Best deals on flights worldwide with 24/7 support', icon: 'âœˆï¸', features: ['Best price guarantee', 'Flexible booking', '24/7 support', 'Group discounts'], price: 'From $29', order: 1 },
      { title: 'Hotel Reservation', description: 'Handpicked hotels from budget to luxury', icon: 'ðŸ¨', features: ['200,000+ hotels', 'Free cancellation', 'Instant confirmation', 'Loyalty rewards'], price: 'From $0 fee', order: 2 },
      { title: 'Tour Packages', description: 'All-inclusive tour packages to top destinations', icon: 'ðŸ—ºï¸', features: ['Expert guides', 'All-inclusive', 'Small groups', 'Custom itineraries'], price: 'From $499', order: 3 },
      { title: 'Visa Assistance', description: 'Hassle-free visa processing for any destination', icon: 'ðŸ“‹', features: ['100+ countries', 'Fast processing', 'Expert advice', 'Application support'], price: 'From $49', order: 4 },
      { title: 'Travel Insurance', description: 'Comprehensive coverage for worry-free travel', icon: 'ðŸ›¡ï¸', features: ['Medical coverage', 'Trip cancellation', 'Lost luggage', 'Emergency support'], price: 'From $15', order: 5 },
      { title: 'Car Rental', description: 'Wide selection of vehicles at every destination', icon: 'ðŸš—', features: ['No hidden fees', 'GPS included', 'Unlimited mileage', 'Road assistance'], price: 'From $25/day', order: 6 }
    ];

    await Place.deleteMany({});
    await Service.deleteMany({});
    await Place.insertMany(places);
    await Service.insertMany(services);

    res.json({ message: 'Seed data created successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
