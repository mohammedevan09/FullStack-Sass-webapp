import { getAffiliateByUserId } from '@/api/affiliateApi'
import MainAffiliatePageUserId from './MainAffiliatePageByUserId'

const page = async ({ params }) => {
  const affiliate = await getAffiliateByUserId(params?.userId)

  return (
    <section className="grid w-full items-center sm:my-10 my-8 sm:px-4 xs:px-3 px-1">
      <MainAffiliatePageUserId affiliate={affiliate} />
    </section>
  )
}

export default page
