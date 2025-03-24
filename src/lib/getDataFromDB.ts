import User from "@/models/User";
import { connectDB } from "./mongodb";
import { compareHashedPasswords } from "@/lib/utils";

async function getDataFromDB(email: string, plainPassword: string) {
  try {
    await connectDB();

    const user = await User.findOne({ email }).lean();

    if (!user) {
      console.log("❌ Usuario no encontrado");
      return null;
    }

    const isPasswordCorrect = await compareHashedPasswords(
      plainPassword,
      user.password
    );

    if (!isPasswordCorrect) {
      console.log("❌ Contraseña incorrecta");
      return null;
    }

    // ✅ Usuario y contraseña correctos
    return {
      email: user.email,
      name: user.name,
    };
  } catch (error) {
    console.error("❌ Error buscando el usuario:", error);
    return null;
  }
}

export default getDataFromDB;
