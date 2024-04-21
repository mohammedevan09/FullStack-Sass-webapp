import { getGuideByIdApi } from '@/api/guideApi'
import MainSingleGuidePage from './MainSingleGuidePage'

const page = async ({ params }) => {
  const guide = params?.id !== 'new' && (await getGuideByIdApi({}, params?.id))
  return <MainSingleGuidePage guide={params?.id !== 'new' ? guide : {}} />
}

export default page
