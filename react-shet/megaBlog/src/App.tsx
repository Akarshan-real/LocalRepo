import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './App.css'
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import { Footer, Header } from './components';
import { Outlet } from 'react-router-dom';

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const userData = await authService.getCurrentUser();
        dispatch(userData ? login({ userData }) : logout());
      }
      catch (err) {
        console.error(err);
        dispatch(logout());
      }
      finally {
        setLoading(false);
      }
    }

    checkUser();
  }, []);

  return !loading ?
    (
      <div className='min-h-screen w-full flex flex-wrap content-between bg-gray-400'>
        <div className='w-full block'>
          <Header />
          <main>
            {/* <Outlet /> */}
          </main>
          <Footer />
        </div>
      </div>
    )
    :
    (
      <div className='min-h-screen w-full mid bg-no-repeat bg-cover' style={{ backgroundImage: "url('https://marketplace.canva.com/EAD2962NKnQ/2/0/1600w/canva-rainbow-gradient-pink-and-purple-virtual-background-_Tcjok-d9b4.jpg')" }}>
        <div className='w-16 h-16 rounded-full border-r-4 border-b-transparent border-b-4 border-t-4 border-l-4 border-black box-borde bg-transparent mid animate-spin'>
        </div>
      </div>
    )
}

export default App
