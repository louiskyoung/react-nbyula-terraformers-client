import { Link } from 'react-router-dom';
import { Navbar, Button } from 'flowbite-react';

import logo from '../logo.svg';

function Header() {
  return (
    <Navbar>
      <Navbar.Brand href="/">
        <img src={logo} className="mr-3 h-6 sm:h-9" alt="logo" />
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Link to="/login" className="mr-5">
          <Button>Log in</Button>
        </Link>
        <Link to="/register">
          <Button color="dark">Register</Button>
        </Link>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="/" active={true}>
          Home
        </Navbar.Link>
        <Navbar.Link href="/jobs">Jobs</Navbar.Link>
        <Navbar.Link href="/jobs/post">Post a job</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
