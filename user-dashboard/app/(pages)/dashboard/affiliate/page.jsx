import { getAffiliateByUserId } from '@/api/affiliateApi'
import AffiliateLanding from './AffiliateLanding'
import MainAffiliatePageUserId from './MainAffiliatePageByUserId'

const page = async ({ searchParams }) => {
  const affiliate = await getAffiliateByUserId(searchParams?.userId)

  return (
    <section className="grid w-full items-center sm:my-10 my-8 sm:px-4 xs:px-3 px-1">
      {affiliate?.affiliate?._id ? (
        <MainAffiliatePageUserId affiliate={affiliate} />
      ) : (
        <AffiliateLanding />
      )}
    </section>
  )
}

export default page
