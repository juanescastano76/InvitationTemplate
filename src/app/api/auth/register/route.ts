import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "../../../../models/User";
import console from "console";
import { connectDB } from "../../../../lib/mongodb";
import generateVerificationTokens from "../../../../lib/tokens";
import sendEmailVerificationToken from "../../../../actions/SendEmailVerificationToken";
export async function POST(req: Request) {
  try {
    await connectDB();

    const { name, email, password, phoneNumber } = await req.json();
    console.log(name, email, password, phoneNumber);
    // Verifica si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "El usuario ya existe" },
        { status: 400 }
      );
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear y guardar usuario en MongoDB
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phoneNumber,

      createdAt: new Date(),
    });

    await newUser.save(); // Guarda en la base de datos
    console.log("usuario registrado");

    const verificationToken = await generateVerificationTokens(email);
    console.log("verification token", verificationToken.token);
    sendEmailVerificationToken(
      "juanescastano76@gmail.com",
      verificationToken.token
    );

    // console.log("✅ Usuario guardado en MongoDB:", newUser);

    return NextResponse.json(
      {
        message: "Usuario creado correctamente, verificacion de correo enviada",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Error en el backend:", error);
    return NextResponse.json(
      { message: "Error en el servidor" },
      { status: 500 }
    );
  }
}
