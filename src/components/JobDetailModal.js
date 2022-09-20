import { Modal, Button, Badge } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';
import { DateTime } from 'luxon';

import { archiveJob, showInterest } from '../modules/jobs/jobsSlice';
import { selectIsTerraformer, selectUser } from '../modules/auth/authSlice';
import { toast } from 'react-toastify';

function JobDetailModal({ data, setModalData }) {
  const dispatch = useDispatch();
  const isTerraformer = useSelector(selectIsTerraformer);
  const loggedInUser = useSelector(selectUser);

  function handleClose() {
    setModalData(null);
  }

  function handleArchive(id) {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this.',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((isSure) => {
      if (isSure) {
        dispatch(archiveJob(id))
          .unwrap()
          .then(() => {
            setModalData(null);
            toast.success('Successfully archived.');
          });
      }
    });
  }

  function handleShowInterest(id) {
    dispatch(showInterest(id))
      .unwrap()
      .then(() => {
        setModalData(null);
        toast.success('Successfully showed interest');
      });
  }

  const isInterested =
    data && data.applicants.some(({ user }) => user.id === loggedInUser.id);

  return (
    <Modal show={!!data} size="2xl" popup={true} onClose={handleClose}>
      <Modal.Header />
      {data && (
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-3xl font-medium text-gray-900 dark:text-white">
              {data.title}
            </h3>
            {isInterested && (
              <div className="flex flex-row justify-end">
                <div className="w-fit">
                  <Badge color="warning" size="sm">
                    I'm interested.
                  </Badge>
                </div>
              </div>
            )}
            <div className="text-sm text-gray-700 dark:text-gray-300 grid sm:grid-cols-2">
              <div className="mb-2">
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  ></path>
                </svg>
                Created by: {data.creator.name}
              </div>
              <div className="mb-2">
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
                Created at:{' '}
                {DateTime.fromISO(data.createdAt).toFormat(
                  'yyyy-MM-dd HH:mm:ss'
                )}
              </div>
              <div className="mb-2">
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
                Location: {data.location}
              </div>
              <div className="mb-2">
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
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  ></path>
                </svg>
                E-mail: {data.contactEmail}
              </div>
              <div className="mb-2">
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
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  ></path>
                </svg>
                Phone number: {data.contactPhone}
              </div>
              <div className="mb-2">
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
                Deadline:{' '}
                {DateTime.fromISO(data.deadline).toFormat('yyyy-MM-dd')}
              </div>
            </div>
            <p className="text-base leading-relaxed text-gray-600 dark:text-gray-300 whitespace-pre-line">
              {data.description}
            </p>
            {isTerraformer && (
              <p className="text-base leading-relaxed text-gray-800 dark:text-gray-100 mt-5">
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
                Applicants:{' '}
                {!data.applicants.length
                  ? 0
                  : data.applicants.map(({ user }) => user.name).join(', ')}
              </p>
            )}
          </div>
        </Modal.Body>
      )}
      <Modal.Footer>
        <div className="flex flex-row justify-end gap-3 w-full">
          {isTerraformer ? (
            <Button color="failure" onClick={() => handleArchive(data.id)}>
              Archive
            </Button>
          ) : !isInterested ? (
            <Button color="warning" onClick={() => handleShowInterest(data.id)}>
              I'm interested.
            </Button>
          ) : null}
          <Button color="gray" onClick={handleClose}>
            Close
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default JobDetailModal;
