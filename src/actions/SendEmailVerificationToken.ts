import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_SECRET_KEY);

async function sendEmailVerificationToken(email: string, token: string) {
  const verificationLink = `http://localhost:3000/api/auth/new-verification?token=${token}`;
  const htmlContent = `
  <div style="font-family: Arial, sans-serif; padding: 20px;">
    <h2>Verifica tu correo electrónico</h2>
    <p>Haz clic en el botón de abajo para verificar tu cuenta:</p>
    <a href="${verificationLink}" 
       style="display: inline-block; padding: 12px 20px; margin-top: 20px;
              background-color: #4CAF50; color: white; text-decoration: none; 
              border-radius: 5px;">
      Verificar cuenta
    </a>
    <p style="margin-top: 20px;">Si no solicitaste esto, puedes ignorar este correo.</p>
  </div>
`;

  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [email],
      subject: "Token de verificación",
      html: htmlContent,
      headers: {
        "X-Entity-Ref-ID": token,
      },
    });

    if (error) {
      console.error("❌ Error enviando email:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.error("❌ Error general enviando email:", err);
    return { success: false, error: err };
  }
}
export default sendEmailVerificationToken;
