import { getTicketByIdApi } from '@/api/ticketApi'
import MainOpenTicketViewPage from './MainOpenTicketViewPage'
import { getChatByIdApi } from '@/api/chatApi'

const page = async ({ params, searchParams }) => {
  const ticket = await getTicketByIdApi(params?.id)
  const ticketChat = await getChatByIdApi('ticket', { limit: 100 }, params?.id)

  return (
    <>
      <MainOpenTicketViewPage data={ticket} chat={ticketChat} />
    </>
  )
}

export default page
