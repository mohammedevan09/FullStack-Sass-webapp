'use client'

import { resizeImage } from '@/utils/resizeImage'
import { Input2, PasswordInput } from '../../others/Input'
import Labels from '../../others/Labels'
import WrappingModal from '../WrappingModal'
import { motion } from 'framer-motion'
import Image from 'next/image'
import ErrorMessage from '@/components/others/ErrorMessage'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { CheckSignIcon3, CloseMenuIcon, EditIcon } from '@/staticData/Icon'
import dummyProfile from '@/public/images/dummyProfile.png'
import toast from 'react-hot-toast'
import { uploadProfileImageApi } from '@/api/userApi'
import { useSelector } from 'react-redux'
import { createTeamApi, updateTeamApi } from '@/api/teamApi'
import Link from 'next/link'

const AddNewTeamMemberModal = ({
  setSuccessModal,
  setOpenModal,
  openModal,
  initialData,
  isOnlyViewable,
}) => {
  const [images, setImages] = useState([])

  const { userInfo } = useSelector((state) => state?.user)

  const accessTypes = [
    {
      title: 'Projects',
      id: 'orders',
    },
    {
      title: 'Invoice',
      id: 'invoice',
    },
    {
      title: 'Proposals',
      id: 'proposals',
    },
    {
      title: 'Meetings',
      id: 'meetings',
    },
    {
      title: 'Tickets',
      id: 'tickets',
    },
    {
      title: 'Affiliate',
      id: 'affiliate',
    },
  ]

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    defaultValues: initialData || {
      email: '',
      password: '',
      fullName: '',
      number: '',
      position: '',
      creatorId: userInfo?._id,
      access: {
        orders: {
          access: false,
          accessOf: [],
        },
      },
    },
    mode: 'onChange',
  })
  const pass = watch('password')

  const onImageChange = async (e) => {
    if (isOnlyViewable) return
    const file = e.target.files[0]
    if (file) {
      const resizedImageBlob = await resizeImage(file, 200, 200, 200)
      const resizedImage = new File([resizedImageBlob], 'resized_image.png', {
        type: 'image/png',
      })
      setImages([resizedImage])
      setValue('manually', '', { shouldDirty: true })
    } else {
      toast.error('Please select image under 5MB')
    }
  }

  const handleCheckboxChange = (id, value) => {
    if (isOnlyViewable) return
    setValue(`access[${id}].access`, value)
  }

  const handleSave = async (data) => {
    if (isOnlyViewable) return
    if (isValid) {
      try {
        if (images?.length !== 0) {
          toast.loading('Submitting your request!', { duration: 1500 })
        }
        const formData = new FormData()
        const { profileImage, ...dataWithoutImage } = data
        let userData
        if (initialData) {
          userData = await updateTeamApi(dataWithoutImage, initialData?._id)
        } else {
          userData = await createTeamApi({
            ...dataWithoutImage,
            originalPass: pass,
            role: 'adminMember',
          })
        }
        if (images?.length !== 0) {
          images.forEach((image) => {
            formData.append(`images`, image)
          })
          await uploadProfileImageApi(userData?._id, formData, userInfo?.token)
        }
        reset()
        setImages([])
        setOpenModal(false)
        setSuccessModal(true)
        toast.success(`Request successful!`)
      } catch (error) {
        if (error?.response?.status === 401) {
          toast.error(`User already exist. Try different Email`)
        } else {
          toast.error(`Request failed!`)
        }
      }
    }
  }

  return (
    <WrappingModal modalOpen={openModal}>
      <div className="grid justify-center bg-white sm:pt-12 pt-8 pb-4 xs:px-6 px-4 rounded-[20px] overflow-x-hidden gap-7 sm:w-[550px] w-[360px]">
        <h2 className="text-2xl font-semibold mx-auto mb-2">
          {isOnlyViewable ? 'You can only view this!' : 'Add new team members'}
        </h2>
        <div className="grid w-full items-center gap-6 mx-auto">
          <label
            className="font-medium text-xl items-center cursor-pointer grid gap-2"
            htmlFor="image"
          >
            <div className="w-[100px]">
              <Image
                src={
                  images?.length !== 0
                    ? URL.createObjectURL(images[0])
                    : initialData?.profileImage || dummyProfile
                }
                alt="profileImage"
                width={200}
                height={200}
                className="h-[100px] rounded-full object-cover bg-[#7136ff36]"
              />
            </div>
            {!isOnlyViewable && (
              <div className="flex gap-2 font-semibold items-center text-sm">
                Change Profile Image <EditIcon color={'black'} />
              </div>
            )}
          </label>
          <input
            type="file"
            className="hidden"
            id="image"
            onChange={onImageChange}
          />
          <div>
            <Labels name={'Name'} htmlFor={'name'} />
            <Input2
              type="text"
              placeholder="John Doe"
              id="name"
              readOnly={isOnlyViewable}
              validationRules={{
                ...register('fullName', {
                  required: {
                    value: true,
                    message: 'Full Name is required',
                  },
                }),
              }}
            />
            <ErrorMessage errors={errors.fullName} />
          </div>
          <div>
            <Labels
              name={`${
                initialData?.originalPass ? 'Email - (Not Editable)' : 'Email'
              }`}
              htmlFor={'email'}
            />
            <Input2
              id="email"
              type="email"
              placeholder="John@dmarketing.com"
              readOnly={!!initialData}
              validationRules={{
                ...register('email', {
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Enter a valid email',
                  },
                  required: {
                    value: true,
                    message: 'Email is required',
                  },
                }),
              }}
            />
            <ErrorMessage errors={errors?.email} />
          </div>
          <div>
            <Labels name={'Phone'} htmlFor={'Phone'} />
            <Input2
              type="number"
              id={'Phone'}
              readOnly={isOnlyViewable}
              placeholder="+130712332122"
              validationRules={{
                ...register('number', {
                  required: {
                    value: true,
                    message: 'Phone number is required',
                  },
                  minLength: {
                    value: 6,
                    message: 'Phone no. length must be at least 6 characters',
                  },
                  maxLength: {
                    value: 13,
                    message: 'Phone no. length must be at least 13 characters',
                  },
                }),
              }}
            />
            <ErrorMessage errors={errors?.number} />
          </div>
          <div>
            <Labels name={'Position/Job'} htmlFor={'Position/Job'} />
            <Input2
              id={'Position/Job title'}
              readOnly={isOnlyViewable}
              type="text"
              placeholder="Marketing Manager"
              validationRules={{
                ...register('position'),
              }}
            />
          </div>
          <div>
            <Labels
              name={`${
                initialData?.originalPass
                  ? 'Password - (Not Editable)'
                  : 'Password'
              }`}
              htmlFor={'password'}
            />
            <PasswordInput
              id={'password'}
              placeholder={'Choose a strong password'}
              cnh={'h-[50px]'}
              readOnly={!!initialData}
              validationRules={{
                ...register(`${initialData ? 'originalPass' : 'password'}`, {
                  required: {
                    value: true,
                    message: 'Password is required',
                  },
                  minLength: {
                    value: 8,
                    message: 'Password length must be at least 8 characters',
                  },
                }),
              }}
            />
            <ErrorMessage errors={errors?.password} />
          </div>
        </div>
        <div>
          <h3 className="sm:text-base text-xs font-medium leading-relaxed mb-2 text-center">
            Select Access to profile and what they can see, manage.
          </h3>
          <div className="grid border-t border-gray-300 py-5 gap-6 w-full text-base font-medium">
            {accessTypes?.map((item, i) => {
              return (
                <AccessTypeComponent
                  key={i}
                  item={item}
                  i={i}
                  watch={watch}
                  handleCheckboxChange={handleCheckboxChange}
                />
              )
            })}
          </div>
        </div>
        <div className="w-full flex">
          {isOnlyViewable ? (
            <motion.button
              whileHover={{ scale: 1.03 }}
              className="w-full text-center text-white text-base font-semibold bg-blue-800 py-2 rounded-lg leading-7"
              onClick={() => setOpenModal(false)}
            >
              Close
            </motion.button>
          ) : (
            <>
              <motion.button
                whileHover={{ scale: 1.15 }}
                className="w-full text-center font-semibold text-blue-800 py-2 rounded-lg leading-7 text-lg"
                onClick={(e) => {
                  e.preventDefault()
                  reset()
                  setOpenModal(false)
                }}
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                className="w-full text-center text-white text-base font-semibold bg-blue-800 py-2 rounded-lg leading-7 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
                onClick={handleSubmit(handleSave)}
              >
                Save Member
              </motion.button>
            </>
          )}
        </div>
      </div>
    </WrappingModal>
  )
}

