import dotenv from "dotenv";
import connectDB from "../config/db.js";
import User from "../models/userModel.js";

dotenv.config();

const fixAdminRole = async () => {
  try {
    await connectDB();
    console.log("🔧 Fixing admin role for admin@residency.com...");

    // Find the admin user
    const adminUser = await User.findOne({ email: "admin@residency.com" });

    if (!adminUser) {
      console.log("❌ Admin user with email admin@residency.com not found!");
      console.log("   Please run: npm run seed:users");
      process.exit(1);
    }

    console.log(`📋 Current role: "${adminUser.role}"`);

    if (adminUser.role !== "admin") {
      adminUser.role = "admin";
      await adminUser.save();
      console.log("✅ Successfully updated admin role to 'admin'");
    } else {
      console.log("✅ Admin role is already correct");
    }

    // Verify the update
    const updatedUser = await User.findOne({ email: "admin@residency.com" });
    console.log(`✅ Verified: User role is now "${updatedUser.role}"`);
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error fixing admin role:", error);
    process.exit(1);
  }
};

fixAdminRole();


