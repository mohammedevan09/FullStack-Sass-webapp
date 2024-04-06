import { CheckSignIcon, CrossSignIcon } from '@/staticData/Icon'

const PricingCard = ({ item, handleModal, isSubscription }) => {
  return (
    <div
      key={item?._id}
      className="pricing-shadow px-6 py-10 h-full w-full relative"
    >
      <div className="text-center">
        <h1 className="text-gray-900 text-5xl font-semibold leading-[60px] mx-auto">
          ${item?.amount}
          {isSubscription && <span className="text-4xl">/mo</span>}
        </h1>
        <div className="text-center pt-3">
          <h3 className="mx-auto text-gray-900 text-xl font-semibold leading-[30px] break-words">
            {item?.name}
          </h3>
          <h3 className="text-gray-500 text-base font-normal break-words">
            {item?.subName}
          </h3>
        </div>
      </div>
      <div className="grid items-center justify-center gap-4 pb-12 pt-6">
        {item?.availableService?.map((subItem, index) => (
          <div key={index} className="flex justify-start items-start gap-3">
            <CheckSignIcon />
            <div className="text-gray-500 sm:text-base text-sm font-normal break-words">
              {subItem}
            </div>
          </div>
        ))}
        {item?.unavailableService?.map((subItem, index) => (
          <div key={index} className="flex justify-start items-start gap-3">
            <CrossSignIcon />
            <div className="text-gray-500 sm:text-base text-sm font-normal break-words">
              {subItem}
            </div>
          </div>
        ))}
      </div>
      <button
        className="sm:mx-16 xs:mx-24 mx-14 bg-blue-800 px-3 py-1 rounded-lg text-white absolute left-0 right-0 bottom-8 hover:scale-105 transition text-lg font-medium"
        onClick={(e) => {
          e.preventDefault()
          handleModal(item)
        }}
      >
        Get Started
      </button>
    </div>
  )
}

export default PricingCard