export const AccessTypeComponent = ({
  item,
  i,
  watch,
  handleCheckboxChange,
}) => {
  const [openDrop, setOpenDrop] = useState(false)
  return (
    <div
      key={i}
      className="overflow-hidden transition-all duration-500 ease-in-out"
    >
      <label
        className={`flex gap-4 items-center border-2 py-[6px] px-4 rounded-full cursor-pointer relative ${
          watch(`access[${item.id}].accessOf`)?.length > 0 && 'opacity-50'
        } ${
          watch(`access[${item.id}].access`)
            ? 'border-blue-500'
            : 'border-blue-100 text-gray-400'
        }`}
        htmlFor={item?.id}
        onClick={() => setOpenDrop((prev) => !prev)}
      >
        <div
          className={`w-6 h-6 ${
            watch(`access[${item.id}].access`) ? 'bg-blue-500' : 'bg-white'
          } rounded-full flex items-center justify-center`}
        >
          <CheckSignIcon3
            size={'20'}
            color={watch(`access[${item.id}].access`) && 'white'}
          />
        </div>
        <input
          type="checkbox"
          id={item.id}
          className={`w-4 h-4 cursor-pointer hidden`}
          checked={!!watch(`access[${item.id}].access`)}
          onChange={(e) => handleCheckboxChange(item.id, e.target.checked)}
          disabled={watch(`access[${item.id}].accessOf`)?.length > 0}
        />
        {item?.title}
        {watch(`access[${item.id}].accessOf`)?.length > 0 && (
          <div
            className={`${
              openDrop ? 'rotate-[267deg]' : 'rotate-180 '
            } transition-all duration-300 ease-in-out absolute top-2 right-4`}
          >
            <CloseMenuIcon size={18} color={'blue'} />
          </div>
        )}
      </label>
      {watch(`access[${item.id}].accessOf`)?.length > 0 && (
        <>
          <div className="text-xs text-gray-400 italic mb-2">
            You cannot remove this
          </div>
          <div
            className={`grid text-xs text-gray-600 font-semibold transition-all duration-500 ease-in-out gap-3 rounded-lg ${
              openDrop
                ? 'max-h-[2000px] border-2 border-[#65aaff] py-2 px-5'
                : 'max-h-0'
            }`}
          >
            {watch(`access[${item.id}].accessOf`)?.map((subItem, index) => {
              return (
                <div
                  className="flex justify-between items-center"
                  key={index + item?.id}
                >
                  <div>Access No - {index + 1}</div>
                  <div>#{subItem}</div>
                </div>
              )
            })}
            <Link
              href={`/${item?.id}?userId=${watch('_id')}`}
              className="px-2 py-2 mt-2 bg-blue-500 font-medium transition hover:scale-105 text-white rounded-md text-center cursor-pointer"
            >
              Open All
            </Link>
          </div>
        </>
      )}
    </div>
  )
}

export default AddNewTeamMemberModal
