import { request } from "./index";

export async function fetchUsersApi() {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return request("/users");
}
