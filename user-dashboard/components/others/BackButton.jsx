'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { BackButtonIcon } from '@/staticData/Icon'

const BackButton = () => {
  const router = useRouter()

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      onClick={() => router.back()}
      className="flex justify-start items-center w-[120px] gap-1 mb-10 font-semibold text-xl -ml-1"
    >
      <BackButtonIcon /> Go Back
    </motion.button>
  )
}

export default BackButton
