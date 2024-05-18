import MainAllTicketsPage from './MainAllTicketsPage'
import { getAllOrders } from '@/api/orderApi'
import { getAllTickets } from '@/api/ticketApi'

const page = async ({ searchParams }) => {
  const { tickets, totalDocsCount } = await getAllTickets({
    ...searchParams,
    userId: searchParams?.userId,
    role: 'admin',
  })
  return (
    <>
      <MainAllTicketsPage
        tickets={tickets || []}
        totalDocsCount={totalDocsCount}
      />
    </>
  )
}

export default page
