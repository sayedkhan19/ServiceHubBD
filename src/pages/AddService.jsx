import React from 'react';

const AddService = () => {
    return (
        <div>
             <form onSubmit={handleAddJob} className="bg-base-200 border border-base-300 rounded-lg p-6 sm:p-10 mx-auto my-10 w-full max-w-4xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Job</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Title */}
        <div>
          <label className="label">Title</label>
          <input type="text" name="title" className="input input-bordered w-full" placeholder="Job Title" />
        </div>

        {/* Company */}
        <div>
          <label className="label">Company</label>
          <input type="text" name="company" className="input input-bordered w-full" placeholder="Company Name" />
        </div>

        {/* Location */}
        <div>
          <label className="label">Location</label>
          <input type="text" name="location" className="input input-bordered w-full" placeholder="Location" />
        </div>

        {/* Logo URL */}
        <div>
          <label className="label">Company Logo URL</label>
          <input type="text" name="logo" className="input input-bordered w-full" placeholder="Logo URL" />
        </div>

        {/* Job Type */}
        <div>
          <label className="label">Job Type</label>
          <div className="flex flex-wrap gap-2">
            {["All", "On-Site", "Remote", "Hybrid"].map(type => (
              <label key={type}>
                <input type="radio" name="jobType" value={type} className="mr-1" />
                {type}
              </label>
            ))}
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="label">Category</label>
          <select name="category" defaultValue="" className="select select-bordered w-full">
            <option disabled value="">Select a category</option>
            <option>Engineering</option>
            <option>Marketing</option>
            <option>Finance</option>
          </select>
        </div>

        {/* Deadline */}
        <div>
          <label className="label">Application Deadline</label>
          <input type="datetime-local" name="deadline" className="input input-bordered w-full" />
        </div>

        {/* Currency */}
        <div>
          <label className="label">Currency</label>
          <select name="currency" defaultValue="" className="select select-bordered w-full">
            <option disabled value="">Select currency</option>
            <option>BDT</option>
            <option>USD</option>
            <option>EURO</option>
          </select>
        </div>

        {/* Salary Min */}
        <div>
          <label className="label">Minimum Salary</label>
          <input type="number" name="minsalary" className="input input-bordered w-full" placeholder="Minimum Salary" />
        </div>

        {/* Salary Max */}
        <div>
          <label className="label">Maximum Salary</label>
          <input type="number" name="maxsalary" className="input input-bordered w-full" placeholder="Maximum Salary" />
        </div>

        {/* HR Name */}
        <div>
          <label className="label">HR Name</label>
          <input type="text" name="hr_name" className="input input-bordered w-full" placeholder="HR Name" />
        </div>

        {/* HR Email */}
        <div>
          <label className="label">HR Email</label>
          <input type="email" name="hr_email" defaultValue={user.email} className="input input-bordered w-full" placeholder="HR Email" />
        </div>
      </div>

      {/* Textareas (Full width) */}
      <div className="mt-6 space-y-4">
        <div>
          <label className="label">Job Description</label>
          <textarea name="description" className="textarea textarea-bordered w-full h-24" placeholder="Job Description"></textarea>
        </div>

        <div>
          <label className="label">Responsibilities</label>
          <textarea name="responsibilities" className="textarea textarea-bordered w-full h-24" placeholder="Job Responsibilities"></textarea>
        </div>
      </div>

       <div>
          <label className="label">Requirement</label>
          <textarea name="requirement" className="textarea textarea-bordered w-full h-24" placeholder="requiremnts"></textarea>
        </div>
    

      {/* Submit Button */}
      <div className="mt-6 text-center">
        <input type="submit" value="Add Job" className="btn btn-primary w-full sm:w-1/2" />
      </div>
    </form>
        </div>
    );
};

export default AddService;