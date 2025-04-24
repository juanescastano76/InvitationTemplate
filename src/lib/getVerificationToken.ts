import VerificationToken from "../models/VerificationToken";

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await VerificationToken.findOne({ token });
    console.log(verificationToken);

    return verificationToken;
  } catch (error) {
    console.error("❌ Error buscando verification token por token:", error);
    return null;
  }
};

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await VerificationToken.findOne({ email });
    console.log(verificationToken);

    return verificationToken;
  } catch (error) {
    console.error("❌ Error buscando verification token:", error);
    return null;
  }
};
