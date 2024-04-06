import { getAllService } from '@/api/serviceApi'
import BackButton from '@/components/others/BackButton'
import ServiceTables from '@/components/tables/ServiceTables'

const page = async () => {
  const { NormalService } = await getAllService({
    __t: 'NormalService',
    limit: 50,
  })

  return (
    <div className="mb-10">
      <div className="sm:mt-14 mt-8 mb-8">
        <BackButton title={'Go Back'} link={'/services'} />
      </div>
      <div className="bg-white rounded-[20px] sm:my-8 my-6 pt-8 grid gap-4 overflow-x-hidden">
        <ServiceTables serviceData={NormalService} link={'/normalService'} />
      </div>
    </div>
  )
}

export default page
