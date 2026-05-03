const PLACE_EXPERIENCE_OVERRIDES = {
  'santorini sunset escape': {
    budgetTemplate: [
      { label: 'Cliffside stay', share: 0.4, note: 'Boutique suite stay and breakfast service.' },
      { label: 'Cruise and tastings', share: 0.19, note: 'Sunset sailing and curated local tastings.' },
      { label: 'Island transfers', share: 0.13, note: 'Arrival, departure, and in-tour transfers.' },
      { label: 'Hosted dining moments', share: 0.12, note: 'Reserved dining and welcome/farewell meals.' },
      { label: 'Fees and entries', share: 0.07, note: 'Port fees and experience reservations.' },
      { label: 'Trip support', share: 0.09, note: 'On-ground host support and concierge planning.' }
    ],
    guides: [
      {
        name: 'Elena Markou',
        title: 'Lead island curator',
        experience: '11 years guiding premium Greek island trips',
        languages: ['English', 'Greek', 'Italian'],
        rating: '4.9 guest score',
        bio: 'Coordinates sailing windows, cliffside stays, and premium dining reservations for a smooth island pace.'
      },
      {
        name: 'Nikos Petrou',
        title: 'Local route specialist',
        experience: '8 years on caldera and coastal experiences',
        languages: ['English', 'Greek'],
        rating: '4.8 guest score',
        bio: 'Leads village walks, winery visits, and low-crowd route planning across Oia and nearby beach stops.'
      }
    ],
    facts: [
      { label: 'Stay style', value: 'Cliffside boutique suites' },
      { label: 'Trip pace', value: 'Relaxed with premium outings' },
      { label: 'Best for', value: 'Couples and celebration travel' },
      { label: 'Guide coverage', value: '2 hosts across the journey' }
    ],
    itinerary: [
      { label: 'Day 1', title: 'Arrival and caldera welcome', detail: 'Private arrival support, hotel check-in, and an evening orientation overlooking the caldera.' },
      { label: 'Day 2', title: 'Oia slow walk and sunset viewpoints', detail: 'A guided stroll through whitewashed lanes with reserved time at quieter scenic points before sunset.' },
      { label: 'Day 4', title: 'Cruise the volcanic coast', detail: 'Cruise stops, beach time, and tasting sessions coordinated around the best weather window.' },
      { label: 'Day 6', title: 'Flexible island day', detail: 'Choose spa, beach club, shopping, or a private add-on while the team manages timing and reservations.' }
    ]
  },
  'bali spirit journey': {
    budgetTemplate: [
      { label: 'Villa and hotel stays', share: 0.34, note: 'Curated boutique stays in Ubud and nearby retreat zones.' },
      { label: 'Cultural experiences', share: 0.22, note: 'Temple entries, workshops, and local host-led activities.' },
      { label: 'Ground transport', share: 0.14, note: 'Airport pickup and private day transfers.' },
      { label: 'Meals and tastings', share: 0.11, note: 'Breakfast and hosted culinary moments.' },
      { label: 'Retreat logistics', share: 0.08, note: 'Wellness sessions and retreat coordination.' },
      { label: 'Trip support', share: 0.11, note: 'Daily briefings and guest care throughout the trip.' }
    ],
    guides: [
      {
        name: 'Maya Wibowo',
        title: 'Cultural host and journey lead',
        experience: '9 years across temple, craft, and wellness routes',
        languages: ['English', 'Bahasa Indonesia'],
        rating: '4.9 guest score',
        bio: 'Brings together ritual etiquette, storytelling, and local partner coordination for a more meaningful Bali experience.'
      },
      {
        name: 'Ketut Arimbawa',
        title: 'Community experience guide',
        experience: '7 years with village and culinary tours',
        languages: ['English', 'Bahasa Indonesia'],
        rating: '4.8 guest score',
        bio: 'Focuses on market visits, cooking sessions, and slower cultural moments that guests usually miss on rushed group tours.'
      }
    ],
    facts: [
      { label: 'Stay style', value: 'Boutique villas and garden stays' },
      { label: 'Trip pace', value: 'Balanced sightseeing and downtime' },
      { label: 'Best for', value: 'Culture seekers and wellness travel' },
      { label: 'Guide coverage', value: 'Daily lead host plus local specialists' }
    ],
    itinerary: [
      { label: 'Day 1', title: 'Arrival in Ubud', detail: 'Airport meet-and-greet, villa transfer, and a calm first-night briefing over local dinner recommendations.' },
      { label: 'Day 3', title: 'Rice terraces and creative village stops', detail: 'Early scenic route planning, walking time through the terraces, and an artisan-led cultural visit.' },
      { label: 'Day 5', title: 'Temple circuit and rituals', detail: 'A respectful temple day with transport, etiquette guidance, and time built in for reflection and photos.' },
      { label: 'Day 8', title: 'Cooking and wellness reset', detail: 'A slower day with culinary learning, wellness time, and optional spa or yoga scheduling.' }
    ]
  },
  'safari serengeti adventure': {
    budgetTemplate: [
      { label: 'Safari lodge stay', share: 0.39, note: 'Luxury tented lodges and remote camp logistics.' },
      { label: 'Game drives and field guiding', share: 0.24, note: 'Driver-guide time, safari vehicles, and tracking support.' },
      { label: 'Park fees', share: 0.13, note: 'Protected area access and permits.' },
      { label: 'Meals and bush dining', share: 0.1, note: 'Full-board catering in camp and field.' },
      { label: 'Regional transfers', share: 0.07, note: 'Airstrip coordination and park transfer handling.' },
      { label: 'Safety and guest support', share: 0.07, note: 'Operations support, ranger coordination, and emergency planning.' }
    ],
    guides: [
      {
        name: 'Daniel Njoroge',
        title: 'Lead safari naturalist',
        experience: '13 years in East African wildlife expeditions',
        languages: ['English', 'Swahili'],
        rating: '5.0 guest score',
        bio: 'Leads game-drive strategy, migration timing, and wildlife interpretation with a calm, safety-first approach.'
      },
      {
        name: 'Asha Mbele',
        title: 'Camp host and field coordinator',
        experience: '8 years in lodge operations and guest care',
        languages: ['English', 'Swahili'],
        rating: '4.9 guest score',
        bio: 'Handles camp transitions, bush-dinner logistics, and guest comfort while keeping the itinerary on track.'
      }
    ],
    facts: [
      { label: 'Stay style', value: 'Tented safari lodges' },
      { label: 'Trip pace', value: 'Early starts and active game drives' },
      { label: 'Best for', value: 'Wildlife photography and nature lovers' },
      { label: 'Guide coverage', value: 'Lead naturalist and field coordinator' }
    ],
    itinerary: [
      { label: 'Day 1', title: 'Arrival and lodge briefing', detail: 'Transfer into camp, settle in, and review wildlife zones and safety plans with the guide team.' },
      { label: 'Day 2', title: 'Full-day game drive', detail: 'A long-form drive with meal breaks in the field and flexible routing based on recent sightings.' },
      { label: 'Day 4', title: 'Balloon and migration corridor', detail: 'Early flight conditions permitting, followed by ground exploration of high-activity wildlife areas.' },
      { label: 'Day 7', title: 'Community and farewell evening', detail: 'A final day mixing lighter safari time with hosted dinner and departure prep.' }
    ]
  },
  'machu picchu discovery': {
    budgetTemplate: [
      { label: 'Hotels and mountain stays', share: 0.32, note: 'Cusco hotels and trek support accommodation.' },
      { label: 'Guided trekking support', share: 0.23, note: 'Lead trek guide, route support, and daily briefings.' },
      { label: 'Rail and route permits', share: 0.18, note: 'Train segments, trail access, and timed site entry.' },
      { label: 'Ground transport', share: 0.1, note: 'Airport pickup and inter-city road transfers.' },
      { label: 'Meals and trail logistics', share: 0.08, note: 'Hosted meals and trek-day supply coordination.' },
      { label: 'Trip support', share: 0.09, note: 'Operations support and arrival-to-departure assistance.' }
    ],
    guides: [
      {
        name: 'Lucia Quispe',
        title: 'Andean trek leader',
        experience: '10 years on Cusco and Sacred Valley routes',
        languages: ['English', 'Spanish', 'Quechua'],
        rating: '4.9 guest score',
        bio: 'Manages acclimatization pacing, route education, and site interpretation for first-time Peru travelers.'
      },
      {
        name: 'Mateo Rojas',
        title: 'Trail operations guide',
        experience: '7 years supporting multi-stop hiking journeys',
        languages: ['English', 'Spanish'],
        rating: '4.8 guest score',
        bio: 'Coordinates rail timings, day packs, and transition points so trekking days stay predictable and comfortable.'
      }
    ],
    facts: [
      { label: 'Stay style', value: 'Historic city hotels and mountain stays' },
      { label: 'Trip pace', value: 'Active with altitude-aware scheduling' },
      { label: 'Best for', value: 'Bucket-list hikers and history lovers' },
      { label: 'Guide coverage', value: '2 trek guides on key movement days' }
    ],
    itinerary: [
      { label: 'Day 1', title: 'Cusco arrival and acclimatization', detail: 'A gentle arrival day with transfer support and time to settle before walking the city.' },
      { label: 'Day 3', title: 'Sacred Valley route', detail: 'Scenic driving, cultural stops, and gradual altitude pacing before the deeper trek section begins.' },
      { label: 'Day 5', title: 'Trail highlights and support pacing', detail: 'Guided movement across the route with rest timing and hydration checks built into the plan.' },
      { label: 'Day 7', title: 'Machu Picchu access day', detail: 'Early transfer, timed entry, and guided storytelling through the site before return logistics.' }
    ]
  },
  'maldives overwater paradise': {
    budgetTemplate: [
      { label: 'Overwater villa stay', share: 0.48, note: 'Premium bungalow stay and resort access.' },
      { label: 'Boat and seaplane transfers', share: 0.14, note: 'Arrival and departure transfers timed with resort operations.' },
      { label: 'Water activities', share: 0.14, note: 'Snorkeling support and guided marine outings.' },
      { label: 'Dining plan', share: 0.11, note: 'Full-board meals and hosted dining moments.' },
      { label: 'Resort fees', share: 0.05, note: 'Mandatory service and handling costs.' },
      { label: 'Guest support', share: 0.08, note: 'Resort liaison and travel coordination.' }
    ],
    guides: [
      {
        name: 'Lea Fernandes',
        title: 'Resort experience host',
        experience: '8 years across island and marine leisure trips',
        languages: ['English', 'Hindi'],
        rating: '4.9 guest score',
        bio: 'Coordinates villa requests, marine activities, and romantic add-ons without forcing a tight itinerary.'
      },
      {
        name: 'Ibrahim Shifan',
        title: 'Marine activity specialist',
        experience: '9 years in reef and lagoon experiences',
        languages: ['English', 'Dhivehi'],
        rating: '4.9 guest score',
        bio: 'Handles snorkeling windows, reef briefings, and weather-aware planning for water activities.'
      }
    ],
    facts: [
      { label: 'Stay style', value: 'Private overwater villas' },
      { label: 'Trip pace', value: 'Very relaxed with curated activities' },
      { label: 'Best for', value: 'Honeymoons and premium beach escapes' },
      { label: 'Guide coverage', value: 'Resort host plus activity specialist' }
    ],
    itinerary: [
      { label: 'Day 1', title: 'Island arrival and villa check-in', detail: 'Transfer support into the resort, villa walkthrough, and easy first-evening planning.' },
      { label: 'Day 2', title: 'Lagoon and reef day', detail: 'Guided water activity timing with plenty of downtime between sessions.' },
      { label: 'Day 4', title: 'Private leisure window', detail: 'Use the day for spa, beach time, or a custom marine add-on with scheduling help from the host team.' },
      { label: 'Day 5', title: 'Farewell dinner and departure prep', detail: 'Final dining reservations, packing support, and clean timing for next-day transfers.' }
    ]
  },
  'bangkok street food tour': {
    budgetTemplate: [
      { label: 'City hotel stay', share: 0.28, note: 'Comfort hotel accommodation in a central base area.' },
      { label: 'Food trail and tastings', share: 0.24, note: 'Guided night-market and signature tasting stops.' },
      { label: 'Local transport', share: 0.17, note: 'Airport pickup plus city movement across key neighborhoods.' },
      { label: 'Guided city touring', share: 0.12, note: 'Hosted route planning across temples and markets.' },
      { label: 'Entry fees', share: 0.08, note: 'Temple and activity handling where applicable.' },
      { label: 'Trip support', share: 0.11, note: 'On-call host support and daily coordination.' }
    ],
    guides: [
      {
        name: 'Arun Chaiyasit',
        title: 'Food route lead',
        experience: '9 years in Bangkok culinary touring',
        languages: ['English', 'Thai'],
        rating: '4.8 guest score',
        bio: 'Builds each food crawl around market flow, guest spice comfort, and the city neighborhoods with the best evening energy.'
      },
      {
        name: 'Pimlada Sorn',
        title: 'City culture coordinator',
        experience: '6 years guiding temples and neighborhood walks',
        languages: ['English', 'Thai'],
        rating: '4.7 guest score',
        bio: 'Adds context around city history, temple etiquette, and the practical details that help guests move easily through Bangkok.'
      }
    ],
    facts: [
      { label: 'Stay style', value: 'Central city hotel' },
      { label: 'Trip pace', value: 'Fast-moving city adventure' },
      { label: 'Best for', value: 'Food lovers and first-time Bangkok visitors' },
      { label: 'Guide coverage', value: '2 hosts on peak evening touring days' }
    ],
    itinerary: [
      { label: 'Day 1', title: 'Arrival and neighborhood reset', detail: 'Airport pickup, hotel check-in, and a short area orientation so guests can settle in quickly.' },
      { label: 'Day 2', title: 'Temple and heritage circuit', detail: 'A structured city day with timing built around traffic, temple etiquette, and shaded walking breaks.' },
      { label: 'Day 3', title: 'Market and street food crawl', detail: 'Evening routing across proven food stops with flexible tasting suggestions based on your comfort level.' },
      { label: 'Day 4', title: 'Floating market or free city time', detail: 'Choose between a hosted add-on or a lighter city day with recommendations from the local team.' }
    ]
  }
};

