import dotenv from "dotenv";
import connectDB from "../config/db.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

dotenv.config();

const users = [
  {
    name: "Admin",
    email: "admin@residency.com",
    password: "admin123",
    role: "admin",
    contact: "1234567890",
  },
  {
    name: "Receptionist",
    email: "receptionist@residency.com",
    password: "receptionist123",
    role: "receptionist",
    contact: "1234567891",
  },
  {
    name: "Housekeeping",
    email: "housekeeping@residency.com",
    password: "housekeeping123",
    role: "housekeeping",
    contact: "1234567892",
  },
  {
    name: "Guest",
    email: "guest@residency.com",
    password: "guest123",
    role: "guest",
    contact: "1234567893",
  },
  {
    name: "Manager",
    email: "manager@residency.com",
    password: "manager123",
    role: "manager",
    contact: "1234567894",
  },
];

const seedUsers = async () => {
  try {
    await connectDB();
    console.log("🌱 Starting to seed users...");

    let created = 0;
    let updated = 0;
    let skipped = 0;

    for (const userData of users) {
      // Check if user already exists
      const existingUser = await User.findOne({ email: userData.email });

      if (existingUser) {
        // Always update admin role to ensure it's correct
        const needsRoleUpdate = existingUser.role !== userData.role;
        const isPasswordMatch = await bcrypt.compare(
          userData.password,
          existingUser.password
        );

        if (needsRoleUpdate || !isPasswordMatch) {
          // Update role (especially important for admin)
          if (needsRoleUpdate) {
            console.log(`⚠️  Role mismatch detected: ${existingUser.email} has role "${existingUser.role}", updating to "${userData.role}"`);
            existingUser.role = userData.role;
          }
          
          // Update password if it doesn't match
          if (!isPasswordMatch) {
            const hash = await bcrypt.hash(userData.password, 10);
            existingUser.password = hash;
          }

          await existingUser.save();
          console.log(
            `🔄 Updated user: ${userData.email} - Role: ${userData.role}`
          );
          updated++;
        } else {
          console.log(`⏭️  User ${userData.email} already exists with correct role (${userData.role}), skipping...`);
          skipped++;
        }
        continue;
      }

      // Create new user
      const hash = await bcrypt.hash(userData.password, 10);
      const user = await User.create({
        name: userData.name,
        email: userData.email,
        password: hash,
        role: userData.role,
        contact: userData.contact,
      });

      console.log(`✅ Created user: ${user.email} - Role: ${user.role}`);
      created++;
    }

    console.log(`\n✨ Seeding completed!`);
    console.log(`   Created: ${created} users`);
    console.log(`   Updated: ${updated} users`);
    console.log(`   Skipped: ${skipped} users (already exist with correct data)`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding users:", error);
    process.exit(1);
  }
};

seedUsers();

