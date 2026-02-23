import { useSelector } from 'react-redux';
import { LogoutButton, Container, Logo } from '../index';
import { Link, useNavigate } from 'react-router-dom';
const Header = () => {
  const navigate = useNavigate();
  const authStatus = useSelector((x: any) => x.auth.status);

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus
    },
    // {
    //   name : "All posts",
    //   slug: "/all-users-posts",
    //   active : true
    // },
    {
      name: "Your posts",
      slug: "/all-posts",
      active: authStatus
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus
    }
  ];

  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to={"/"}>
              <Logo className='w-28' />
            </Link>
          </div>
          <ul className='flex ml-auto gap-2'>
            {navItems.map((item) => (
              item.active ? (
                <li key={item.name}>
                  <button className='inline-bock cursor-pointer px-6 py-2 duration-200 hover:bg-blue-100 rounded-full' onClick={() => navigate(item.slug)}>{item.name}</button>
                </li>
              ) : null
            ))}
            {authStatus && (
              <li>
                <LogoutButton />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header
