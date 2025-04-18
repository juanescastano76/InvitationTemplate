import mongoose, { Schema, Document, models } from "mongoose";

interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  phoneNumber: number;
  webPageName?: string;
  createdAt: Date;
  emailVerified?: Date | null;
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  webPageName: { type: String },
  createdAt: { type: Date, default: Date.now, required: true },
  emailVerified: { type: Date, default: null },
});

// ✅ Esto evita el error OverwriteModelError
const User = models.Usuarios || mongoose.model<IUser>("Usuarios", userSchema);

export default User;

// import { Schema, model, models } from "mongoose";

// const UserSchema = new Schema(
//   {
//     email: {
//       type: String,
//       unique: true,
//       required: [true, "Email is required"],
//       match: [
//         /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
//         "Email is invalid",
//       ],
//     },
//     password: {
//       type: String,
//       required: [true, "Password is required"],
//       select: false,
//     },
//     fullname: {
//       type: String,
//       required: [true, "fullname is required"],
//       minLength: [3, "fullname must be at least 3 characters"],
//       maxLength: [20, "fullname must be at most 20 characters"],
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const User = models.User || model("User", UserSchema);
// export default User;
