import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Label, TextInput, Button } from 'flowbite-react';
import { useDispatch } from 'react-redux';

import { login } from './authSlice';

import logo from '../../styles/logo-small.svg';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = React.useState({
    email: '',
    password: '',
  });
  const isValid = loginForm.email && loginForm.password;

  function handleChange(e, field) {
    setLoginForm({
      ...loginForm,
      [field]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(login(loginForm))
      .unwrap()
      .then(() => {
        navigate('/');
      });
  }
  return (
    <section className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-[calc(100vh-62px)] lg:py-0">
      <Link
        to="/"
        className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
      >
        <img className="w-8 h-8 mr-2" src={logo} alt="logo" />
        Nbyula
      </Link>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Log in to your account
          </h1>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Your email" />
              </div>
              <TextInput
                id="email"
                type="email"
                placeholder="name@company.com"
                value={loginForm.email}
                onChange={(e) => handleChange(e, 'email')}
                required={true}
                shadow={true}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Password" />
              </div>
              <TextInput
                id="password"
                type="password"
                placeholder="••••••••"
                value={loginForm.password}
                onChange={(e) => handleChange(e, 'password')}
                required={true}
                shadow={true}
              />
            </div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{' '}
              </p>
              <Link
                to="/register"
                className="text-sm text-blue-600 hover:underline dark:text-blue-500"
              >
                Register
              </Link>
            </div>
            <div className="flex justify-end mt-5">
              <Button type="submit">Log in</Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
