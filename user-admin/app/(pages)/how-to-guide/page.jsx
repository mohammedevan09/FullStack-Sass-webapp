import { getAllGuideApi } from '@/api/guideApi'
import MainHowToGuide from './MainHowToGuide'

const page = async ({ searchParams }) => {
  const guides = await getAllGuideApi(searchParams)
  return <MainHowToGuide guides={guides} />
}

export default page
