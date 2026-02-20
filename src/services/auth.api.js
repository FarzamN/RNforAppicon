export async function loginApi({ email, password }) {
  await new Promise((resolve) => setTimeout(resolve, 800));

  if (!email.includes("@") || password.length < 8) {
    throw new Error("Invalid email or password");
  }

  return {
    token: `fake-token-${Date.now()}`,
    email,
  };
}
