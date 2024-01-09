import MainServiceList from './MainServiceList'

const page = () => {
  const services = [
    {
      id: '411234',
      category: 'Monthly Plan',
      title: 'Wordpress theme development',
    },
    {
      id: '411234',
      category: 'Design & development',
      title: 'Wordpress theme development',
    },
    {
      id: '411234',
      category: 'UI/UX design',
      title: 'Wordpress theme development',
    },
    {
      id: '411234',
      category: 'Fixed price',
      title: 'Wordpress theme development',
    },
  ]
  return <MainServiceList service={services} />
}

export default page
