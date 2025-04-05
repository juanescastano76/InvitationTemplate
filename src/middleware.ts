import middleware from "./auth-edge";

export default middleware;

export const config = {
  matcher: ["/dashboard"], // Protege solo esta ruta
};
