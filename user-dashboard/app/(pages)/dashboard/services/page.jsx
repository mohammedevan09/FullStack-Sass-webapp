import { getAllService } from '@/api/serviceApi'
import ServiceCard from './_components/ServiceCard'

const page = async () => {
  const { services } = await getAllService({ isActive: true })

  return (
    <div className="grid items-center lg:gap-24 sm:gap-12 gap-8 sm:my-10 my-3">
      <h1 className="sm:w-[492px] w-full text-center sm:text-4xl xs:text-3xl text-2xl font-bold mx-auto">
        What type of service are you looking for?
      </h1>
      <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 items-center lg:gap-10 md:gap-5 gap-7 w-full">
        {services?.NormalService?.map((item, i) => (
          <ServiceCard
            item={item}
            link={`/normalService/${item?._id}`}
            i={i}
            key={i}
            type={'Flat charge'}
          />
        ))}
        {services?.SubscriptionService?.map((item, i) => (
          <ServiceCard
            item={item}
            link={`/subscriptionService/${item?._id}`}
            i={i}
            key={i}
            type={'Subscription'}
          />
        ))}
        {services?.HourlyService?.map((item, i) => (
          <ServiceCard
            item={item}
            link={`/hourlyService/${item?._id}`}
            i={i}
            key={i}
            type={'Hourly'}
          />
        ))}
      </div>
    </div>
  )
}

export default page
