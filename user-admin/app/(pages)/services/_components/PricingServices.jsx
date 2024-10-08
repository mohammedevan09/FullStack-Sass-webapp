import { CheckSignIcon, CrossSignIcon, RemoveIcon } from '@/staticData/Icon'

const PricingServices = ({
  pricingServices,
  handleAddPricingService,
  handleDeletePricingService,
  available,
}) => {
  return (
    <div className="grid">
      <form
        onSubmit={handleAddPricingService}
        className="flex h-[34px] svg-shadow rounded-[4px] overflow-hidden"
      >
        <input
          type="text"
          name="service"
          placeholder={`Add ${available ? 'available' : 'unavailable'} service`}
          className="w-full px-3 rounded-sm"
        />
        <button
          type="submit"
          className={`${
            available ? 'bg-blue-400' : 'bg-rose-400'
          } text-white font-medium rounded-sm px-4 py-1`}
        >
          Add
        </button>
      </form>
      <div className="mt-4 grid gap-3">
        {pricingServices.map((service, index) => (
          <div key={index} className="flex items-start gap-2 justify-between">
            <div className="flex gap-2">
              {available ? <CheckSignIcon /> : <CrossSignIcon />}{' '}
              <p className="break-words">{service}</p>
            </div>
            <button
              onClick={() => handleDeletePricingService(index)}
              className="text-red-600"
            >
              <RemoveIcon />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PricingServices
