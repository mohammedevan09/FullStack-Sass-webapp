import MainInvoicePage from './MainInvoicePage'

const page = () => {
  const invoices = [
    {
      id: '1030',
      name: 'wordpress theme customization',
      amount: '$250',
    },
    {
      id: '1030',
      name: 'wordpress theme customization',
      amount: '$250',
    },
    {
      id: '1030',
      name: 'wordpress theme customization',
      amount: '$250',
    },
    {
      id: '1030',
      name: 'wordpress theme customization',
      amount: '$250',
    },
  ]
  return (
    <div>
      <MainInvoicePage invoices={invoices} />
    </div>
  )
}

export default page
