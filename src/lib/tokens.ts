import { v4 as uuidv4 } from "uuid";
import { getVerificationTokenByEmail } from "./getVerificationToken";
import db from "../lib/db";
import VerificationToken from "../models/VerificationToken";

async function generateVerificationTokens(email: string) {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

  const existingVerificationToken = await getVerificationTokenByEmail(email);

  if (existingVerificationToken) {
    await VerificationToken.deleteOne({ _id: existingVerificationToken._id });
  }

  const newToken = await VerificationToken.create({
    email,
    token,
    expires,
  });

  return newToken;
}

export default generateVerificationTokens;
