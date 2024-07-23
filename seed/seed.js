const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Listing = require("../models/Listing");

dotenv.config();

const listingsData = [
    {
        title: "Luxury Home in Barcelona",
        description:
            "Luxury home in Barcelona. Famous for its unique architecture, stunning beaches, and rich history. Perfect for a luxurious and cultural experience.",
        price: 320,
        location: {
            city: "Barcelona",
            state: "Catalonia",
            country: "Spain",
        },
        available_dates: ["2024-09-01", "2024-09-15"],
        isBooked: false,
        owner: "669f3eb7fc122c5891a0ab00",
    },
    {
        title: "Charming Home in Victoria",
        description:
            "Charming home in Victoria. Known for its charming harbor, beautiful gardens, and mild climate. Perfect for a peaceful and scenic getaway.",
        price: 280,
        location: {
            city: "Victoria",
            state: "British Columbia",
            country: "Canada",
        },
        available_dates: ["2024-08-15", "2024-09-01"],
        isBooked: false,
        owner: "669f3eb7fc122c5891a0ab00",
    },
    {
        title: "Beach House in Miami",
        description:
            "Beautiful beach house in Miami. Known for its beautiful beaches, vibrant nightlife, and diverse culture. Perfect for a fun and relaxing trip.",
        price: 300,
        location: {
            city: "Miami",
            state: "Florida",
            country: "USA",
        },
        available_dates: ["2024-08-01", "2024-08-15"],
        isBooked: false,
        owner: "669f3eb7fc122c5891a0ab00",
    },
    {
        title: "Waterfront Home in Sydney",
        description:
            "Waterfront home in Sydney. Renowned for its iconic Opera House, Harbour Bridge, and pristine beaches. Perfect for a luxurious and cultural experience.",
        price: 350,
        location: {
            city: "Sydney",
            state: "New South Wales",
            country: "Australia",
        },
        available_dates: ["2024-09-10", "2024-09-25"],
        isBooked: false,
        owner: "669f3eb7fc122c5891a0ab00",
    },
    {
        title: "Scenic Home in St. John's",
        description:
            "Scenic home in St. John's. Known for its colorful row houses, rugged coastline, and rich history. Perfect for a vibrant and historic stay.",
        price: 270,
        location: {
            city: "St. John's",
            state: "Newfoundland and Labrador",
            country: "Canada",
        },
        available_dates: ["2024-08-05", "2024-08-20"],
        isBooked: false,
        owner: "669f3eb7fc122c5891a0ab00",
    },
    {
        title: "Oceanfront Home in Honolulu",
        description:
            "Oceanfront home in Honolulu. Offers breathtaking beaches, volcanic landscapes, and a tropical climate. Perfect for a luxurious and tropical experience.",
        price: 400,
        location: {
            city: "Honolulu",
            state: "Hawaii",
            country: "USA",
        },
        available_dates: ["2024-10-01", "2024-10-15"],
        isBooked: false,
        owner: "669f3eb7fc122c5891a0ab00",
    },
    {
        title: "Beachfront Villa in Phuket",
        description:
            "Beachfront villa in Phuket. Offers stunning beaches, crystal-clear waters, and a bustling tourist scene. Perfect for a tropical and relaxing stay.",
        price: 290,
        location: {
            city: "Phuket",
            state: "Phuket",
            country: "Thailand",
        },
        available_dates: ["2024-12-01", "2024-12-15"],
        isBooked: false,
        owner: "669f3eb7fc122c5891a0ab00",
    },
    {
        title: "Beach House in Ibiza",
        description:
            "Stunning beach house in Ibiza. Renowned for its lively nightlife, beautiful beaches, and crystal-clear waters. Ideal for a fun and lively trip.",
        price: 400,
        location: {
            city: "Ibiza",
            state: "Balearic Islands",
            country: "Spain",
        },
        available_dates: ["2024-08-05", "2024-08-20"],
        isBooked: false,
        owner: "669f3eb7fc122c5891a0ab00",
    },
    {
        title: "Beach House in Santa Monica",
        description:
            "Beautiful beach house in Santa Monica. Famous for its iconic pier, sandy beaches, and vibrant atmosphere. Perfect for a fun and scenic trip.",
        price: 310,
        location: {
            city: "Santa Monica",
            state: "California",
            country: "USA",
        },
        available_dates: ["2024-08-20", "2024-09-05"],
        isBooked: false,
        owner: "669f3eb7fc122c5891a0ab00",
    },
    {
        title: "Beachfront Villa in Cancun",
        description:
            "Beautiful beachfront villa in Cancun. Popular for its white-sand beaches, turquoise waters, and vibrant nightlife. Perfect for a tropical and lively experience.",
        price: 370,
        location: {
            city: "Cancun",
            state: "Quintana Roo",
            country: "Mexico",
        },
        available_dates: ["2024-09-15", "2024-09-30"],
        isBooked: false,
        owner: "669f3eb7fc122c5891a0ab00",
    },
    {
        title: "Seaside Villa in Cape Town",
        description:
            "Beautiful seaside villa in Cape Town. Offers beautiful beaches, dramatic landscapes, and a rich cultural scene. Perfect for an adventurous and scenic trip.",
        price: 350,
        location: {
            city: "Cape Town",
            state: "Western Cape",
            country: "South Africa",
        },
        available_dates: ["2024-11-01", "2024-11-15"],
        isBooked: false,
        owner: "669f3eb7fc122c5891a0ab00",
    },
    {
        title: "Beachfront House in Maui",
        description:
            "Beachfront house in Maui. Renowned for its lush landscapes, beautiful beaches, and outdoor activities. Perfect for a tropical and active getaway.",
        price: 380,
        location: {
            city: "Maui",
            state: "Hawaii",
            country: "USA",
        },
        available_dates: ["2024-10-05", "2024-10-20"],
        isBooked: false,
        owner: "669f3eb7fc122c5891a0ab00",
    },
    {
        title: "Luxury Home in Nice",
        description:
            "Luxury home in Nice. Located on the French Riviera, known for its pebble beaches and azure waters. Perfect for a luxurious and scenic retreat.",
        price: 330,
        location: {
            city: "Nice",
            state: "Provence-Alpes-Côte d'Azur",
            country: "France",
        },
        available_dates: ["2024-09-15", "2024-09-30"],
        isBooked: false,
        owner: "669f3eb7fc122c5891a0ab00",
    },
    {
        title: "Historic Home in Dubrovnik",
        description:
            "Historic home in Dubrovnik. Known for its stunning coastline, historic old town, and crystal-clear waters. Ideal for a cultural and scenic stay.",
        price: 340,
        location: {
            city: "Dubrovnik",
            state: "Dubrovnik-Neretva",
            country: "Croatia",
        },
        available_dates: ["2024-08-10", "2024-08-25"],
        isBooked: false,
        owner: "669f3eb7fc122c5891a0ab00",
    },
    {
        title: "Beach House in San Diego",
        description:
            "Beautiful beach house in San Diego. Known for its gorgeous beaches, zoo, and pleasant climate. Perfect for a relaxing and fun trip.",
        price: 320,
        location: {
            city: "San Diego",
            state: "California",
            country: "USA",
        },
        available_dates: ["2024-09-01", "2024-09-15"],
        isBooked: false,
        owner: "669f3eb7fc122c5891a0ab00",
    },
    {
        title: "Beach House in Rio de Janeiro",
        description:
            "Stunning beach house in Rio de Janeiro. Famous for its stunning beaches, Carnival festival, and vibrant culture. Perfect for a lively and cultural experience.",
        price: 350,
        location: {
            city: "Rio de Janeiro",
            state: "Rio de Janeiro",
            country: "Brazil",
        },
        available_dates: ["2024-10-10", "2024-10-25"],
        isBooked: false,
        owner: "669f3eb7fc122c5891a0ab00",
    },
    {
        title: "Beach House in Hvar",
        description:
            "Stunning beach house in Hvar. Known for its beautiful beaches, lively nightlife, and historic sites. Ideal for a fun and scenic getaway.",
        price: 340,
        location: {
            city: "Hvar",
            state: "Split-Dalmatia",
            country: "Croatia",
        },
        available_dates: ["2024-09-01", "2024-09-15"],
        isBooked: false,
        owner: "669f3eb7fc122c5891a0ab00",
    },
    {
        title: "Historic Home in Key West",
        description:
            "Beautiful historic home in Key West. Offers a laid-back atmosphere, beautiful sunsets, and historic sites. Perfect for a relaxing and historic stay.",
        price: 270,
        location: {
            city: "Key West",
            state: "Florida",
            country: "USA",
        },
        available_dates: ["2024-11-01", "2024-11-15"],
        isBooked: false,
        owner: "669f3eb7fc122c5891a0ab00",
    },
    {
        title: "Seaside Home in Lisbon",
        description:
            "Seaside home in Lisbon. Known for its scenic coastline, historic sites, and vibrant culture. Perfect for a cultural and relaxing experience.",
        price: 300,
        location: {
            city: "Lisbon",
            state: "Lisbon",
            country: "Portugal",
        },
        available_dates: ["2024-09-10", "2024-09-25"],
        isBooked: false,
        owner: "669f3eb7fc122c5891a0ab00",
    },
    {
        title: "Beach House in Mykonos",
        description:
            "Beautiful beach house in Mykonos. Known for its picturesque beaches, whitewashed buildings, and lively nightlife. Ideal for a fun and relaxing stay.",
        price: 350,
        location: {
            city: "Mykonos",
            state: "Cyclades",
            country: "Greece",
        },
        available_dates: ["2024-08-15", "2024-08-30"],
        isBooked: false,
        owner: "669f3eb7fc122c5891a0ab00",
    },
    {
        title: "Beach House in Malibu",
        description:
            "Beautiful beach house in Malibu. Famous for its scenic coastline, luxury homes, and surfing spots. Perfect for a luxurious and relaxing stay.",
        price: 420,
        location: {
            city: "Malibu",
            state: "California",
            country: "USA",
        },
        available_dates: ["2024-08-10", "2024-08-25"],
        isBooked: false,
        owner: "669f3eb7fc122c5891a0ab00",
    },
    {
        title: "Beachfront Villa in Bali",
        description:
            "Stunning beachfront villa in Bali. Famous for its beautiful beaches, lush landscapes, and vibrant culture. Perfect for a tropical and cultural experience.",
        price: 300,
        location: {
            city: "Bali",
            state: "Bali",
            country: "Indonesia",
        },
        available_dates: ["2024-11-05", "2024-11-20"],
        isBooked: false,
        owner: "669f3eb7fc122c5891a0ab00",
    },
    {
        title: "Harborfront Home in Auckland",
        description:
            "Beautiful harborfront home in Auckland. Known for its beautiful harbors, outdoor activities, and vibrant city life. Perfect for an adventurous and cultural stay.",
        price: 340,
        location: {
            city: "Auckland",
            state: "Auckland",
            country: "New Zealand",
        },
        available_dates: ["2024-08-20", "2024-09-05"],
        isBooked: false,
        owner: "669f3eb7fc122c5891a0ab00",
    },
    {
        title: "Beach House in Myrtle Beach",
        description:
            "Beautiful beach house in Myrtle Beach. Popular for its wide beaches, golf courses, and family-friendly attractions. Perfect for a fun and relaxing trip.",
        price: 280,
        location: {
            city: "Myrtle Beach",
            state: "South Carolina",
            country: "USA",
        },
        available_dates: ["2024-08-05", "2024-08-20"],
        isBooked: false,
        owner: "669f3eb7fc122c5891a0ab00",
    },
    {
        title: "Scenic Home in Vancouver",
        description:
            "Scenic home in Vancouver. Offers stunning waterfront views, outdoor activities, and a vibrant urban scene. Perfect for a relaxing and active getaway.",
        price: 320,
        location: {
            city: "Vancouver",
            state: "British Columbia",
            country: "Canada",
        },
        available_dates: ["2024-09-10", "2024-09-25"],
        isBooked: false,
        owner: "669f3eb7fc122c5891a0ab00",
    },
    {
        title: "Seaside Home in San Sebastian",
        description:
            "Beautiful seaside home in San Sebastian. Famous for its beautiful beaches, culinary scene, and cultural events. Perfect for a relaxing and gourmet experience.",
        price: 300,
        location: {
            city: "San Sebastian",
            state: "Basque Country",
            country: "Spain",
        },
        available_dates: ["2024-10-01", "2024-10-15"],
        isBooked: false,
        owner: "669f3eb7fc122c5891a0ab00",
    },
    {
        title: "Elegant Home in Naples",
        description:
            "Elegant home in Naples. Known for its upscale lifestyle, beautiful beaches, and vibrant arts scene. Perfect for a luxurious and cultural retreat.",
        price: 330,
        location: {
            city: "Naples",
            state: "Florida",
            country: "USA",
        },
        available_dates: ["2024-09-01", "2024-09-15"],
        isBooked: false,
        owner: "669f3eb7fc122c5891a0ab00",
    },
    {
        title: "Historic Home in Porto",
        description:
            "Charming historic home in Porto. Offers beautiful beaches, historic sites, and a vibrant culture. Perfect for a cultural and scenic stay.",
        price: 290,
        location: {
            city: "Porto",
            state: "Porto",
            country: "Portugal",
        },
        available_dates: ["2024-09-15", "2024-09-30"],
        isBooked: false,
        owner: "669f3eb7fc122c5891a0ab00",
    },
    {
        title: "Beach House in Fiji",
        description:
            "Beautiful beach house in Fiji. Famous for its stunning beaches, clear waters, and friendly locals. Perfect for a relaxing and tropical experience.",
        price: 360,
        location: {
            city: "Fiji",
            state: "Fiji",
            country: "Fiji",
        },
        available_dates: ["2024-10-10", "2024-10-25"],
        isBooked: false,
        owner: "669f3eb7fc122c5891a0ab00",
    },
    {
        title: "Beach House in Destin",
        description:
            "Beautiful beach house in Destin. Offers sugar-white sand beaches, emerald-green waters, and great fishing. Perfect for a fun and relaxing trip.",
        price: 280,
        location: {
            city: "Destin",
            state: "Florida",
            country: "USA",
        },
        available_dates: ["2024-12-05", "2024-12-20"],
        isBooked: false,
        owner: "669f3eb7fc122c5891a0ab00",
    },
    {
        title: "Overwater Bungalow in Maldives",
        description:
            "Stunning overwater bungalow in Maldives. Renowned for its overwater bungalows, crystal-clear waters, and coral reefs. Perfect for a luxurious and tropical experience.",
        price: 500,
        location: {
            city: "Maldives",
            state: "Maldives",
            country: "Maldives",
        },
        available_dates: ["2024-08-10", "2024-08-25"],
        isBooked: false,
        owner: "669f3eb7fc122c5891a0ab00",
    },
    {
        title: "Beachfront Home in Mauritius",
        description:
            "Beautiful beachfront home in Mauritius. Offers beautiful beaches, clear waters, and a tropical climate. Perfect for a relaxing and tropical getaway.",
        price: 450,
        location: {
            city: "Mauritius",
            state: "Mauritius",
            country: "Mauritius",
        },
        available_dates: ["2024-10-01", "2024-10-15"],
        isBooked: false,
        owner: "669f3eb7fc122c5891a0ab00",
    },
    {
        title: "Beach House in Virginia Beach",
        description:
            "Beautiful beach house in Virginia Beach. Famous for its boardwalk, wide beaches, and vibrant entertainment. Perfect for a fun and exciting trip.",
        price: 220,
        location: {
            city: "Virginia Beach",
            state: "Virginia",
            country: "USA",
        },
        available_dates: ["2024-08-15", "2024-08-30"],
        isBooked: false,
        owner: "669f3eb7fc122c5891a0ab00",
    },
    {
        title: "Charming Home in Victoria",
        description:
            "Charming home in Victoria. Known for its charming harbor, beautiful gardens, and mild climate. Perfect for a peaceful and scenic getaway.",
        price: 280,
        location: {
            city: "Victoria",
            state: "British Columbia",
            country: "Canada",
        },
        available_dates: ["2024-08-15", "2024-09-01"],
        isBooked: false,
        owner: "669f3eb7fc122c5891a0ab00",
    },
    {
        title: "Beachfront Villa in Tahiti",
        description:
            "Stunning beachfront villa in Tahiti. Offers stunning beaches, lush landscapes, and a tropical paradise. Perfect for a relaxing and tropical experience.",
        price: 460,
        location: {
            city: "Tahiti",
            state: "Tahiti",
            country: "French Polynesia",
        },
        available_dates: ["2024-11-10", "2024-11-25"],
        isBooked: false,
        owner: "669f3eb7fc122c5891a0ab00",
    },
    {
        title: "Beach House in Outer Banks",
        description:
            "Beautiful beach house in Outer Banks. Known for its beautiful barrier islands, historic sites, and outdoor activities. Perfect for a peaceful and scenic getaway.",
        price: 290,
        location: {
            city: "Outer Banks",
            state: "North Carolina",
            country: "USA",
        },
        available_dates: ["2024-08-15", "2024-09-01"],
        isBooked: false,
        owner: "669f3eb7fc122c5891a0ab00",
    },
    {
        title: "Seaside Home in Singapore",
        description:
            "Beautiful seaside home in Singapore. Known for its clean beaches, vibrant city life, and diverse culture. Perfect for a modern and cultural experience.",
        price: 300,
        location: {
            city: "Singapore",
            state: "Singapore",
            country: "Singapore",
        },
        available_dates: ["2024-12-05", "2024-12-20"],
        isBooked: false,
        owner: "669f3eb7fc122c5891a0ab00",
    },
    {
        title: "Beachfront Villa in Sharm El Sheikh",
        description:
            "Beautiful beachfront villa in Sharm El Sheikh. Famous for its clear waters, coral reefs, and luxury resorts. Perfect for a luxurious and relaxing stay.",
        price: 440,
        location: {
            city: "Sharm El Sheikh",
            state: "South Sinai",
            country: "Egypt",
        },
        available_dates: ["2024-09-01", "2024-09-15"],
        isBooked: false,
        owner: "669f3eb7fc122c5891a0ab00",
    },
    {
        title: "Historic Home in Charleston",
        description:
            "Beautiful historic home in Charleston. Offers historic charm, beautiful beaches, and a vibrant food scene. Perfect for a cultural and relaxing trip.",
        price: 260,
        location: {
            city: "Charleston",
            state: "South Carolina",
            country: "USA",
        },
        available_dates: ["2024-11-01", "2024-11-15"],
        isBooked: false,
        owner: "669f3eb7fc122c5891a0ab00",
    },
    {
        title: "Seaside Villa in Valencia",
        description:
            "Beautiful seaside villa in Valencia. Known for its futuristic architecture, sandy beaches, and vibrant festivals. Perfect for a cultural and scenic experience.",
        price: 320,
        location: {
            city: "Valencia",
            state: "Valencia",
            country: "Spain",
        },
        available_dates: ["2024-10-01", "2024-10-15"],
        isBooked: false,
        owner: "669f3eb7fc122c5891a0ab00",
    },
    {
        title: "Charming Home in Cape Cod",
        description:
            "Charming home in Cape Cod. Famous for its quaint villages, seafood shacks, lighthouses, and beaches. Perfect for a peaceful and scenic retreat.",
        price: 300,
        location: {
            city: "Cape Cod",
            state: "Massachusetts",
            country: "USA",
        },
        available_dates: ["2024-09-10", "2024-09-25"],
        isBooked: false,
        owner: "669f3eb7fc122c5891a0ab00",
    },
    {
        title: "Beachfront Villa in Pattaya",
        description:
            "Beautiful beachfront villa in Pattaya. Known for its vibrant nightlife, beautiful beaches, and water activities. Perfect for a fun and lively experience.",
        price: 290,
        location: {
            city: "Pattaya",
            state: "Chonburi",
            country: "Thailand",
        },
        available_dates: ["2024-10-01", "2024-10-15"],
        isBooked: false,
        owner: "669f3eb7fc122c5891a0ab00",
    },
    {
        title: "Waterfront Home in Halifax",
        description:
            "Beautiful waterfront home in Halifax. Offers historic sites, a scenic waterfront, and friendly atmosphere. Perfect for a cultural and relaxing getaway.",
        price: 250,
        location: {
            city: "Halifax",
            state: "Nova Scotia",
            country: "Canada",
        },
        available_dates: ["2024-09-05", "2024-09-20"],
        isBooked: false,
        owner: "669f3eb7fc122c5891a0ab00",
    },
    {
        title: "Beachfront Home in Clearwater Beach",
        description:
            "Beautiful beachfront home in Clearwater Beach. Known for its pristine white sand, clear waters, and family-friendly atmosphere. Perfect for a sunny and relaxing trip.",
        price: 240,
        location: {
            city: "Clearwater Beach",
            state: "Florida",
            country: "USA",
        },
        available_dates: ["2024-09-01", "2024-09-15"],
        isBooked: false,
        owner: "669f3eb7fc122c5891a0ab00",
    },
    {
        title: "Charming Home in Charlottetown",
        description:
            "Charming home in Charlottetown. Famous for its picturesque coastline, historic sites, and seafood. Perfect for a peaceful and scenic getaway.",
        price: 270,
        location: {
            city: "Charlottetown",
            state: "Prince Edward Island",
            country: "Canada",
        },
        available_dates: ["2024-10-10", "2024-10-25"],
        isBooked: false,
        owner: "669f3eb7fc122c5891a0ab00",
    },
    {
        title: "Seaside Home in Split",
        description:
            "Beautiful seaside home in Split. Known for its beautiful coastline, historic sites, and vibrant nightlife. Perfect for a fun and scenic stay.",
        price: 290,
        location: {
            city: "Split",
            state: "Split",
            country: "Croatia",
        },
        available_dates: ["2024-10-01", "2024-10-15"],
        isBooked: false,
        owner: "669f3eb7fc122c5891a0ab00",
    },
    {
        title: "Beach House in Goa",
        description:
            "Beautiful beach house in Goa. Offers beautiful beaches, vibrant nightlife, and a unique cultural blend. Perfect for a fun and cultural experience.",
        price: 260,
        location: {
            city: "Goa",
            state: "Goa",
            country: "India",
        },
        available_dates: ["2024-11-01", "2024-11-15"],
        isBooked: false,
        owner: "669f3eb7fc122c5891a0ab00",
    },
    {
        title: "Historic Home in Key West",
        description:
            "Beautiful historic home in Key West. Offers a laid-back atmosphere, beautiful sunsets, and historic sites. Perfect for a relaxing and historic stay.",
        price: 270,
        location: {
            city: "Key West",
            state: "Florida",
            country: "USA",
        },
        available_dates: ["2024-11-01", "2024-11-15"],
        isBooked: false,
        owner: "669f3eb7fc122c5891a0ab00",
    },
    {
        title: "Overwater Bungalow in Maldives",
        description:
            "Stunning overwater bungalow in Maldives. Renowned for its overwater bungalows, crystal-clear waters, and coral reefs. Perfect for a luxurious and tropical experience.",
        price: 500,
        location: {
            city: "Maldives",
            state: "Maldives",
            country: "Maldives",
        },
        available_dates: ["2024-08-10", "2024-08-25"],
        isBooked: false,
        owner: "669f3eb7fc122c5891a0ab00",
    },
    {
        title: "Beachfront Villa in Seychelles",
        description:
            "Beautiful beachfront villa in Seychelles. Known for its pristine beaches, clear waters, and luxury resorts. Perfect for a luxurious and relaxing stay.",
        price: 480,
        location: {
            city: "Seychelles",
            state: "Seychelles",
            country: "Seychelles",
        },
        available_dates: ["2024-09-01", "2024-09-15"],
        isBooked: false,
        owner: "669f3eb7fc122c5891a0ab00",
    },
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB Connected");
        console.log("Seed import started...");

        await Listing.deleteMany({});
        console.log("Old listings removed");

        await Listing.insertMany(listingsData);
        console.log("New listings added");
        console.log("Seed import complete");

        mongoose.connection.close();
        console.log("MongoDB Disconnected");
    } catch (err) {
        console.error(err);
        mongoose.connection.close();
    }
};

// node seed/seed.js in terminal when server is running to populate listings db. 
// replace owner value with the ID of a user in your db that has isHost = true.
// this will remove all current listings in your db with the new ones. comment out line 716 to not do this.
seedDB();
