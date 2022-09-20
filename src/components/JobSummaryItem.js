import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Button } from 'flowbite-react';
import { DateTime } from 'luxon';

function classifyJob(deadline) {
  const difference = DateTime.fromISO(deadline).diff(
    DateTime.now(),
    'days'
  ).days;
  if (difference >= 21) {
    return '#04af04';
  }

  if (difference > 4 && difference <= 14) {
    return '#dabb22';
  }

  if (difference <= 3) {
    return '#ff5050';
  }

  return '#cac9c9';
}

function JobSummaryItem({ index, data, setModalData, rearrangeJob }) {
  function handleReadMore() {
    setModalData(data);
  }

  const [{ isDragging }, dragRef] = useDrag({
    type: 'item',
    item: { sourceId: data.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [spec, dropRef] = useDrop({
    accept: 'item',
    drop: (item) => {
      const { sourceId } = item;
      const targetId = index ? data.id : -1;
      if (sourceId !== targetId) {
        rearrangeJob(sourceId, targetId);
      }
    },
  });

  const ref = React.useRef(null);
  const dragDropRef = dragRef(dropRef(ref));
  const opacity = isDragging ? 0.75 : 1;
  const cardColor = classifyJob(data.deadline);

  return (
    <div
      className={`flex rounded-lg border-2 dark:bg-gray-800 bg-white shadow-md flex-col`}
      data-testid="flowbite-card"
      ref={dragDropRef}
      style={{ ...opacity, borderColor: cardColor }}
    >
      <div className="flex h-full flex-col justify-center gap-4 p-6">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {data.title}
        </h5>
        <div className="text-sm flex flex-row items-center text-gray-700 dark:text-gray-400">
          <span className="mr-3">
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
            {data.applicants.length}
          </span>
          <span className="mr-3">
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
            {DateTime.fromISO(data.deadline).toFormat('yyyy-MM-dd')}
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
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              ></path>
            </svg>
            {data.location}
          </span>
        </div>
        <p className="font-normal text-gray-800 dark:text-gray-300">
          {`${data.description.slice(0, 100)}...`}
        </p>
        <div className="flex flex-row justify-end">
          <Button size="xs" color="light" onClick={handleReadMore}>
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

export default JobSummaryItem;
