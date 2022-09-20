import { Modal, Button, Badge } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';

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
            <h3 className="text-2xl font-medium text-gray-900 dark:text-white">
              {data.title}
            </h3>
            {isInterested && (
              <Badge color="warning" size="sm">
                I'm interested.
              </Badge>
            )}
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 whitespace-pre-line">
              {data.description}
            </p>
            {isTerraformer && (
              <p className="text-base leading-relaxed text-gray-700 dark:text-gray-200 mt-5">
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
        <div className="flex flex-row justify-end gap-3">
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
