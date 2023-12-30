import Image from 'next/image'

const layout = ({ children }) => {
  return (
    <>
      <div
        className={`grid justify-center items-center my-10 overflow-x-hidden`}
      >
        <div className="grid gap-6">
          <div className="w-20 mx-auto">
            <Image
              src={'/images/wpsprint.png'}
              width={500}
              height={500}
              alt="wp sprint"
              className="h-[63.68px]"
            />
          </div>
          {children}
        </div>
      </div>
    </>
  )
}

export default layout
