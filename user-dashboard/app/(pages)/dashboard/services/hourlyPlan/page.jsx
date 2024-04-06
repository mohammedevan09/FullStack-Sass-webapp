import MainHourlyPlan from './MainHourlyPlan'
import MarketPlaceHeadings from '../_components/MarketPlaceHeadings'

const page = () => {
  const services = [
    {
      title: 'UI/UX design',
    },
    {
      title: 'Elementor  website design',
    },
    {
      title: 'Wordpress Theme Development',
    },
    {
      title: 'Woocommerce website development',
    },
    {
      title: 'Website edits, fixing, updates, maintenance',
    },
  ]
  const pricing = [
    {
      title: '30 hours development',
      price: '3000$',
      valueType: 'Best Value',
    },
    {
      title: '60 hours development',
      price: '5000$',
      valueType: '',
    },
    {
      title: 'Monthly - 3-4 hours/day',
      price: '1000$',
      valueType: '',
    },
  ]
  return (
    <div className="grid items-center justify-center">
      <MarketPlaceHeadings />
      <MainHourlyPlan services={services} pricing={pricing} />
    </div>
  )
}

export default page
