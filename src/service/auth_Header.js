import Cookies from "js-cookie";

export default function authHeader() {
  const user = Cookies.get("token");
  if (user) {
    return { Authorization: "Bearer " + user };
  } else {
    return {};
  }
} 