const CATEGORY_BUDGET_TEMPLATES = {
  Adventure: [
    { label: 'Stay and route lodging', share: 0.31, note: 'Hotels, lodges, or trail stays.' },
    { label: 'Guided experiences', share: 0.24, note: 'Lead guide time and guided activities.' },
    { label: 'Transport and transfers', share: 0.16, note: 'Ground movement during the trip.' },
    { label: 'Meals', share: 0.11, note: 'Hosted meals and select refreshments.' },
    { label: 'Entries and permits', share: 0.08, note: 'Tickets, permits, or route access.' },
    { label: 'Trip support', share: 0.1, note: 'Guest care and operations coverage.' }
  ],
  Beach: [
    { label: 'Resort stay', share: 0.42, note: 'Beach or villa accommodation.' },
    { label: 'Transfers', share: 0.16, note: 'Airport and island movement.' },
    { label: 'Experiences', share: 0.14, note: 'Water and leisure activities.' },
    { label: 'Dining plan', share: 0.1, note: 'Meals included in the package.' },
    { label: 'Fees', share: 0.07, note: 'Handling and booking fees.' },
    { label: 'Trip support', share: 0.11, note: 'Host coordination and guest support.' }
  ],
  Cultural: [
    { label: 'Stay', share: 0.33, note: 'Boutique or centrally located accommodation.' },
    { label: 'Cultural activities', share: 0.23, note: 'Guided entries, workshops, and touring.' },
    { label: 'Transfers', share: 0.15, note: 'Airport and regional movement.' },
    { label: 'Meals', share: 0.1, note: 'Hosted breakfasts and select food experiences.' },
    { label: 'Entries and fees', share: 0.08, note: 'Site access and reservations.' },
    { label: 'Trip support', share: 0.11, note: 'Local host care and operations.' }
  ],
  Wildlife: [
    { label: 'Remote stay', share: 0.38, note: 'Lodges or camp accommodation.' },
    { label: 'Field guiding', share: 0.25, note: 'Naturalist support and guided drives.' },
    { label: 'Park fees', share: 0.12, note: 'Protected area access.' },
    { label: 'Transport', share: 0.09, note: 'Regional transfers and local movement.' },
    { label: 'Meals', share: 0.08, note: 'Full-board or hosted catering.' },
    { label: 'Trip support', share: 0.08, note: 'Safety and guest support.' }
  ],
  Luxury: [
    { label: 'Premium stay', share: 0.4, note: 'High-end accommodation and service.' },
    { label: 'Curated experiences', share: 0.19, note: 'Private or premium touring moments.' },
    { label: 'Transfers', share: 0.13, note: 'Private or upgraded transport handling.' },
    { label: 'Dining', share: 0.11, note: 'Hosted dining moments.' },
    { label: 'Fees', share: 0.07, note: 'Reservations and handling.' },
    { label: 'Trip support', share: 0.1, note: 'Concierge and guest care.' }
  ],
  Budget: [
    { label: 'Hotel stay', share: 0.27, note: 'Comfort-focused accommodation.' },
    { label: 'Guided activities', share: 0.24, note: 'Core experiences and hosted routing.' },
    { label: 'City transport', share: 0.17, note: 'Shared or efficient local movement.' },
    { label: 'Meals', share: 0.09, note: 'Breakfasts and select tastings.' },
    { label: 'Entries', share: 0.08, note: 'Activity and site costs.' },
    { label: 'Trip support', share: 0.15, note: 'Customer support and operations.' }
  ],
  Family: [
    { label: 'Family stay', share: 0.34, note: 'Rooms suited for shared travel.' },
    { label: 'Activities', share: 0.22, note: 'Kid-friendly guided experiences.' },
    { label: 'Transfers', share: 0.16, note: 'Simple point-to-point movement.' },
    { label: 'Meals', share: 0.1, note: 'Hosted meal coverage.' },
    { label: 'Entries', share: 0.08, note: 'Tickets and pre-booking costs.' },
    { label: 'Trip support', share: 0.1, note: 'Extra coordination for family travel.' }
  ]
};

