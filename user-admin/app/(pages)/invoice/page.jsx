import { getAllInvoices } from '@/api/invoiceApi'
import InvoiceTable from '@/components/tables/invoice/InvoiceTable'
import TablePagination from '@/components/others/TablePagination'
import ProjectHeading from '../orders/_components/ProjectHeading'
import { NoteIcon } from '@/staticData/Icon'

const page = async ({ searchParams }) => {
  const invoices = await getAllInvoices({ ...searchParams, role: 'user' })
  return (
    <div className="sm:my-14 my-8">
      <ProjectHeading title={'All Invoices'} />

      <div className="bg-white rounded-[20px] sm:my-8 my-6 pt-6 pb-4 grid gap-4 overflow-x-hidden">
        <InvoiceTable invoices={invoices} />
        <TablePagination pageCount={invoices?.totalDocsCount} />
      </div>
      <div className="bg-blue-400 bg-opacity-20 py-2 px-6 flex justify-between gap-4 rounded-lg font-medium text-sm my-5 tracking-wider text-gray-700">
        <div className="flex items-center gap-1">
          <NoteIcon color={'blue'} /> Unpaid Subscription won't be shown here!
        </div>
      </div>
    </div>
  )
}

export default page
