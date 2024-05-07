'use client'

import LogoutModal from '@/components/modals/menuModals/LogoutModal'
import ErrorMessage from '@/components/others/ErrorMessage'
import { Input2 } from '@/components/others/Input'
import Labels from '@/components/others/Labels'
import { EditIcon, ErrorIcon } from '@/staticData/Icon'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import dummyProfile from '@/public/images/dummyProfile.png'
import toast from 'react-hot-toast'
import { updateUserApi, uploadProfileImageApi } from '@/api/userApi'
import { useDispatch } from 'react-redux'
import { setUsers } from '@/store/reducers/userReducer'
import { resizeImage } from '@/utils/resizeImage.jsx'

const ProfileSetting = () => {
  const [logoutModal, setLogoutModal] = useState(false)
  const [images, setImages] = useState([])

  const dispatch = useDispatch()

  const { userInfo } = useSelector((state) => state?.user)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty, isSubmitting },
    setValue,
    reset,
  } = useForm({
    defaultValues: { ...userInfo },
    mode: 'onChange',
  })

  const onImageChange = async (e) => {
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

  const handleSave = async (data) => {
    if (isValid) {
      try {
        if (images?.length !== 0) {
          toast.loading('Updating new service!', { duration: 1500 })
        }
        const formData = new FormData()
        const { profileImage, ...dataWithoutImage } = data
        const userData = await updateUserApi(dataWithoutImage, userInfo?.token)
        dispatch(setUsers(userData))
        reset(userData)
        if (images?.length !== 0) {
          images.forEach((image) => {
            formData.append(`images`, image)
          })
          const { profileImage } = await uploadProfileImageApi(
            userInfo?._id,
            formData
          )
          dispatch(setUsers({ ...userData, profileImage }))
        }
        setImages([])
        toast.success(`Updated successfully!`)
      } catch (error) {
        toast.error(`Update failed!`)
      }
    }
  }

  return (
    <>
      <div className="w-full grid items-center sm:my-20 xs:my-10 my-5 lg:px-7 px-5 py-14 bg-white rounded-[20px] shadow">
        <div className="grid sm:w-[500px] w-[340px] items-center gap-6 mx-auto">
          <label
            className="font-medium text-xl items-center cursor-pointer grid gap-2"
            htmlFor="image"
          >
            <div className="w-[100px]">
              <Image
                src={
                  images?.length !== 0
                    ? URL.createObjectURL(images[0])
                    : userInfo?.profileImage || dummyProfile
                }
                alt="profileImage"
                width={200}
                height={200}
                className="h-[100px] rounded-full object-cover bg-[#7136ff36]"
              />
            </div>
            <div className="flex gap-2 font-semibold items-center text-sm">
              Change Profile Image <EditIcon color={'black'} />
            </div>
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
            <Labels name={'Email - (Not Editable)'} htmlFor={'email'} />
            <Input2
              id="email"
              type="email"
              placeholder="John@dmarketing.com"
              readOnly={true}
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
          {!userInfo?.creatorId && (
            <>
              {' '}
              <div>
                <Labels name={'Company Name'} htmlFor={'Company'} />
                <Input2
                  type="text"
                  id={'Company Name'}
                  placeholder="D-marketing"
                  validationRules={{
                    ...register('company_name'),
                  }}
                />
              </div>
              <div>
                <Labels name={'Website'} htmlFor={'Website'} />
                <Input2
                  type="text"
                  id={'Website'}
                  placeholder="D-marketing.com"
                  validationRules={{
                    ...register('company_website'),
                  }}
                />
              </div>
            </>
          )}

          <div>
            <Labels name={'Position/Job'} htmlFor={'Position/Job'} />
            <Input2
              id={'Position/Job title'}
              type="text"
              placeholder="Marketing Manager"
              validationRules={{
                ...register('position'),
              }}
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            className="py-2 text-lg bg-blue-800 text-white font-bold rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleSubmit(handleSave)}
            disabled={!isDirty || isSubmitting}
          >
            Save
          </motion.button>
          {/* <div className="grid gap-1">
            <div className="bg-blue-700 bg-opacity-20 py-2 px-3 flex justify-center gap-1 rounded-lg font-medium text-sm">
              <ErrorIcon color={'blue'} /> To change the Password you have to
              logout first than click the forgot password!
            </div>
            <div
              className="font-semibold text-blue-600 cursor-pointer"
              onClick={() => setLogoutModal(true)}
            >
              Change Password?
            </div>
          </div> */}
        </div>
      </div>
      {logoutModal && (
        <LogoutModal openModal={logoutModal} setOpenModal={setLogoutModal} />
      )}
    </>
  )
}

export default ProfileSetting
