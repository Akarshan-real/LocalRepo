import { useAuth } from './contexts/AuthContext';

function App() {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>JWT Auth Learning</h1>
      
      <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #ccc' }}>
        <h3>Auth Status:</h3>
        {isAuthenticated() ? (
          <div>
            <p>✅ Logged In</p>
            <p>User: {user?.name}</p>
            <p>ID: {user?.sub}</p>
          </div>
        ) : (
          <p>❌ Not Logged In</p>
        )}
      </div>
    </div>
  );
}

export default App;