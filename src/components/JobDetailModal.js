import { Modal, Button } from 'flowbite-react';
import { useDispatch } from 'react-redux';
import swal from 'sweetalert';

import { archiveJob } from '../modules/jobs/jobsSlice';
import { toast } from 'react-toastify';

function JobDetailModal({ data, setModalData }) {
  const dispatch = useDispatch();

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

  return (
    <Modal show={!!data} size="2xl" popup={true} onClose={handleClose}>
      <Modal.Header />
      {data && (
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-2xl font-medium text-gray-900 dark:text-white">
              {data.title}
            </h3>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 whitespace-pre-line">
              {data.description}
            </p>
          </div>
        </Modal.Body>
      )}
      <Modal.Footer>
        <div className="flex flex-row justify-end gap-3">
          <Button color="failure" onClick={() => handleArchive(data.id)}>
            Archive
          </Button>
          <Button color="gray" onClick={handleClose}>
            Close
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default JobDetailModal;
