import { getTicketByIdApi } from '@/api/ticketApi'
import MainOpenTicketViewPage from './MainOpenTicketViewPage'
import { getChatByIdApi } from '@/api/chatApi'
import { getAllOrders } from '@/api/orderApi'

const page = async ({ params, searchParams }) => {
  const orders = await getAllOrders({ ...searchParams, role: 'user' })
  const ticket = await getTicketByIdApi(params?.id)
  const ticketChat = await getChatByIdApi('ticket', { limit: 100 }, params?.id)

  return (
    <>
      <MainOpenTicketViewPage data={ticket} chat={ticketChat} orders={orders} />
    </>
  )
}

export default page
