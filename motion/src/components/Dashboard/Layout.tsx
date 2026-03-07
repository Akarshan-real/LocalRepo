import Sidebar from './Sidebar'
import Main from './Main'

const Layout = () => {
  return (
    <div className='flex justify-center h-screen w-full'>
      <Sidebar />
      <Main />
    </div>
  )
}

export default Layout
