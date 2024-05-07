import { projectData } from '@/staticData/MainData'
import MainAllTicketsPage from './MainAllTicketsPage'
import { getAllOrders } from '@/api/orderApi'
import { getAllTickets } from '@/api/ticketApi'

const page = async ({ searchParams }) => {
  const orders = await getAllOrders({ ...searchParams, role: 'user' })
  const tickets = await getAllTickets({
    userId: searchParams?.userId,
    role: 'user',
  })
  return <MainAllTicketsPage orders={orders || {}} tickets={tickets || []} />
}

export default page
