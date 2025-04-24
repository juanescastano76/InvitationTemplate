import mongoose, { Schema, Document, models } from "mongoose";

export interface IVerificationToken extends Document {
  email: string;
  token: string;
  expires: Date;
}

const verificationTokenSchema = new Schema<IVerificationToken>({
  email: { type: String, required: true },
  token: { type: String, required: true, unique: true },
  expires: { type: Date, required: true },
});

verificationTokenSchema.index({ email: 1, token: 1 }, { unique: true });

const VerificationToken =
  models.VerificationToken ||
  mongoose.model<IVerificationToken>(
    "VerificationToken",
    verificationTokenSchema
  );

export default VerificationToken;
