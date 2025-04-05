import User from "../models/User";
import { connectDB } from "./mongodb";
import { compareHashedPasswords } from "./utils";
import { Error } from "mongoose";

async function getDataFromDB(email: string, plainPassword: string) {
  try {
    await connectDB();

    const user = await User.findOne({ email }).lean();

    if (!user) {
      return null;
    }

    console.log(user);
    const isPasswordCorrect = await compareHashedPasswords(
      plainPassword,
      user.password
    );

    if (!isPasswordCorrect) {
      throw new Error("Contraseña incorrecta");
    }
    console.log(user);
    // ✅ Usuario y contraseña correctos
    return {
      id: user._id.toString(), // necesario
      email: user.email,
      name: user.name,
    };
  } catch (error) {
    console.error("❌ Error buscando el usuario:", error);
    return null;
  }
}

export default getDataFromDB;
