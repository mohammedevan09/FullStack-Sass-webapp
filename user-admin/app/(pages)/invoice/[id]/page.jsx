import { getInvoiceByIdApi } from '@/api/invoiceApi'
import MainSingleInvoicePage from './MainSingleInvoicePage'

const page = async ({ params, searchParams }) => {
  const invoice = await getInvoiceByIdApi(params?.id, searchParams)

  return (
    <MainSingleInvoicePage
      invoice={invoice}
      searchParams={searchParams}
      params={params}
    />
  )
}

export default page
