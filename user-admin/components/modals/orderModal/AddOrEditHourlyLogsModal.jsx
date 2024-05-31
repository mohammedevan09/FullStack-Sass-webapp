import { Input2 } from '@/components/others/Input'
import WrappingModal from '../WrappingModal'
import Labels from '@/components/others/Labels'
import { motion } from 'framer-motion'
import ErrorMessage from '@/components/others/ErrorMessage'

const AddOrEditHourlyLogsModal = ({
  openModal,
  setOpenModal,
  register,
  errors,
  handleSubmit,
  logsLength,
  order,
  reset,
  watch,
}) => {
  const validateDate = (value) => {
    const selectedDate = new Date(value)
    const currentDate = new Date()

    if (selectedDate < currentDate) {
      return 'Date must be in the future'
    }

    return true
  }

  const validateEndTime = (value) => {
    const startTime = watch(`hourlyTimeLogs[${logsLength}].startTime`)
    const endTime = value

    const startTimeObj = new Date(`01/01/2000 ${startTime}`)
    const endTimeObj = new Date(`01/01/2000 ${endTime}`)

    if (endTimeObj <= startTimeObj) {
      return 'End Time must be greater than Start Time'
    }

    const timeDifferenceMs = endTimeObj - startTimeObj

    const timeDifferenceHours = timeDifferenceMs / (1000 * 60 * 60)

    if (timeDifferenceHours < 1) {
      return 'The difference between Start Time and End Time must be at least 1 hour'
    }

    return true
  }

  return (
    <WrappingModal modalOpen={openModal}>
      <div className="grid bg-white pt-10 pb-4 sm:px-12 px-8 rounded-[20px] w-full">
        <h3 className="xs:text-2xl text-xl font-semibold tracking-tight mx-auto">
          {logsLength === order?.hourlyTimeLogs?.length ? 'Add New' : 'Edit'}{' '}
          Hourly Time Logs
        </h3>
        <div className="w-full h-[0px] border border-neutral-300 mt-5 mb-10"></div>
        <div className="grid gap-5">
          <div className="grid">
            <Labels htmlFor={'task'} name={'Task'} />
            <Input2
              id={'task'}
              placeholder={'Ex: Implement responsive design'}
              type={'text'}
              validationRules={{
                ...register(`hourlyTimeLogs[${logsLength}].task`, {
                  required: {
                    value: true,
                    message: 'Task is required',
                  },
                }),
              }}
            />
            <ErrorMessage errors={errors?.hourlyTimeLogs?.[logsLength]?.task} />
          </div>
          <div className="grid">
            <Labels htmlFor={'memo'} name={'memo'} />
            <Input2
              id={'memo'}
              placeholder={'Ex: Apply css media query'}
              type={'text'}
              validationRules={{
                ...register(`hourlyTimeLogs[${logsLength}].memo`, {
                  required: {
                    value: true,
                    message: 'Memo is required',
                  },
                }),
              }}
            />
            <ErrorMessage errors={errors?.hourlyTimeLogs?.[logsLength]?.memo} />
          </div>
          <div className="grid">
            <Labels htmlFor={'date'} name={'date'} />
            <Input2
              id={'date'}
              placeholder={'Ex: yyyy/mm/dd'}
              type={'date'}
              validationRules={{
                ...register(`hourlyTimeLogs[${logsLength}].date`, {
                  required: {
                    value: true,
                    message: 'Date is required',
                  },
                  validate: validateDate,
                }),
              }}
            />
            <ErrorMessage errors={errors?.hourlyTimeLogs?.[logsLength]?.date} />
          </div>
          <div className="grid">
            <Labels htmlFor={'startTime'} name={'Start Time'} />
            <Input2
              id={'startTime'}
              placeholder={'Ex: 11 : 00'}
              type={'time'}
              validationRules={{
                ...register(`hourlyTimeLogs[${logsLength}].startTime`, {
                  required: {
                    value: true,
                    message: 'Start Time is required',
                  },
                }),
              }}
            />
            <ErrorMessage
              errors={errors?.hourlyTimeLogs?.[logsLength]?.startTime}
            />
          </div>
          <div className="grid">
            <Labels htmlFor={'endTime'} name={'End Time'} />
            <Input2
              id={'endTime'}
              placeholder={'Ex: 12 : 00'}
              type={'time'}
              validationRules={{
                ...register(`hourlyTimeLogs[${logsLength}].endTime`, {
                  required: {
                    value: true,
                    message: 'End Time is required',
                  },
                  validate: validateEndTime,
                }),
              }}
            />
            <ErrorMessage
              errors={errors?.hourlyTimeLogs?.[logsLength]?.endTime}
            />
          </div>
        </div>
        <div className="flex items-center gap-3 mt-9 mb-5">
          <motion.button
            whileHover={{ scale: 1.07 }}
            className="w-full px-4 py-2 text-blue-800 rounded-[9px] bg-white text-xl font-semibold"
            onClick={() => {
              if (logsLength === order?.hourlyTimeLogs?.length) {
                reset()
              }
              setOpenModal(false)
            }}
          >
            Cancel
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            className="w-full px-4 py-2 bg-blue-800 rounded-[9px] text-white text-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleSubmit}
          >
            Save
          </motion.button>
        </div>
      </div>
    </WrappingModal>
  )
}

export default AddOrEditHourlyLogsModal
