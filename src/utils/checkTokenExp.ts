import { jwtDecode } from "jwt-decode";

type DecodedToken = {
  id: string;
  username: string;
  exp: number;
};

function checkTokenExpiration() {
  const token = localStorage.getItem("token");

  // Check if token is not present
  if (!token) return true;

  const decoded = jwtDecode<DecodedToken>(token);
  const currentTime = Date.now() / 1000;

  // Return true if the token is expired
  return decoded.exp < currentTime;
}

export default checkTokenExpiration;
