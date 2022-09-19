import { Link } from 'react-router-dom';
import { Button } from 'flowbite-react';
import { useSelector } from 'react-redux';

import { selectIsLoggedIn, selectUser } from '../../modules/auth/authSlice';

function Welcome() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  return (
    <section className="flex flex-col justify-center min-h-[calc(100vh-62px)]">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight md:text-5xl xl:text-6xl dark:text-white !leading-tight">
            {isLoggedIn && <div>Welcome, {user.name}!</div>}
            Get started with Nbyula today
          </h1>
          <p className="max-w-2xl my-8 font-light text-gray-500 lg:mb-12 md:text-lg lg:text-xl dark:text-gray-400">
            Alone we can do so little; together we can do so much. With Nbyula
            growing exponentially, terraformers are looking forward to expanding
            their team. Could you help them build a customizable job board?
          </p>
          {isLoggedIn ? (
            <Link
              to="/jobs"
              className="inline-flex items-center justify-center"
            >
              <Button color="dark">Browse jobs</Button>
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="inline-flex items-center justify-center mr-5"
              >
                <Button>Log in</Button>
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center justify-center"
              >
                <Button color="dark">Register</Button>
              </Link>
            </>
          )}
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <img
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/maintenance/maintenance.svg"
            alt="mockup"
          />
        </div>
      </div>
    </section>
  );
}

export default Welcome;
