import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

import Button from "./Button";

type Header = {
  username: string | null;
  onLogout: () => void;
};

type DecodedToken = {
  username: string;
};

const Header = () => {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode<DecodedToken>(token);
      setUsername(decoded.username);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUsername(null);
  };

  return (
    <header>
      <nav className="flex justify-between items-center py-3">
        <div>
          <p className="font-bold text-xl text-accent-100">
            <a href="/">⦾ AimPoint</a>
          </p>
        </div>
        <ul>
          <li>
            {username ? (
              <div className="space-x-3">
                <span className="text-accent-100">Hello, {username}!</span>
                <Button className="bg-primary-800" onClick={handleLogout}>
                  Log out
                </Button>
              </div>
            ) : (
              <Button href="/login" className="bg-primary-800">
                Login
              </Button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
