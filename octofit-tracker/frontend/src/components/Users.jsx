import { useEffect, useState } from 'react';

function getApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
}

function getApiUrl() {
  const baseUrl = getApiBaseUrl();
  return `${baseUrl}/api/users/`;
}

function normalizeRecords(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.results)) {
    return payload.results;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  if (Array.isArray(payload?.items)) {
    return payload.items;
  }

  return [];
}

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadUsers() {
      try {
        const response = await fetch(getApiUrl());
        if (!response.ok) {
          throw new Error(`Request failed with ${response.status}`);
        }

        const payload = await response.json();
        if (isMounted) {
          setUsers(normalizeRecords(payload));
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unable to load users.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadUsers();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4 mb-3">Users</h2>
        {loading && <p className="text-muted">Loading users...</p>}
        {error && <div className="alert alert-danger">{error}</div>}
        {!loading && !error && users.length === 0 && (
          <p className="text-muted">No users found yet.</p>
        )}
        {!loading && !error && users.length > 0 && (
          <div className="row g-3">
            {users.map((user, index) => (
              <div key={user._id || `${user.email}-${index}`} className="col-md-6">
                <div className="border rounded p-3 h-100">
                  <h3 className="h6 mb-1">{user.name || 'User'}</h3>
                  <div className="text-muted small">{user.email || 'No email'}</div>
                  <div className="text-muted small">Goal: {user.fitnessGoal || 'Not set'}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
