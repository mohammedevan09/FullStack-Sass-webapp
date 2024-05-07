import MainViewProposalsPage from './MainViewProposalsPage'

const page = ({ params }) => {
  return (
    <div className="grid w-full justify-center sm:px-4 xs:px-3 px-1">
      <MainViewProposalsPage params={params} />
    </div>
  )
}

export default page
