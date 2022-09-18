import { Link } from 'react-router-dom';
import { Label, TextInput, Button } from 'flowbite-react';

function Login() {
  return (
    <section className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-[calc(100vh-62px)] lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Log in to your account
          </h1>
          <form className="flex flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Your email" />
              </div>
              <TextInput
                id="email"
                type="email"
                placeholder="name@company.com"
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
                required={true}
                shadow={true}
              />
            </div>
            <div className="flex items-center gap-2">
              <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{' '}
              </p>
              <Link
                to="/register"
                className="text-blue-600 hover:underline dark:text-blue-500"
              >
                Register
              </Link>
            </div>
            <div className="flex justify-end">
              <Button type="submit">Login</Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
