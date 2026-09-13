import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Shield, Map, BarChart3, History, User, LogOut, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userJson = localStorage.getItem('saferoute_user');
  const user = userJson ? JSON.parse(userJson) : null;

  const handleLogout = () => {
    localStorage.removeItem('saferoute_token');
    localStorage.removeItem('saferoute_user');
    navigate('/login');
  };

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: Shield },
    { name: 'Plan Route', path: '/plan-route', icon: Map },
    { name: 'Safety Insights', path: '/insights', icon: BarChart3 },
    { name: 'Risk History', path: '/history', icon: History },
  ];

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-white/10 px-4 lg:px-8 py-3.5 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyber-blue to-cyber-cyan flex items-center justify-center shadow-glow-cyan">
            <Shield className="w-5 h-5 text-dark-900" />
          </div>
          <div>
            <div className="font-extrabold text-lg text-white tracking-wider flex items-center gap-1.5 font-mono">
              SAFEROUTE<span className="text-cyber-cyan">AI</span>
            </div>
            <div className="text-[10px] text-slate-400 font-medium tracking-tight -mt-1">
              Know the Risk. Before You Reach It.
            </div>
          </div>
        </Link>

        {/* Navigation Items */}
        {user && (
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                    isActive
                      ? 'bg-cyber-cyan/15 text-cyber-cyan border border-cyber-cyan/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        )}

        {/* User / Actions */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <Link
                to="/profile"
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-dark-800 border border-slate-700/80 hover:border-slate-600 text-xs font-medium text-slate-300"
              >
                <div className="w-6 h-6 rounded-full bg-cyber-blue/20 text-cyber-cyan flex items-center justify-center font-bold text-xs">
                  {user.full_name?.charAt(0) || 'U'}
                </div>
                <span className="hidden sm:inline">{user.full_name?.split(' ')[0]}</span>
              </Link>
              <button
                onClick={handleLogout}
                title="Logout"
                className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white transition-all"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 rounded-xl text-xs font-bold bg-cyber-cyan hover:bg-cyan-300 text-dark-900 transition-all shadow-glow-cyan"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
