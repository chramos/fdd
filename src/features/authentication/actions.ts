import { CredentialsType } from "types/credentials-type";

export const signIn = async ({ username, password }: CredentialsType) => {
  try {
    await fakePromise({ duration: 1500 });
    if (username !== "admin@example.com" || password !== "123456") {
      throw {
        code: "InvalidUsernameOrPassword",
        message: "Nome de usuário ou senha invalo",
      };
    }

    localStorage.setItem("credentials", JSON.stringify({ username, password }));
    window.dispatchEvent(new Event("storage"));
    return true;
  } catch (error) {
    throw error;
  }
};

export const signOut = async () => {
  try {
    await fakePromise({ duration: 1500 });
    localStorage.removeItem("credentials");
    window.dispatchEvent(new Event("storage"));
    return true;
  } catch (error) {
    throw error;
  }
};

const fakePromise = async ({ duration = 1000 }) => {
  await new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};
