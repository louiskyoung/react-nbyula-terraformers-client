import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import JobSummaryItem from '../../components/JobSummaryItem';
import JobDetailModal from '../../components/JobDetailModal';
import { fetchJobs, selectJobsList } from './jobsSlice';

function JobsList() {
  const dispatch = useDispatch();
  const jobs = useSelector(selectJobsList);
  const [modalData, setModalData] = React.useState(null);

  React.useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  return (
    <section className="min-h-[calc(100vh-62px)]">
      <div className="container px-4 py-8 mx-auto lg:py-16 grid xl:grid-cols-3 lg:grid-cols-2 gap-6">
        {jobs.map((job) => (
          <JobSummaryItem key={job.id} data={job} setModalData={setModalData} />
        ))}
      </div>
      <JobDetailModal data={modalData} setModalData={setModalData} />
    </section>
  );
}

export default JobsList;
