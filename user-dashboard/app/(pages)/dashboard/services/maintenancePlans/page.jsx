import MainMaintenancePlans from './MainMaintenancePlans'
import MarketPlaceHeadings from '../MarketPlaceHeadings'

const page = () => {
  const pricing = [
    {
      price: '$50/',
      title: 'Small Website',
      subtitle: 'Transparent ROI',
      services: [
        { title: '1-6 Pages' },
        { title: 'Figma UI/UX design' },
        { title: 'Elementor Pro' },
        { title: '1 Month Free maintenance' },
        { title: 'WordPress training video' },
      ],
      link: '',
    },
    {
      price: '$80/',
      title: 'Medium Website',
      subtitle: 'Transparent ROI',
      services: [
        { title: '1-10 Pages' },
        { title: 'Figma UI/UX design' },
        { title: 'Elementor Pro' },
        { title: '1 Month Free maintenance' },
        { title: 'WordPress training video' },
      ],
    },
    {
      price: '$100/',
      title: 'Large Website',
      subtitle: 'Transparent ROI',
      services: [
        { title: '1-20 Pages' },
        { title: 'E-commerce functionality' },
        { title: 'Elementor Pro' },
        { title: '1 Month Free maintenance' },
        { title: 'WordPress training video' },
      ],
    },
  ]
  return (
    <div className="grid items-center justify-center">
      <MarketPlaceHeadings />
      <MainMaintenancePlans pricing={pricing} />
    </div>
  )
}

export default page
