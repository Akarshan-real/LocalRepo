import Sidebar from "./Sidebar";
import Main from "./Main";

const Layout = () => {
  return (
    <div className="flex h-screen w-full justify-center">
      <Sidebar />
      <Main />
    </div>
  );
};

export default Layout;