const CATEGORY_GUIDE_FALLBACKS = {
  Adventure: [
    {
      name: 'Aarav Sen',
      title: 'Lead adventure coordinator',
      experience: '9 years running active small-group journeys',
      languages: ['English', 'Hindi'],
      rating: '4.8 guest score',
      bio: 'Keeps the route moving smoothly with a balance of safety checks, local insight, and calm group pacing.'
    },
    {
      name: 'Lina Costa',
      title: 'Trail support guide',
      experience: '6 years supporting multi-stop outdoor trips',
      languages: ['English', 'Spanish'],
      rating: '4.7 guest score',
      bio: 'Helps with logistics, timing, and local coordination so active days still feel manageable and fun.'
    }
  ],
  Beach: [
    {
      name: 'Lea Martin',
      title: 'Resort host',
      experience: '7 years across leisure and island trips',
      languages: ['English', 'French'],
      rating: '4.8 guest score',
      bio: 'Coordinates downtime, resort requests, and activity timing without crowding the guest experience.'
    },
    {
      name: 'Ravi Das',
      title: 'Activity coordinator',
      experience: '5 years in coastal experiences',
      languages: ['English', 'Hindi'],
      rating: '4.7 guest score',
      bio: 'Helps guests move easily between relaxed beach time and optional water activities.'
    }
  ],
  Cultural: [
    {
      name: 'Maya Lewis',
      title: 'Cultural journey lead',
      experience: '8 years guiding heritage-focused trips',
      languages: ['English', 'Spanish'],
      rating: '4.9 guest score',
      bio: 'Adds context, local etiquette, and storytelling so every stop feels more connected and less rushed.'
    },
    {
      name: 'Rahul Bose',
      title: 'Local experience host',
      experience: '6 years in food and neighborhood tours',
      languages: ['English', 'Hindi'],
      rating: '4.7 guest score',
      bio: 'Handles city movement and local experiences with a practical, guest-friendly rhythm.'
    }
  ],
  Wildlife: [
    {
      name: 'Daniel Cole',
      title: 'Wildlife lead guide',
      experience: '12 years in nature expeditions',
      languages: ['English'],
      rating: '4.9 guest score',
      bio: 'Focuses on sightings, route planning, and safety decisions while keeping guests informed and comfortable.'
    },
    {
      name: 'Neema Hassan',
      title: 'Field operations host',
      experience: '7 years in remote camp logistics',
      languages: ['English', 'Swahili'],
      rating: '4.8 guest score',
      bio: 'Bridges operations and guest care so remote journeys stay polished from start to finish.'
    }
  ],
  Luxury: [
    {
      name: 'Sophia Bennett',
      title: 'Luxury travel host',
      experience: '10 years across high-touch private journeys',
      languages: ['English'],
      rating: '4.9 guest score',
      bio: 'Handles upgrades, reservations, and guest preferences so the trip feels thoughtful at every step.'
    },
    {
      name: 'Marco Silva',
      title: 'Experience coordinator',
      experience: '7 years in premium destination hosting',
      languages: ['English', 'Portuguese'],
      rating: '4.8 guest score',
      bio: 'Manages timing and local partners to keep premium moments feeling seamless instead of scheduled.'
    }
  ],
  Budget: [
    {
      name: 'Arjun Patel',
      title: 'City trip lead',
      experience: '8 years on value-focused small-group tours',
      languages: ['English', 'Hindi'],
      rating: '4.7 guest score',
      bio: 'Builds efficient days that cover the essentials well without making the pace feel chaotic.'
    },
    {
      name: 'Kim Rivera',
      title: 'Guest support host',
      experience: '5 years in urban group travel',
      languages: ['English', 'Tagalog'],
      rating: '4.6 guest score',
      bio: 'Keeps transfers, meal timing, and guest questions under control during busy city days.'
    }
  ],
  Family: [
    {
      name: 'Nora Haddad',
      title: 'Family trip lead',
      experience: '9 years designing multi-age travel days',
      languages: ['English', 'Arabic'],
      rating: '4.8 guest score',
      bio: 'Balances activity, rest, and flexibility so both adults and kids stay engaged through the trip.'
    },
    {
      name: 'Sam Collins',
      title: 'Family logistics guide',
      experience: '6 years in group coordination',
      languages: ['English'],
      rating: '4.7 guest score',
      bio: 'Focuses on simple transitions, easy pickups, and schedule adjustments for shared family travel.'
    }
  ]
};

