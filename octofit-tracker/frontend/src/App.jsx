import { NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

const navItems = [
  { to: '/', label: 'Dashboard' },
  { to: '/users', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' }
];

function App() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  const apiHint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/`
    : 'http://localhost:8000/api/';

  return (
    <div className="container py-4">
      <header className="mb-4">
        <h1 className="display-6">Octofit Tracker</h1>
        <p className="text-muted">
          Configure <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> to use the Codespaces API host.
          When it is unset, the app falls back to <code>{apiHint}</code>.
        </p>
      </header>

      <nav className="nav nav-pills mb-4 flex-wrap">
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </div>
  );
}

export default App;
