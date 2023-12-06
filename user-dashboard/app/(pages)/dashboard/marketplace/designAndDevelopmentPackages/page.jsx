import MainDesignAndDevPricing from './MainDesignAndDevPricing'

const page = () => {
  const pricing = [
    {
      price: '$500',
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
      price: '$800',
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
      price: '$1500',
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
      <div className="grid items-center my-20">
        <h5 className="text-blue-800 text-base font-semibold leading-normal">
          Pricing
        </h5>
        <h1 className="text-gray-900 text-5xl font-semibold leading-[60px] pt-2 pb-6">
          Simple, transparent pricing
        </h1>
        <p className="text-gray-500 text-xl font-normal leading-[30px]">
          We believe Untitled should be accessible to all companies, no matter
          the size.
        </p>
      </div>
      <MainDesignAndDevPricing pricing={pricing} />
    </div>
  )
}

export default page
