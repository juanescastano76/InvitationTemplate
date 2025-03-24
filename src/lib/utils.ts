"use server";
import bcrypt from "bcrypt";

async function saltAndHashPassword(password: any) {
  // Hashear la contraseña
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
}

export default saltAndHashPassword;

export const compareHashedPasswords = async (
  password: string,
  hashedPassword: string
) => {
  return await bcrypt.compare(password, hashedPassword);
};
