import { useDispatch, useSelector } from 'react-redux';
import { LogoutButton, Container, Logo } from '../index';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { setTheme } from '../../store/uxSlice';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useSelector((state: any) => state.ux.theme);
  const authStatus = useSelector((x: any) => x.auth.status);
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "Your posts", slug: "/user-posts", active: authStatus },
    { name: "All posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus }
  ];

  const themeChange = () => {
    if (theme === "dark") {
      dispatch(setTheme("light"));
    }
    else {
      dispatch(setTheme("dark"));
    }
  };

  return (
    <header className="py-3 shadow bg-(--surface) text-(--text)">
      <Container>

        <nav className="flex items-center justify-between">

          <Link to="/">
            <Logo className="w-10" />
          </Link>

          <div className="hidden md:block">
            <ul className="flex gap-2">
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.name} className="shrink-0">
                    <button
                      className="inline-block whitespace-nowrap px-6 py-2 rounded-full transition hover:bg-(--surface)"
                      onClick={() => navigate(item.slug)}
                    >
                      {item.name}
                    </button>
                  </li>
                ) : null
              )}
              <li className="shrink-0">
                <button
                  onClick={themeChange}
                  className="px-4 py-2 rounded-full transition bg-(--primary) text-white hover:bg-(--primary-hover)"
                >
                  {theme === "dark" ? "☀ Light" : "🌙 Dark"}
                </button>
              </li>
              {authStatus && (
                <li>
                  <LogoutButton />
                </li>
              )}
            </ul>
          </div>

          <button
            className="md:hidden text-(--text) text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

        </nav>

        {menuOpen && (
          <div className="md:hidden mt-3">
            <ul className="flex flex-col gap-2">
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.name}>
                    <button
                      className="w-full text-left px-4 py-2 bg-(--card) text-(--text) border border-(--border) rounded-lg"
                      onClick={() => {
                        navigate(item.slug);
                        setMenuOpen(false);
                      }}
                    >
                      {item.name}
                    </button>
                  </li>
                ) : null
              )}
              <li className="shrink-0">
                <button
                  onClick={themeChange}
                  className="px-4 py-2 rounded-full transition bg-(--primary) text-white hover:bg-(--primary-hover)"
                >
                  {theme === "dark" ? "☀ Light" : "🌙 Dark"}
                </button>
              </li>
              {authStatus && (
                <li>
                  <LogoutButton />
                </li>
              )}
            </ul>
          </div>
        )}

      </Container>
    </header>
  );
};

export default Header;