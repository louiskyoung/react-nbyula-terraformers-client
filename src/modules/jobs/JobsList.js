import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import JobItem from '../../components/JobItem';
import { fetchJobs, selectJobsList } from './jobsSlice';

function JobsList() {
  const dispatch = useDispatch();
  const jobs = useSelector(selectJobsList);
  React.useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  return (
    <section className="min-h-[calc(100vh-62px)]">
      <div className="container px-4 py-8 mx-auto lg:py-16 grid xl:grid-cols-3 lg:grid-cols-2 gap-4">
        {jobs.map((job) => (
          <JobItem key={job.id} data={job}></JobItem>
        ))}
      </div>
    </section>
  );
}

export default JobsList;
