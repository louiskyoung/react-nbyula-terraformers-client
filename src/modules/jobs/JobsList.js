import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import JobSummaryItem from '../../components/JobSummaryItem';
import JobDetailModal from '../../components/JobDetailModal';
import { fetchJobs, updateOrder, selectJobsList } from './jobsSlice';
import { toast } from 'react-toastify';

function JobsList() {
  const dispatch = useDispatch();
  const jobs = useSelector(selectJobsList);
  const [modalData, setModalData] = React.useState(null);

  React.useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  function rearrangeJob(sourceId, targetId) {
    dispatch(updateOrder({ sourceId, targetId }))
      .unwrap()
      .then(toast.success('Successfully rearranged.'));
  }

  return (
    <section className="min-h-[calc(100vh-62px)]">
      <DndProvider backend={HTML5Backend}>
        <div className="container px-4 py-8 mx-auto lg:py-16 grid xl:grid-cols-3 lg:grid-cols-2 gap-6">
          {jobs.map((job, index) => (
            <JobSummaryItem
              key={job.id}
              data={job}
              index={index}
              setModalData={setModalData}
              rearrangeJob={rearrangeJob}
            />
          ))}
        </div>
        <JobDetailModal data={modalData} setModalData={setModalData} />
      </DndProvider>
    </section>
  );
}

export default JobsList;
