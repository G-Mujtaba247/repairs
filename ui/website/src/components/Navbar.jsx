import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router';
import { Wrench, Menu, X, LogIn, LayoutDashboard, LogOut, ChevronRight } from 'lucide-react';
import ThemeToggle from './ui/ThemeToggle';
import { useAuth } from '../context/AuthContext';

const NAV_LINKS = [
  { to: '/',                label: 'Home',              exact: true },
  { to: '/find-technician', label: 'Find Technicians' },
  { to: '/about',           label: 'About' },
  { to: '/contact',         label: 'Contact' },
];

const Navbar = () => {
  const { isLoggedIn, isTechnician, user, logout } = useAuth();
  const navigate  = useNavigate();
  const [open,     setOpen]     = useState(false); // mobile menu
  const [scrolled, setScrolled] = useState(false); // scroll-based shadow

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on route change
  const handleNav = () => setOpen(false);

  const dashboardPath = isTechnician ? '/technician-dashboard' : '/customer-dashboard';

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate('/');
  };

  return (
    <>
      {/* Skip-to-content link for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[9999] bg-sky-500 text-white px-4 py-2 rounded-lg font-semibold"
      >
        Skip to content
      </a>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          scrolled
            ? 'bg-background/95 backdrop-blur-md shadow-sm border-b border-border/50'
            : 'bg-background/70 backdrop-blur-sm'
        }`}
        role="banner"
      >
        <nav
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            to="/"
            onClick={handleNav}
            className="flex items-center gap-2 group shrink-0"
            aria-label="RepairHub — go to homepage"
          >
            <div className="bg-sky-500 text-white p-1.5 rounded-lg group-hover:bg-sky-600 transition-colors">
              <Wrench className="w-4 h-4" />
            </div>
            <span className="font-bold text-lg tracking-tight text-foreground">
              Repair<span className="text-sky-500">Hub</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {NAV_LINKS.map(({ to, label, exact }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={exact}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-sky-600 bg-sky-50 dark:bg-sky-950/50'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Desktop right-side actions */}
          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />

            {isLoggedIn ? (
              <>
                <Link
                  to={dashboardPath}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
                >
                  <LayoutDashboard size={15} />
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
                  aria-label="Sign out"
                >
                  <LogOut size={15} />
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/auth"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
                >
                  <LogIn size={15} />
                  Sign in
                </Link>
                <Link
                  to="/find-technician"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold transition-colors"
                >
                  Book Repair
                  <ChevronRight size={14} />
                </Link>
              </>
            )}
          </div>

          {/* Mobile: theme toggle + hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setOpen(o => !o)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="p-2 rounded-lg hover:bg-accent/50 text-foreground transition-colors"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {open && (
          <div
            id="mobile-menu"
            className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-md px-4 pb-4 pt-2 space-y-1"
            role="navigation"
            aria-label="Mobile navigation"
          >
            {NAV_LINKS.map(({ to, label, exact }) => (
              <NavLink
                key={to}
                to={to}
                end={exact}
                onClick={handleNav}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-sky-600 bg-sky-50 dark:bg-sky-950/50'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}

            <div className="border-t border-border/50 pt-3 mt-3 space-y-1">
              {isLoggedIn ? (
                <>
                  <p className="px-4 py-1 text-xs text-muted-foreground">
                    Signed in as <span className="font-semibold">{user?.name}</span>
                  </p>
                  <Link
                    to={dashboardPath}
                    onClick={handleNav}
                    className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
                  >
                    <LayoutDashboard size={15} />
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                  >
                    <LogOut size={15} />
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/auth"
                    onClick={handleNav}
                    className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
                  >
                    <LogIn size={15} />
                    Sign in
                  </Link>
                  <Link
                    to="/find-technician"
                    onClick={handleNav}
                    className="flex items-center justify-center gap-2 mx-4 py-3 rounded-lg bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold transition-colors"
                  >
                    Book a Repair
                    <ChevronRight size={14} />
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
