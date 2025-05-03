import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const AppLayout = () => {
  return (
    <div className="app">
      <header>{/* Your header content */}</header>
      <main>
        <Outlet /> {/* This renders the matched route */}
      </main>
      <footer>{/* Your footer content */}</footer>
      <ToastContainer />
    </div>
  );
};

export default AppLayout;