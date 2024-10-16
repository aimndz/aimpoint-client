import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

import Button from "./Button";
import { Link } from "react-router-dom";

type Header = {
  username: string | null;
  onLogout: () => void;
};

type DecodedToken = {
  user: {
    id: string;
    username: string;
    role: string;
  };
};

const Header = () => {
  const [user, setUser] = useState<DecodedToken["user"] | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode<DecodedToken>(token);
      setUser(decoded.user);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <header>
      <nav className="flex justify-between items-center py-3">
        <div>
          <p className="font-bold text-xl text-accent-100">
            <Link to="/">⦾ AimPoint</Link>
          </p>
        </div>
        <ul>
          <li>
            {user ? (
              <div className="flex flex-col md:flex-row justify-center items-center gap-3">
                <span className="text-accent-100">Hello, {user.username}!</span>
                <Button className="bg-primary-800" onClick={handleLogout}>
                  Log out
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button className="bg-primary-800">Login</Button>
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
