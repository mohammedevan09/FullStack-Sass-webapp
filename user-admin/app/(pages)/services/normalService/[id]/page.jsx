'use server'

import { getServiceById } from '@/api/serviceApi'
import MainServicePage from '../../_components/servicePage/MainServicePage'
import { getAllForm } from '@/api/formApi'

const page = async ({ params }) => {
  const service = await getServiceById(`normalService/${params?.id}`)
  const forms = await getAllForm()

  return <MainServicePage service={service} forms={forms} />
}

export default page
