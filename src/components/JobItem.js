import { Button, Card } from 'flowbite-react';
import { DateTime } from 'luxon';

function classifyJob(deadline) {
  const difference = DateTime.fromISO(deadline).diff(
    DateTime.now(),
    'days'
  ).days;
  if (difference >= 21) {
    return 'green';
  }

  if (difference > 4 && difference <= 14) {
    return 'yellow';
  }

  if (difference <= 3) {
    return 'red';
  }

  return 'gray';
}

function JobItem({ data: { title, description, deadline, applicants } }) {
  const cardColor = classifyJob(deadline);

  return (
    <div
      className={`flex rounded-lg border dark:bg-gray-800 bg-white shadow-md dark:border-${cardColor}-600 border-${cardColor}-400 flex-col`}
      data-testid="flowbite-card"
    >
      <div class="flex h-full flex-col justify-center gap-4 p-6">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
        <div className="text-sm flex flex-row items-center text-gray-700 dark:text-gray-400">
          <span className="mr-5">
            <svg
              className="w-4 h-4 mr-1 inline"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              ></path>
            </svg>
            Applicants: {applicants.length}
          </span>
          <span>
            <svg
              className="w-4 h-4 mx-1 inline"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
            Deadline: {DateTime.fromISO(deadline).toFormat('yyyy LLL dd')}
          </span>
        </div>
        <p className="font-normal text-gray-800 dark:text-gray-300">
          {`${description.slice(0, 100)}...`}
        </p>
        <div className="flex flex-row justify-end">
          <Button size="sm">
            Read more
            <svg
              className="ml-2 -mr-1 h-4 w-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default JobItem;
