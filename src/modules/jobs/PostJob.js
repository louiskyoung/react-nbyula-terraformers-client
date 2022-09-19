import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Label, TextInput, Textarea, Button } from 'flowbite-react';
import DatePicker from 'react-datepicker';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import { postJob } from './jobsSlice';
import 'react-datepicker/dist/react-datepicker.css';

function PostJob() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [jobForm, setJobForm] = React.useState({
    title: '',
    description: '',
    location: '',
    deadline: '',
    contactPhone: '',
    contactEmail: '',
  });
  const isValid =
    jobForm.title &&
    jobForm.description &&
    jobForm.location &&
    jobForm.deadline &&
    jobForm.contactPhone &&
    !isNaN(Number(jobForm.contactPhone)) &&
    jobForm.contactEmail;

  function handleChange(e, field) {
    setJobForm({
      ...jobForm,
      [field]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postJob(jobForm))
      .unwrap()
      .then(() => {
        toast.success('Successfully posted.');
        navigate('/jobs');
      });
  }

  function handleChangeDate(date) {
    console.log(date);
    setJobForm({
      ...jobForm,
      deadline: date,
    });
  }

  return (
    <section className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-[calc(100vh-62px)] lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 md:max-w-xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Post a job
          </h1>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="title" value="Job title" />
              </div>
              <TextInput
                type="text"
                value={jobForm.title}
                onChange={(e) => handleChange(e, 'title')}
                required={true}
                shadow={true}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="description" value="Description" />
              </div>
              <Textarea
                value={jobForm.description}
                rows={5}
                onChange={(e) => handleChange(e, 'description')}
                required={true}
                shadow={true}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="location" value="Location" />
              </div>
              <TextInput
                type="text"
                value={jobForm.location}
                onChange={(e) => handleChange(e, 'location')}
                required={true}
                shadow={true}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="deadline" value="Deadline" />
              </div>
              <DatePicker
                selected={jobForm.deadline}
                onChange={handleChangeDate}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="contactPhone" value="Contact phone number" />
              </div>
              <TextInput
                type="text"
                value={jobForm.contactPhone}
                onChange={(e) => handleChange(e, 'contactPhone')}
                required={true}
                shadow={true}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="contactEmail" value="Contact e-mail" />
              </div>
              <TextInput
                type="email"
                value={jobForm.contactEmail}
                onChange={(e) => handleChange(e, 'contactEmail')}
                required={true}
                shadow={true}
              />
            </div>
            <div className="flex justify-end mt-5">
              <Button type="submit" disabled={!isValid}>
                Post
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default PostJob;
