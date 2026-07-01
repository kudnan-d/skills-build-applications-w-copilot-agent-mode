import { useEffect, useState } from 'react';

function getApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
}

function getApiUrl() {
  const baseUrl = getApiBaseUrl();
  return `${baseUrl}/api/teams/`;
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

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadTeams() {
      try {
        const response = await fetch(getApiUrl());
        if (!response.ok) {
          throw new Error(`Request failed with ${response.status}`);
        }

        const payload = await response.json();
        if (isMounted) {
          setTeams(normalizeRecords(payload));
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unable to load teams.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadTeams();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4 mb-3">Teams</h2>
        {loading && <p className="text-muted">Loading teams...</p>}
        {error && <div className="alert alert-danger">{error}</div>}
        {!loading && !error && teams.length === 0 && (
          <p className="text-muted">No teams found yet.</p>
        )}
        {!loading && !error && teams.length > 0 && (
          <div className="row g-3">
            {teams.map((team, index) => (
              <div key={team._id || `${team.name}-${index}`} className="col-md-6">
                <div className="border rounded p-3 h-100">
                  <h3 className="h6 mb-2">{team.name || 'Team'}</h3>
                  <div className="text-muted small">Sport: {team.sport || 'Unknown'}</div>
                  <div className="text-muted small">Members: {team.members?.length || 0}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
