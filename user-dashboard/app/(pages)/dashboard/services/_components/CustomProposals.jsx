const CustomProposals = ({ setOpenModalCustom }) => {
  return (
    <div className="sm:flex grid sm:justify-between items-center md:pt-20 pt-16 pb-16 px-0 gap-3">
      <div className="grid lg:gap-2 gap-0">
        <h2 className="text-gray-800 lg:text-3xl sm:text-2xl text-[18px] font-semibold">
          Looking for custom proposals?
        </h2>
        <p className="text-blue-800 lg:text-xl sm:text-lg text-[16px] font-normal">
          No worries, we got you covered!
        </p>
      </div>
      <button
        className="md:px-5 px-3 md:py-3 py-2 Get a custom proposal rounded-lg shadow border-2 border-zinc-800  font-semibold hover:text-blue-800 hover:border-blue-800"
        onClick={() => setOpenModalCustom(true)}
      >
        Get a custom proposal
      </button>
    </div>
  )
}

export default CustomProposals
