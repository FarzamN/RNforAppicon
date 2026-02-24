export async function loginApi(payload) {
  await new Promise((resolve) => setTimeout(resolve, 800));

  return {
    token: `fake-token-${Date.now()}`,
    email: payload.email,
  };
}
