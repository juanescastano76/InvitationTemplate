"use server";
import bcrypt from "bcrypt";

async function saltAndHashPassword(password: any) {
  // Hashear la contraseña
  const hashedPassword = await bcrypt.hash(password, 10);
}

export default saltAndHashPassword;