const DEFAULT_INCLUDED = {
  Adventure: ['Accommodation', 'Ground transfers', 'Lead guide support', 'Select meals'],
  Beach: ['Accommodation', 'Airport transfers', 'Hosted activities', 'Breakfast or meal plan'],
  Cultural: ['Accommodation', 'Airport transfers', 'Local experiences', 'Daily breakfast'],
  Wildlife: ['Accommodation', 'Game drives', 'Park access support', 'Meals during safari days'],
  Luxury: ['Premium accommodation', 'Private transfers', 'Concierge support', 'Curated experiences'],
  Budget: ['Accommodation', 'Airport pickup', 'City touring', 'Daily breakfast'],
  Family: ['Accommodation', 'Family-friendly activities', 'Transfers', 'Guest support']
};

const DEFAULT_NOT_INCLUDED = ['International flights', 'Personal shopping', 'Optional add-on activities'];

const STAY_BY_CATEGORY = {
  Adventure: 'Route-based stays',
  Beach: 'Resort or villa stay',
  Cultural: 'Boutique city stay',
  Wildlife: 'Remote lodge stay',
  Luxury: 'Premium hosted stay',
  Budget: 'Comfort city hotel',
  Family: 'Family-friendly rooms'
};

const PACE_BY_CATEGORY = {
  Adventure: 'Active with guided movement',
  Beach: 'Slow and easygoing',
  Cultural: 'Balanced sightseeing pace',
  Wildlife: 'Early starts with long field windows',
  Luxury: 'Flexible and concierge-led',
  Budget: 'Efficient city pacing',
  Family: 'Moderate with more flexibility'
};

