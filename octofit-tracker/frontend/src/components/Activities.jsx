import { useEffect, useState } from 'react';

function getApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
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

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadActivities() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/activities/`);
        if (!response.ok) {
          throw new Error(`Request failed with ${response.status}`);
        }

        const payload = await response.json();
        if (isMounted) {
          setActivities(normalizeRecords(payload));
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unable to load activities.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadActivities();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4 mb-3">Activities</h2>
        {loading && <p className="text-muted">Loading activities...</p>}
        {error && <div className="alert alert-danger">{error}</div>}
        {!loading && !error && activities.length === 0 && (
          <p className="text-muted">No activities found yet.</p>
        )}
        {!loading && !error && activities.length > 0 && (
          <ul className="list-group list-group-flush">
            {activities.map((activity, index) => (
              <li key={activity._id || `${activity.type}-${index}`} className="list-group-item">
                <strong>{activity.type || 'Activity'}</strong>
                <div className="text-muted small">
                  {activity.durationMinutes ? `${activity.durationMinutes} min` : 'Duration unavailable'}
                  {activity.caloriesBurned ? ` • ${activity.caloriesBurned} kcal` : ''}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
