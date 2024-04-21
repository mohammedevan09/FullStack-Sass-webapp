import MainHowToGuide from './MainHowToGuide'

import axios from 'axios'

const host = process.env.NEXT_PUBLIC_HOST

export const getAllGuideApi = async (queryData) => {
  const data = await axios.get(`${host}/api/guide/`, {
    params: queryData,
  })
  return data?.data
}

const page = async ({ searchParams }) => {
  const guide = await getAllGuideApi(searchParams)
  return (
    <>
      <MainHowToGuide guide={guide} />
    </>
  )
}

export default page