const BEST_FOR_BY_CATEGORY = {
  Adventure: 'Active travelers',
  Beach: 'Relaxed getaways',
  Cultural: 'Heritage and food lovers',
  Wildlife: 'Nature-focused travelers',
  Luxury: 'Premium, slower travel',
  Budget: 'Value-focused explorers',
  Family: 'Shared multigenerational trips'
};

const EXTRA_BUDGET_SHARE = {
  Adventure: 0.13,
  Beach: 0.16,
  Cultural: 0.12,
  Wildlife: 0.14,
  Luxury: 0.18,
  Budget: 0.11,
  Family: 0.13
};

const normalizeKey = (value = '') => value.trim().toLowerCase();

const toCurrency = (value) => {
  const amount = Number(value) || 0;
  return `$${amount.toLocaleString()}`;
};

const toAmount = (value) => {
  const amount = Number(value);
  return Number.isFinite(amount) ? Math.max(0, Math.round(amount)) : 0;
};

const buildBudgetFromTemplate = (price, template) => {
  const safePrice = toAmount(price);
  const source = Array.isArray(template) && template.length ? template : CATEGORY_BUDGET_TEMPLATES.Adventure;
  let allocated = 0;

  return source.map((item, index) => {
    const amount = index === source.length - 1
      ? Math.max(0, safePrice - allocated)
      : Math.round(safePrice * item.share);

    allocated += amount;

    return {
      label: item.label,
      note: item.note,
      amount
    };
  });
};

