import { Link } from 'react-router-dom';
import { Button } from 'flowbite-react';

function Error404() {
  return (
    <section className="flex flex-col justify-center items-center py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 min-h-[calc(100vh-62px)]">
      <div className="mx-auto max-w-screen-sm text-center">
        <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-blue-600 dark:text-blue-500">
          404
        </h1>
        <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
          Something's missing.
        </p>
        <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
          Sorry, we can't find that page.
        </p>
        <Link to="/" className="flex justify-center">
          <Button>Go to home</Button>
        </Link>
      </div>
    </section>
  );
}

export default Error404;
