'use client'

import { Input2 } from '@/components/others/Input'
import { LabelsTwo } from '@/components/others/Labels'
import {
  CheckSignIcon3,
  FilterByIdIcon,
  SearchByIdIcon,
} from '@/staticData/Icon'
import WrappingModal from '../WrappingModal'
import { motion } from 'framer-motion'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import { convertToOptions } from '@/utils/convertToOptions'
import { useForm } from 'react-hook-form'
import ErrorMessage from '@/components/others/ErrorMessage'
import { makeCapitalize } from '@/utils/StatusColor'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { createTicketApi, updateTicketApi } from '@/api/ticketApi'
import { getAllService } from '@/api/serviceApi'
import { createChat } from '@/api/chatApi'

const priority = [
  {
    title: 'high',
    color: '#FFA73F',
  },
  {
    title: 'medium',
    color: '#7572FF',
  },
  {
    title: 'low',
    color: '#2A2A2B',
  },
  {
    title: 'urgent',
    color: '#F4143D',
  },
]

const OpenTicketModal = ({
  setOpenModal,
  setOpenSubModal,
  openModal,
  orders,
  existedData,
}) => {
  const { userInfo } = useSelector((state) => state?.user)

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: existedData
      ? { ...existedData, orderId: existedData?.orderId?._id }
      : {
          userId: userInfo?._id,
        },
    mode: 'onChange',
  })

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleSearch = useDebouncedCallback((search) => {
    const params = new URLSearchParams(searchParams)

    if (search && search.startsWith('#')) {
      search = search.slice(1)
      params.set('search', search)
    } else if (search) {
      params.set('search', search)
    } else {
      params.delete('search')
    }
    replace(`${pathname}?${params.toString()}`)
  }, 300)

  const handleSave = async (data) => {
    if (!data?.orderId) {
      toast.error('Please Select A Project')
      return
    }
    if (isValid) {
      toast.loading('Processing, please wait!', { duration: 600 })
      try {
        const selectedOrder = Object.values(orders)
          .flatMap((orderType) => orderType)
          .find((o) => o._id === data?.orderId)

        const serviceData = await getAllService({
          search: selectedOrder?.serviceId,
          limit: 1,
        })
        const serviceType = Object.keys(serviceData)[0]

        if (existedData) {
          await updateTicketApi(data, existedData?._id, userInfo?.token)
          toast.success('Your ticket has been updated!')
          window.location.reload()
        } else {
          const ticket = await createTicketApi(data, userInfo?.token)
          await createChat(
            'ticket',
            {
              participants: [
                {
                  participantType: 'User',
                  participantId: userInfo?._id,
                },
                {
                  participantType: 'User',
                  participantId: serviceData?.[serviceType]?.[0]?.creatorId,
                },
              ],
              ticketId: ticket?._id,
              messages: [],
            },
            userInfo?.token
          )
          setOpenSubModal(true)
          setOpenModal(false)
          toast.success('Your ticket has been submitted!')
        }
      } catch (error) {
        toast.error('Cannot create a ticket!')
      }
    }
  }

  return (
    <WrappingModal modalOpen={openModal}>
      <div className="grid bg-white py-16 px-40 rounded-[20px]">
        <div className="grid gap-5 mb-20 justify-center">
          <h2 className="sm:text-2xl text-xl font-semibold mx-auto text-center">
            Provide Ticket details & questionnaire
          </h2>
          <div className="border border-neutral-400"></div>
        </div>
        <div className="grid gap-5">
          <div className="grid">
            <LabelsTwo htmlFor={'project-title'} name={'Ticket Title'} />
            <Input2
              id={'project-title'}
              placeholder={'Ex: Andrea’s personal web development'}
              type={'text'}
              validationRules={{
                ...register('title', {
                  required: {
                    value: true,
                    message: 'Title is required',
                  },
                }),
              }}
            />
            <ErrorMessage errors={errors.title} />
          </div>
          <div className="grid">
            <LabelsTwo
              htmlFor={'Describe-the-projects'}
              name={'Describe the Business/projects.'}
            />
            <textarea
              id={'Describe-the-projects'}
              placeholder={'Example: its an salon business in new York etc.'}
              className="outline-none sm:h-[191px] h-[150px] rounded-[5px] sm:w-[570px] xs:w-[446px] w-[340px] text-sm border border-zinc-400 p-5"
              type={'text'}
              {...register('description', {
                required: {
                  value: true,
                  message: 'Description is required',
                },
              })}
            />
            <ErrorMessage errors={errors.description} />
          </div>
        </div>
        <div className="grid bg-gray-400 bg-opacity-25 rounded-xl my-8 p-4">
          <h3 className="mx-auto text-lg font-semibold flex items-center gap-2 mb-12">
            Select a project for this tickets <FilterByIdIcon />
          </h3>
          <div className="flex px-4 py-[7px] rounded-[5px] gap-1 bg-white w-[250px] mb-5">
            <div>
              <SearchByIdIcon />
            </div>
            <input
              type="text"
              className="outline-none bg-[none] text-sm font-medium"
              placeholder="Search by name, ID"
              onChange={(e) => {
                handleSearch(e.target.value)
              }}
              defaultValue={searchParams.get('search')?.toString()}
            />
          </div>
          <div className="grid max-h-[250px] overflow-y-scroll gap-2">
            {convertToOptions(orders)?.map((item, i) => (
              <label
                key={i}
                className={`flex gap-4 items-center border-2 py-[6px] px-4 rounded-full cursor-pointer font-medium ${
                  watch(`orderId`) === item?.value
                    ? 'border-blue-500'
                    : 'border-blue-100'
                }`}
                htmlFor={item?.value}
                onClick={() => {
                  setValue('orderId', item?.value)
                }}
              >
                <div
                  className={`w-6 h-6 ${
                    watch(`orderId`) === item?.value
                      ? 'bg-blue-500'
                      : 'bg-white'
                  } rounded-full flex items-center justify-center`}
                >
                  <CheckSignIcon3
                    size={'20'}
                    color={watch(`orderId`) === item?.value && 'white'}
                  />
                </div>
                <input
                  type="checkbox"
                  id={item.value}
                  className={`w-4 h-4 cursor-pointer hidden`}
                  // {...register('orderId', {
                  //   required: true,
                  // })}
                />
                <div className="grid">
                  <h4>{item?.label}</h4>
                  <h6 className="text-sm text-gray-500">#{item?.value}</h6>
                </div>
              </label>
            ))}
            <ErrorMessage
              errors={errors.orderId && { message: 'Select a Project first!' }}
            />
          </div>
        </div>
        <div className="grid gap-4">
          <h5 className="text-base font-semibold">Set priority</h5>
          {priority?.map((item, i) => (
            <div
              key={i}
              className={`rounded-full border-[${item?.color}] flex items-center gap-2`}
            >
              <label
                htmlFor={item?.title}
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setValue('priority', item?.title)}
              >
                <input
                  type="radio"
                  id={item?.title}
                  name="priority"
                  value={item?.title}
                  className={`w-5 h-5 `}
                  style={{
                    accentColor: item?.color,
                  }}
                  {...register('priority', {
                    required: true,
                    message: 'Priority is required',
                  })}
                />
                {makeCapitalize(item?.title)}
              </label>
            </div>
          ))}
          <ErrorMessage
            errors={errors.priority && { message: 'Priority is required' }}
          />
        </div>
        <div className="flex gap-1 items-center mt-12">
          <motion.button
            whileHover={{ scale: 1.15 }}
            className="w-full p-4 text-blue-800 rounded-[9px] font-bold text-xl"
            onClick={() => setOpenModal(false)}
          >
            Cancel
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            className="w-full p-4 bg-blue-800 rounded-[9px] text-white text-lg font-semibold"
            onClick={handleSubmit(handleSave)}
          >
            Submit Ticket
          </motion.button>
        </div>
      </div>
    </WrappingModal>
  )
}

export default OpenTicketModal
