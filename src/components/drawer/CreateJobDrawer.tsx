import React, { useState, type FormEvent } from 'react'
import { Icon } from '@iconify/react'
import { useMutation } from '@tanstack/react-query'
import { jobsAPI } from '../../api'
import AddressAutocomplete from '../form/AddressAutocomplete'
import type { CreateJob } from '../../types/dto'
import { JobStatus } from '../../types/dto/enums'
import { useGStore } from '../../store/gStore'
import { useShallow } from 'zustand/shallow'

interface CreateJobDrawerProps {
  isOpen: boolean
  onClose: () => void
}

const emptyJob: CreateJob = {
  customerId: '',
  containerId: '',
  vehicleId: '',
  driverId: '',
  pickupAddress: '',
  deliveryAddress: '',
  scheduledPickup: new Date().toISOString(),
  scheduledDelivery: new Date().toISOString(),
  status: JobStatus.Booked,
  notes: '',
  freightDescription: '',
}

const CreateJobDrawer: React.FC<CreateJobDrawerProps> = ({ isOpen, onClose }) => {
  const [job, setJob] = useState<CreateJob>(emptyJob)

  const [customers, containers, vehicles, drivers, jobs, setJobs] = useGStore(
    useShallow((s) => [s.customers, s.containers, s.vehicles, s.drivers, s.jobs, s.setJobs])
  )

  const { mutate } = useMutation({
    mutationFn: jobsAPI.createJob,
    onSuccess: (res) => {
      setJob(emptyJob)
      setJobs([res, ...jobs])
      onClose()
    },
  })

  const handleSubmit = (e: FormEvent, data: CreateJob) => {
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
        className={`bg-base-100 fixed top-0 right-0 z-50 h-full w-full max-w-xl transform shadow-xl transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
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
              <div className="flex gap-4">
                <div className="form-control">
                  <label className="label" htmlFor="customer-select">
                    <span className="label-text">Select Customer</span>
                  </label>
                  <select
                    id="customer-select"
                    className="select select-bordered w-full"
                    value={job.customerId}
                    onChange={(e) => setJob({ ...job, customerId: e.target.value })}
                    required
                  >
                    <option value="" disabled>
                      Select a customer
                    </option>
                    {customers.map((customer) => (
                      <option key={customer.id} value={customer.id}>
                        {customer.companyName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-control">
                  <label className="label" htmlFor="container-select">
                    <span className="label-text">Select Container</span>
                  </label>
                  <select
                    id="container-select"
                    className="select select-bordered w-full"
                    value={job.containerId}
                    onChange={(e) => setJob({ ...job, containerId: e.target.value })}
                    required
                  >
                    <option value="" disabled>
                      Select a container
                    </option>
                    {containers.map((container) => (
                      <option key={container.id} value={container.id}>
                        {container.containerNumber}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="form-control">
                  <label className="label" htmlFor="vehicle-select">
                    <span className="label-text">Select Vehicle</span>
                  </label>
                  <select
                    id="vehicle-select"
                    className="select select-bordered w-full"
                    value={job.vehicleId}
                    onChange={(e) => setJob({ ...job, vehicleId: e.target.value })}
                    required
                  >
                    <option value="" disabled>
                      Select a vehicle
                    </option>
                    {vehicles.map((vehicle) => (
                      <option key={vehicle.id} value={vehicle.id}>
                        {vehicle.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-control">
                  <label className="label" htmlFor="driver-select">
                    <span className="label-text">Select Driver</span>
                  </label>
                  <select
                    id="driver-select"
                    className="select select-bordered w-full"
                    value={job.driverId}
                    onChange={(e) => setJob({ ...job, driverId: e.target.value })}
                    required
                  >
                    <option value="" disabled>
                      Select a driver
                    </option>
                    {drivers.map((driver) => (
                      <option key={driver.id} value={driver.id}>
                        {driver.firstname} {driver.lastname}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="form-control">
                  <label className="label" htmlFor="scheduled-pickup">
                    <span className="label-text">Scheduled Pickup</span>
                  </label>
                  <input
                    type="datetime-local"
                    id="scheduled-pickup"
                    className="input input-bordered w-full"
                    value={job.scheduledPickup.slice(0, 16)}
                    onChange={(e) => setJob({ ...job, scheduledPickup: e.target.value })}
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label" htmlFor="scheduled-delivery">
                    <span className="label-text">Scheduled Delivery</span>
                  </label>
                  <input
                    type="datetime-local"
                    id="scheduled-delivery"
                    className="input input-bordered w-full"
                    value={job.scheduledDelivery.slice(0, 16)}
                    onChange={(e) => setJob({ ...job, scheduledDelivery: e.target.value })}
                    required
                  />
                </div>
              </div>
              <AddressAutocomplete
                label="Pickup Address"
                placeholder="Enter pickup address"
                initialValue=""
                onSelect={(value) => setJob({ ...job, pickupAddress: value })}
              />
              <AddressAutocomplete
                label="Delivery Address"
                placeholder="Enter delivery address"
                initialValue=""
                onSelect={(value) => setJob({ ...job, deliveryAddress: value })}
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
                <label className="label" htmlFor="freight-description-input">
                  <span className="label-text">Freight Description</span>
                </label>
                <textarea
                  id="freight-description-input"
                  className="textarea textarea-bordered w-full"
                  placeholder="Additional details about the freight"
                  value={job.freightDescription}
                  onChange={(e) => setJob({ ...job, freightDescription: e.target.value })}
                  required
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
