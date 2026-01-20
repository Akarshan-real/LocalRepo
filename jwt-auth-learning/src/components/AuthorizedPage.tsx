// src/components/AuthorizedPage.tsx
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { api } from '../utils/api';

function AuthorizedPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Fetch user profile data (example)
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await api.get('/profile');
        setProfileData(response.data);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      } finally {
        setLoading(false);
      }
    };

    // Uncomment when you have backend:
    // fetchProfile();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{ maxWidth: '800px', margin: '50px auto', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>🔒 Authorized Page</h1>
        <button
          onClick={handleLogout}
          style={{
            padding: '10px 20px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Logout
        </button>
      </div>

      <div style={{ padding: '20px', backgroundColor: '#e7f5e7', borderRadius: '8px', marginBottom: '20px' }}>
        <h2>✅ You are authenticated!</h2>
        <p>Only logged-in users can see this page.</p>
      </div>

      <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px', marginBottom: '20px' }}>
        <h3>User Information (from JWT Token):</h3>
        <div style={{ marginTop: '15px' }}>
          <p><strong>User ID:</strong> {user?.sub}</p>
          <p><strong>Name:</strong> {user?.name}</p>
          <p><strong>Token Expires:</strong> {user?.exp ? new Date(user.exp * 1000).toLocaleString() : 'N/A'}</p>
        </div>
      </div>

      {loading && (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          Loading profile data...
        </div>
      )}

      {profileData && (
        <div style={{ padding: '20px', backgroundColor: '#fff3cd', borderRadius: '8px' }}>
          <h3>Profile Data (from API):</h3>
          <pre style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '4px', overflow: 'auto' }}>
            {JSON.stringify(profileData, null, 2)}
          </pre>
        </div>
      )}

      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#d1ecf1', borderRadius: '8px' }}>
        <h3>🎉 Protected Route Working!</h3>
        <p>Try these actions:</p>
        <ul>
          <li>Click "Logout" → You'll be redirected to login page</li>
          <li>Try accessing <code>/authorized</code> in new incognito tab → Auto-redirects to login</li>
          <li>Check browser cookies → You'll see <code>auth_token</code></li>
        </ul>
      </div>

      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
        <h4>Debug Info:</h4>
        <p style={{ fontSize: '14px', wordBreak: 'break-all' }}>
          <strong>Token (first 50 chars):</strong> {user ? `${JSON.stringify(user).substring(0, 50)}...` : 'None'}
        </p>
      </div>
    </div>
  );
}

export default AuthorizedPage;