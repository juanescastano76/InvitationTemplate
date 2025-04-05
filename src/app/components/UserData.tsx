import console from "console";
import { auth } from "../../auth";

async function UserData() {
  const session = await auth();
  console.log(session);

  if (!session?.user) return null;

  return (
    <div className="text-white">
      <h1 className="text-xl">Perfil de Usuario</h1>
      <h2 className="text-2xl">{session.user.email}</h2>
    </div>
  );
}

export default UserData;
