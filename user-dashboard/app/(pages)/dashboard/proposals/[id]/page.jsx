import MainViewProposalsPage from './MainViewProposalsPage'

const page = ({ params }) => {
  return (
    <div className="grid w-full justify-center">
      <MainViewProposalsPage params={params} />
    </div>
  )
}

export default page
