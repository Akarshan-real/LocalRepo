import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import { Footer, Header, OverlayLoader } from './components';
import { Outlet } from 'react-router-dom';
import { setLoading } from './store/uxSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkUser = async () => {
      dispatch(setLoading(true));
      try {
        const userData = await authService.getCurrentUser();
        dispatch(userData ? login(userData) : logout());
      }
      catch (err) {
        console.error(err);
        dispatch(logout());
      }
      finally {
        dispatch(setLoading(false));
      };
    };

    checkUser();
  }, []);

  return (
    <OverlayLoader>
      <div className='min-h-screen w-full flex flex-wrap content-between bg-gray-400'>
        <div className='w-full block'>
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </OverlayLoader>
  )
}

export default App