const buildFallbackGuides = (place) => {
  const source = CATEGORY_GUIDE_FALLBACKS[place.category] || CATEGORY_GUIDE_FALLBACKS.Adventure;
  const guideCount = place.maxGroupSize > 10 || ['Luxury', 'Wildlife', 'Family'].includes(place.category) ? 2 : 1;

  return source.slice(0, guideCount).map((guide) => ({
    ...guide,
    bio: `${guide.bio} This departure is prepared around ${place.location} and nearby anchor experiences.`
  }));
};

const buildFallbackFacts = (place, guideCount) => ([
  { label: 'Stay style', value: STAY_BY_CATEGORY[place.category] || STAY_BY_CATEGORY.Adventure },
  { label: 'Trip pace', value: PACE_BY_CATEGORY[place.category] || PACE_BY_CATEGORY.Adventure },
  { label: 'Best for', value: BEST_FOR_BY_CATEGORY[place.category] || BEST_FOR_BY_CATEGORY.Adventure },
  { label: 'Guide coverage', value: `${guideCount} ${guideCount === 1 ? 'lead guide' : 'on-trip guides'}` }
]);

const buildFallbackItinerary = (place) => {
  const highlights = Array.isArray(place.highlights) ? place.highlights.filter(Boolean) : [];
  const middleDays = highlights.slice(0, 3).map((highlight, index) => ({
    label: `Day ${index + 2}`,
    title: highlight,
    detail: `A guided ${highlight.toLowerCase()} session with timing, transport, and on-ground coordination already planned for the group.`
  }));

  return [
    {
      label: 'Day 1',
      title: `Arrival in ${place.location}`,
      detail: 'Arrival support, hotel check-in, and a short briefing so everyone understands the pace, inclusions, and next-day start.'
    },
    ...middleDays,
    {
      label: 'Final day',
      title: 'Departure or onward extension',
      detail: 'Checkout planning, transfer support, and help with any onward travel or optional extensions.'
    }
  ].slice(0, Math.max(3, Math.min(5, highlights.length + 2)));
};

