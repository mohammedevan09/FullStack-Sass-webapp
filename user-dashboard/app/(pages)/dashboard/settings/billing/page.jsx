import { MastercardIcon } from '@/staticData/Icon'
import MainBilling from './MainBilling'

const page = () => {
  const billingData = [
    {
      nameOnCard: 'Olivia S.',
      expiry: '06 / 2024',
      cardNum: '1234 1234 1234 1234',
      cvv: '123',
      cardType: 'Mastercard',
      cardIcon: <MastercardIcon />,
    },
  ]
  return (
    <div className="w-full grid items-center sm:my-20 xs:my-10 my-5 sm:px-4 xs:px-3 px-1">
      <MainBilling billingData={billingData} />
    </div>
  )
}

export default page
