import { RightArrowIcon } from '@/staticData/Icon'
import Link from 'next/link'

const MediumHeading = ({ title, link, className }) => {
  return (
    <div className="flex justify-between items-center pb-2 lg:w-full w-[96vw] px-7 mb-6 pt-6">
      <h1
        className={`sm:text-xl text-lg font-semibold inline border-b-2 border-zinc-600 ${className}`}
      >
        {title}
      </h1>
      {link && (
        <Link
          href={link}
          className="font-bold flex items-center text-blue-500 lg:mr-9 border-b-2 border-blue-500 hover:scale-105 hover:text-blue-700 transition"
        >
          See all <RightArrowIcon />
        </Link>
      )}
    </div>
  )
}

export default MediumHeading
