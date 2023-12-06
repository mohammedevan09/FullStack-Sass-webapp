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
    <div className="w-full grid pl-24 items-center my-20">
      <MainBilling billingData={billingData} />
    </div>
  )
}

export default page
