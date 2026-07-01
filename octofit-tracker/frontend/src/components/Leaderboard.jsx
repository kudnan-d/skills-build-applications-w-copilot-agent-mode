import { useEffect, useState } from 'react';

function getApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
}

function getApiUrl() {
  const baseUrl = getApiBaseUrl();
  return `${baseUrl}/api/leaderboard`;
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

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadLeaderboard() {
      try {
        const response = await fetch(getApiUrl());
        if (!response.ok) {
          throw new Error(`Request failed with ${response.status}`);
        }

        const payload = await response.json();
        if (isMounted) {
          setEntries(normalizeRecords(payload));
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unable to load leaderboard.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadLeaderboard();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4 mb-3">Leaderboard</h2>
        {loading && <p className="text-muted">Loading leaderboard...</p>}
        {error && <div className="alert alert-danger">{error}</div>}
        {!loading && !error && entries.length === 0 && (
          <p className="text-muted">No leaderboard data yet.</p>
        )}
        {!loading && !error && entries.length > 0 && (
          <ol className="list-group list-group-numbered">
            {entries.map((entry, index) => (
              <li key={entry._id || `${entry.rank}-${index}`} className="list-group-item d-flex justify-content-between align-items-start">
                <div>
                  <div className="fw-semibold">{entry.userId || 'Athlete'}</div>
                  <div className="text-muted small">Score: {entry.score ?? 'n/a'}</div>
                </div>
                <span className="badge bg-primary">#{entry.rank ?? index + 1}</span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}
