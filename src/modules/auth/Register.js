import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Label, TextInput, Radio, Button } from 'flowbite-react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import { register } from './authSlice';
import logo from '../../styles/logo-small.svg';

const ROLES = ['terraformer', 'applicant'];

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registerForm, setRegisterForm] = React.useState({
    name: '',
    email: '',
    role: ROLES[0],
    password: '',
  });
  const isValid =
    registerForm.name && registerForm.email && registerForm.password;

  function handleChange(e, field) {
    setRegisterForm({
      ...registerForm,
      [field]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(register(registerForm))
      .unwrap()
      .then(() => {
        toast.success('Successfully registered.');
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
            Create an account
          </h1>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Your name" />
              </div>
              <TextInput
                type="text"
                placeholder="Your name"
                value={registerForm.name}
                onChange={(e) => handleChange(e, 'name')}
                required={true}
                shadow={true}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="E-mail" />
              </div>
              <TextInput
                type="email"
                placeholder="name@company.com"
                value={registerForm.email}
                onChange={(e) => handleChange(e, 'email')}
                required={true}
                shadow={true}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="role" value="Role" />
              </div>
              {ROLES.map((role) => (
                <React.Fragment key={role}>
                  <Radio
                    value={role}
                    checked={role === registerForm.role}
                    onChange={(e) => handleChange(e, 'role')}
                  />
                  <span className="ml-2 mr-5 capitalize">
                    <Label>{role}</Label>
                  </span>
                </React.Fragment>
              ))}
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Password" />
              </div>
              <TextInput
                type="password"
                placeholder="••••••••"
                value={registerForm.password}
                onChange={(e) => handleChange(e, 'password')}
                required={true}
                shadow={true}
              />
            </div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{' '}
              </p>
              <Link
                to="/login"
                className="text-sm text-blue-600 hover:underline dark:text-blue-500"
              >
                Login here
              </Link>
            </div>
            <div className="flex justify-end mt-5">
              <Button type="submit" disabled={!isValid}>
                Register
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Register;
