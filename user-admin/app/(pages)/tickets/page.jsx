import { projectData } from '@/staticData/MainData'
import MainAllTicketsPage from './MainAllTicketsPage'
import { getAllOrders } from '@/api/orderApi'
import { getAllTickets } from '@/api/ticketApi'

const page = async ({ searchParams }) => {
  const orders = await getAllOrders({ ...searchParams, role: 'admin' })
  const tickets = await getAllTickets({
    userId: searchParams?.userId,
    role: 'admin',
  })
  return <MainAllTicketsPage orders={orders || {}} tickets={tickets || []} />
}

export default page