const buildPlanningDetails = (place, guideCount) => {
  const dates = Array.isArray(place.startDates)
    ? place.startDates
        .map((entry) => new Date(entry))
        .filter((date) => !Number.isNaN(date.getTime()))
        .sort((a, b) => a - b)
        .slice(0, 3)
        .map((date) => date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }))
    : [];

  return {
    items: [
      {
        label: 'Upcoming departure',
        value: dates[0] || (place.category === 'Luxury' ? 'Private dates on request' : 'Flexible group departures')
      },
      {
        label: 'Guide assignment',
        value: `${guideCount} ${guideCount === 1 ? 'lead guide' : 'trip guides'} reserved`
      },
      {
        label: 'Final travel kit',
        value: 'Shared 7 days before departure'
      }
    ],
    note: dates.length > 1
      ? `Also available: ${dates.slice(1).join(' | ')}`
      : 'Your confirmation pack includes pickup steps, stay details, and the final guide contact sheet.'
  };
};

const buildIncluded = (place) => (
  Array.isArray(place.included) && place.included.length
    ? place.included
    : (DEFAULT_INCLUDED[place.category] || DEFAULT_INCLUDED.Adventure)
);

const buildNotIncluded = (place) => (
  Array.isArray(place.notIncluded) && place.notIncluded.length
    ? place.notIncluded
    : DEFAULT_NOT_INCLUDED
);

