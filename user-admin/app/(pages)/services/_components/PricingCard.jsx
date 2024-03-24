import { CheckSignIcon, CrossSignIcon, EditIcon } from '@/staticData/Icon'

const PricingCard = ({ item, editPricingModal, setPricingLength, index }) => {
  return (
    <div key={item?._id} className="pricing-shadow px-6 py-10 relative h-full">
      <div
        className="absolute top-3 right-3 cursor-pointer"
        onClick={() => {
          editPricingModal(true)
          setPricingLength(index)
        }}
      >
        <EditIcon />
      </div>
      <div className="text-center">
        <h1 className="text-gray-900 text-5xl font-semibold leading-[60px] mx-auto">
          ${item?.amount}
        </h1>
        <div className="text-center sm:pt-4 pt-2">
          <h3 className="mx-auto text-gray-900 text-xl font-semibold leading-[30px]">
            {item?.name}
          </h3>
          <h3 className="text-gray-500 text-base font-normal">
            {item?.subName}
          </h3>
        </div>
      </div>
      <div className="grid items-center justify-center gap-4 py-8">
        {item?.availableService?.map((subItem, index) => (
          <div key={index} className="flex justify-start items-start gap-3">
            <CheckSignIcon />
            <div className="text-gray-500 sm:text-base text-sm font-normal break-all">
              {subItem}
            </div>
          </div>
        ))}
        {item?.unavailableService?.map((subItem, index) => (
          <div key={index} className="flex justify-start items-start gap-3">
            <CrossSignIcon />
            <div className="text-gray-500 sm:text-base text-sm font-normal break-all">
              {subItem}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PricingCard
