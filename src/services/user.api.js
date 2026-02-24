import { request } from "./index";

export async function fetchUsersApi({ pageParam = 1 }) {
  const LIMIT = 2;

  await new Promise((resolve) => setTimeout(resolve, 600));

  return request(`/users?_page=${pageParam}&_limit=${LIMIT}`);
}

export const createUserApi = async (payload) => {
  return request("/users", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};
