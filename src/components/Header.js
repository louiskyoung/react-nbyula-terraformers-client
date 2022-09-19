import { Link } from 'react-router-dom';
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
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isTerraformer = useSelector(selectIsTerraformer);

  function handleLogout() {
    dispatch(logout());
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
          <Navbar.Link href="/" active={true}>
            Home
          </Navbar.Link>
          <Navbar.Link href="/jobs">Jobs</Navbar.Link>
          {isTerraformer && (
            <Navbar.Link href="/jobs/post">Post a job</Navbar.Link>
          )}
        </Navbar.Collapse>
      )}
    </Navbar>
  );
}

export default Header;
