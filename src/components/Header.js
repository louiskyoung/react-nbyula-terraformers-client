import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Navbar, Button } from 'flowbite-react';
import { useSelector, useDispatch } from 'react-redux';
import {
  logout,
  selectIsLoggedIn,
  selectIsTerraformer,
} from '../modules/auth/authSlice';
import logo from '../styles/logo.svg';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isTerraformer = useSelector(selectIsTerraformer);

  function handleLogout() {
    dispatch(logout())
      .unwrap()
      .then(() => navigate('/'));
  }

  return (
    <Navbar>
      <Navbar.Brand href="/">
        <img src={logo} className="mr-3 h-6 sm:h-9" alt="logo" />
      </Navbar.Brand>
      <div className="flex md:order-2">
        {isLoggedIn ? (
          <Button color="failure" onClick={handleLogout}>
            Log out
          </Button>
        ) : (
          <>
            <Link to="/login" className="mr-5">
              <Button>Log in</Button>
            </Link>
            <Link to="/register">
              <Button color="dark">Register</Button>
            </Link>
          </>
        )}
        <Navbar.Toggle />
      </div>
      {isLoggedIn && (
        <Navbar.Collapse>
          <Link
            className="block py-2 pr-4 pl-3 md:p-0 border-b border-gray-100  text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
            to="/"
            style={{ color: location.pathname === '/' ? 'white' : '#999' }}
          >
            Home
          </Link>
          <Link
            className="block py-2 pr-4 pl-3 md:p-0 border-b border-gray-100  text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
            to="/jobs"
            style={{ color: location.pathname === '/jobs' ? 'white' : '#999' }}
          >
            Jobs
          </Link>
          {isTerraformer && (
            <Link
              className="block py-2 pr-4 pl-3 md:p-0 border-b border-gray-100  text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
              to="/jobs/post"
              style={{
                color: location.pathname === '/jobs/post' ? 'white' : '#999',
              }}
            >
              Post a job
            </Link>
          )}
        </Navbar.Collapse>
      )}
    </Navbar>
  );
}

export default Header;
