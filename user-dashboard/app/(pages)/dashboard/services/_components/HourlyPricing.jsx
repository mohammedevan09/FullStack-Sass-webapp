import { CheckSignIcon3 } from '@/staticData/Icon'

const HourlyPricing = ({ index, item, handleModal, pricingData }) => {
  return (
    <div
      key={index}
      className={`grid justify-between p-4 rounded-xl cursor-pointer pricing-shadow relative border-2 ${
        pricingData?.name === item?.name ? 'border-blue-800' : 'border-white'
      }`}
      onClick={() => handleModal(item)}
    >
      <div className="flex items-center sm:gap-6 gap-3">
        <div
          className={`sm:w-10 w-8 sm:h-10 h-8 rounded-full flex items-center justify-center`}
        >
          <div
            className={`sm:w-10 w-8 sm:h-10 h-8 ${
              pricingData?.name === item?.name ? 'bg-blue-800' : 'bg-white'
            } rounded-full flex items-center justify-center`}
          >
            <CheckSignIcon3
              color={pricingData?.name === item?.name && 'white'}
            />
          </div>
        </div>
        <div className="grid sm:gap-1">
          <div className="bg-blue-800 rounded-[20px] text-gray-200 text-[13px] py-1 text-center font-medium w-[130px] px-3">
            {item?.name}
          </div>
          <h3 className="text-slate-600 sm:text-lg text-base font-semibold">
            {item?.hours} hours development
          </h3>
          <h4 className="text-zinc-500 sm:text-base text-sm font-normal">
            {item?.amount}$
          </h4>
        </div>
      </div>
    </div>
  )
}

export default HourlyPricing
