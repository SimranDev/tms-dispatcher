import React, { useState, type FormEvent } from 'react'
import { Icon } from '@iconify/react'
import { JobStatus, type Job } from '../../types/components'
import { useMutation } from '@tanstack/react-query'
import { jobsAPI } from '../../api'
import AddressAutocomplete from '../form/AddressAutocomplete'

interface CreateJobDrawerProps {
  isOpen: boolean
  onClose: () => void
}

const emptyJob: Job = {
  name: '',
  origin: '',
  destination: '',
  status: JobStatus.Booked,
  notes: '',
}

const CreateJobDrawer: React.FC<CreateJobDrawerProps> = ({ isOpen, onClose }) => {
  const [job, setJob] = useState<Job>(emptyJob)

  const { mutate } = useMutation({
    mutationFn: jobsAPI.createJob,
    onSuccess: () => {
      setJob(emptyJob)
      onClose()
    },
  })

  const handleSubmit = (e: FormEvent, data: Job) => {
    e.preventDefault()
    mutate(data)
  }

  // Use a unique form ID to link submit button
  const formId = 'add-job-form'

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
        className={`bg-base-100 fixed top-0 right-0 z-50 h-full w-full max-w-md transform shadow-xl transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex h-full flex-col">
          <header className="border-base-300 flex flex-shrink-0 items-center justify-between border-b p-4">
            <h2 id="drawer-title" className="text-xl font-bold">
              Create New Job
            </h2>
            <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost" aria-label="Close">
              <Icon icon="mdi:close" className="h-6 w-6" />
            </button>
          </header>

          <form id={formId} onSubmit={(e) => handleSubmit(e, job)} className="flex-grow overflow-y-auto p-6">
            <div className="space-y-4">
              <div className="form-control">
                <label className="label" htmlFor="customer-input">
                  <span className="label-text">Job Name</span>
                </label>
                <input
                  id="customer-input"
                  type="text"
                  placeholder="Enter Name"
                  className="input input-bordered w-full"
                  value={job.name}
                  onChange={(e) => setJob({ ...job, name: e.target.value })}
                  required
                />
              </div>

              <AddressAutocomplete
                label="Origin"
                placeholder="Enter origin address"
                initialValue=""
                onSelect={(value) => setJob({ ...job, origin: value })}
              />
              <AddressAutocomplete
                label="Destination"
                placeholder="Enter destination address"
                initialValue=""
                onSelect={(value) => setJob({ ...job, destination: value })}
              />

              <div className="form-control grid">
                <label className="label" htmlFor="status-select">
                  <span className="label-text">Status</span>
                </label>
                <select
                  id="status-select"
                  className="select select-bordered w-full"
                  value={job.status}
                  onChange={(e) => setJob({ ...job, status: e.target.value as JobStatus })}
                  required
                >
                  {Object.values(JobStatus).map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-control">
                <label className="label" htmlFor="notes-input">
                  <span className="label-text">Notes</span>
                </label>
                <textarea
                  id="notes-input"
                  className="textarea textarea-bordered w-full"
                  placeholder="Additional notes"
                  value={job.notes}
                  onChange={(e) => setJob({ ...job, notes: e.target.value })}
                />
              </div>
            </div>
          </form>

          <footer className="border-base-300 flex flex-shrink-0 justify-end gap-2 border-t p-4">
            <button type="button" onClick={onClose} className="btn btn-ghost">
              Cancel
            </button>
            <button type="submit" form={formId} className="btn btn-primary">
              Save Job
            </button>
          </footer>
        </div>
      </div>
    </>
  )
}

export default CreateJobDrawer