const buildExtraBudget = (place) => {
  const share = EXTRA_BUDGET_SHARE[place.category] || EXTRA_BUDGET_SHARE.Adventure;
  const suggested = Math.round(((Number(place.price) || 0) * share) / 10) * 10;
  return Math.max(80, suggested);
};

const buildGuideInitials = (name) => (
  String(name || '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || '')
    .join('')
);

export const formatCurrency = (value) => toCurrency(value);

export const getPlaceBookingDetails = (place) => {
  const override = PLACE_EXPERIENCE_OVERRIDES[normalizeKey(place.name)] || {};
  const guides = override.guides || buildFallbackGuides(place);
  const budgetBreakdown = buildBudgetFromTemplate(
    place.price,
    override.budgetTemplate || CATEGORY_BUDGET_TEMPLATES[place.category] || CATEGORY_BUDGET_TEMPLATES.Adventure
  );

  return {
    budgetBreakdown,
    guides: guides.map((guide) => ({
      ...guide,
      initials: buildGuideInitials(guide.name)
    })),
    facts: override.facts || buildFallbackFacts(place, guides.length),
    itinerary: override.itinerary || buildFallbackItinerary(place),
    included: buildIncluded(place),
    notIncluded: buildNotIncluded(place),
    planning: buildPlanningDetails(place, guides.length),
    extraBudget: buildExtraBudget(place)
  };
};
