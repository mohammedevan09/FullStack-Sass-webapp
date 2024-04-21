import BackButton from '@/components/others/BackButton'
import { FormsByCategoryIdIcon } from '@/staticData/Icon'
import Image from 'next/image'
import dummyProfile from '@/public/images/dummyProfile.png'

const MainFeedbackByCategory = ({ feedbackCategory, feedbacks }) => {
  return (
    <div className="lg:w-full w-screen px-7 pt-8 overflow-x-scroll">
      <BackButton title={'Go Back'} link={'/feedback'} />
      <div className=" md:gap-3 gap-6">
        <h1 className="text-2xl font-semibold">{feedbackCategory?.name}</h1>
        <h2 className="text-base font-semibold text-gray-500">
          {feedbackCategory?.description}
        </h2>
      </div>
      <div className="bg-zinc-400 w-full h-[1px] mt-3 mb-6" />
      <div className="grid items-center gap-3">
        {feedbacks?.map((item, i) => (
          <div
            key={item?._id}
            className="flex justify-between items-start gap-3"
          >
            <div className="flex gap-2">
              <FormsByCategoryIdIcon />
              <div className="grid items-center">
                <p className="font-semibold text-sm text-gray-700">
                  By {item?.userId?.fullName}{' '}
                  <span className="text-xs italic text-gray-500">
                    {`(${item?.userId?.email})`}
                  </span>
                </p>
                <span className="text-sm text-gray-600">{item?.details}</span>
              </div>
            </div>
            <div className="w-10">
              <Image
                src={item?.userId?.profileImage || dummyProfile}
                alt="img"
                width={100}
                height={100}
                quality={50}
                className="h-10 rounded-full bg-[#7136ff36] object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MainFeedbackByCategory
