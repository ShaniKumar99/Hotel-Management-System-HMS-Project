import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Room from "../models/roomModel.js";

dotenv.config();

const rooms = [
  {
    roomNumber: "101",
    title: "Deluxe Single Room",
    type: "single",
    price: 299,
    status: "available",
    features: "WiFi, TV, Air Conditioning, Mini Bar, Room Service",
    images: ["room-1752573522274.jpg", "room-1752573522385.jpg"],
  },
  {
    roomNumber: "102",
    title: "Standard Double Room",
    type: "double",
    price: 399,
    status: "available",
    features: "WiFi, TV, Air Conditioning, Mini Bar, Balcony, Room Service",
    images: ["room-1752573522655.jpg", "room-1752573522748.jpg"],
  },
  {
    roomNumber: "201",
    title: "Premium Suite",
    type: "suite",
    price: 599,
    status: "available",
    features: "WiFi, TV, Air Conditioning, Mini Bar, Balcony, Jacuzzi, Room Service, Breakfast Included",
    images: ["room-1752573648380.jpg", "room-1752573648889.jpg", "room-1752573648913.jpg"],
  },
  {
    roomNumber: "202",
    title: "Luxury Deluxe Room",
    type: "deluxe",
    price: 499,
    status: "available",
    features: "WiFi, TV, Air Conditioning, Mini Bar, Balcony, Room Service, City View",
    images: ["room-1752573990445.jpg", "room-1752573990683.jpg"],
  },
  {
    roomNumber: "301",
    title: "Executive Suite",
    type: "suite",
    price: 799,
    status: "available",
    features: "WiFi, TV, Air Conditioning, Mini Bar, Balcony, Jacuzzi, Room Service, Breakfast Included, Work Desk",
    images: ["room-1752573990783.jpg", "room-1752573991070.jpg", "room-1752573991319.jpg"],
  },
  {
    roomNumber: "302",
    title: "Family Deluxe Room",
    type: "deluxe",
    price: 549,
    status: "available",
    features: "WiFi, TV, Air Conditioning, Mini Bar, Balcony, Room Service, Extra Bed Available",
    images: ["room-1752574446076.jpg", "room-1752574446095.jpg"],
  },
  {
    roomNumber: "401",
    title: "Ocean View Suite",
    type: "suite",
    price: 899,
    status: "available",
    features: "WiFi, TV, Air Conditioning, Mini Bar, Balcony, Jacuzzi, Room Service, Breakfast Included, Ocean View",
    images: ["room-1752574446109.jpg", "room-1752574446122.jpg", "room-1752574656358.jpg"],
  },
  {
    roomNumber: "402",
    title: "Comfort Single Room",
    type: "single",
    price: 249,
    status: "available",
    features: "WiFi, TV, Air Conditioning, Mini Bar, Room Service",
    images: ["room-1752574656380.jpg", "room-1752574656401.jpg"],
  },
  {
    roomNumber: "501",
    title: "Presidential Suite",
    type: "suite",
    price: 1299,
    status: "available",
    features: "WiFi, TV, Air Conditioning, Mini Bar, Balcony, Jacuzzi, Room Service, Breakfast Included, Butler Service, Private Elevator",
    images: ["room-1752574656422.jpg", "room-1752574879798.jpg", "room-1752574879817.jpg"],
  },
  {
    roomNumber: "502",
    title: "Standard Single Room",
    type: "single",
    price: 199,
    status: "available",
    features: "WiFi, TV, Air Conditioning, Room Service",
    images: ["room-1752574879834.jpg", "room-1752574879852.jpg"],
  },
  {
    roomNumber: "601",
    title: "Honeymoon Suite",
    type: "suite",
    price: 999,
    status: "available",
    features: "WiFi, TV, Air Conditioning, Mini Bar, Balcony, Jacuzzi, Room Service, Breakfast Included, Romantic Decor, Champagne",
    images: ["room-1752575198741.jpg", "room-1752575198783.jpg", "room-1752575198789.jpg"],
  },
  {
    roomNumber: "602",
    title: "Business Double Room",
    type: "double",
    price: 449,
    status: "available",
    features: "WiFi, TV, Air Conditioning, Mini Bar, Balcony, Room Service, Work Desk, High-Speed Internet",
    images: ["room-1752575198794.jpg", "room-1752573522274.jpg"],
  },
];

const seedRooms = async () => {
  try {
    await connectDB();
    console.log("🌱 Starting to seed rooms...");

    // Clear existing rooms (optional - comment out if you want to keep existing)
    // await Room.deleteMany({});
    // console.log("🗑️  Cleared existing rooms");

    // Check which rooms already exist
    const existingRooms = await Room.find({});
    const existingRoomNumbers = new Set(existingRooms.map((r) => r.roomNumber));

    let created = 0;
    let skipped = 0;

    for (const roomData of rooms) {
      if (existingRoomNumbers.has(roomData.roomNumber)) {
        console.log(`⏭️  Room ${roomData.roomNumber} already exists, skipping...`);
        skipped++;
        continue;
      }

      // Convert features string to array if needed
      const featuresArray =
        typeof roomData.features === "string"
          ? roomData.features.split(",").map((f) => f.trim())
          : roomData.features;

      const room = await Room.create({
        roomNumber: roomData.roomNumber,
        title: roomData.title,
        type: roomData.type,
        price: roomData.price,
        status: roomData.status,
        features: featuresArray,
        images: roomData.images || [],
      });

      console.log(`✅ Created room: ${room.roomNumber} - ${room.title}`);
      created++;
    }

    console.log(`\n✨ Seeding completed!`);
    console.log(`   Created: ${created} rooms`);
    console.log(`   Skipped: ${skipped} rooms (already exist)`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding rooms:", error);
    process.exit(1);
  }
};

seedRooms();

