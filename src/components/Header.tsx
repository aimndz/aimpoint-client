import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

import Button from "./Button";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode<DecodedToken>(token);
      console.log(decoded);
      setUser(decoded.user);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const handleAdmin = () => {
    navigate("/admin");
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
            {user ? (
              <div className="space-x-3">
                <span className="text-accent-100">Hello, {user.username}!</span>
                {user.role === "ADMIN" && (
                  <Button className="bg-primary-800" onClick={handleAdmin}>
                    Admin
                  </Button>
                )}
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
