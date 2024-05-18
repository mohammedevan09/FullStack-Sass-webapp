import MainAllTicketsPage from './MainAllTicketsPage'
import { getAllOrders } from '@/api/orderApi'
import { getAllTickets } from '@/api/ticketApi'

const page = async ({ searchParams }) => {
  const { orders } = await getAllOrders({ ...searchParams, role: 'user' })
  const { tickets, totalDocsCount } = await getAllTickets({
    ...searchParams,
    userId: searchParams?.userId,
    role: 'user',
  })
  return (
    <>
      <MainAllTicketsPage
        orders={orders || {}}
        tickets={tickets || []}
        totalDocsCount={totalDocsCount}
      />
    </>
  )
}

export default page
