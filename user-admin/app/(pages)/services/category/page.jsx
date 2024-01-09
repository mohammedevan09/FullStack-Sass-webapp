import MainServiceCategoryPage from './MainServiceCategoryPage'

const page = () => {
  const services = [
    {
      id: '411234',
      category: 'Monthly Plan',
    },
    {
      id: '411234',
      category: 'Design & development',
    },
    {
      id: '411234',
      category: 'UI/UX design',
    },
    {
      id: '411234',
      category: 'Fixed price',
    },
  ]
  return <MainServiceCategoryPage service={services} />
}

export default page
