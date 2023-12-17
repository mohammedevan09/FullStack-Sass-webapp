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
    <div className='md:mt-36 mt-8 md:mb-14 mb-6"'>
      <MainInvoicePage invoices={invoices} />
    </div>
  )
}

export default page
