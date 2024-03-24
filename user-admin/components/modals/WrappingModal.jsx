'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const WrappingModal = ({ children, modalOpen }) => {
  const [delayedOpenModal, setDelayedOpenModal] = useState(false)

  useEffect(() => {
    let timeoutId

    if (modalOpen) {
      timeoutId = setTimeout(() => {
        setDelayedOpenModal(true)
      }, 0)
    }
    return () => {
      clearTimeout(timeoutId)
    }
  }, [modalOpen])

  return (
    <motion.div
      className={`fixed z-[999] left-0 right-0 bottom-0 top-0 modal-b-blur h-screen w-screen overflow-y-scroll grid justify-center items-center overflow-x-hidden`}
    >
      <div
        className={`flex justify-center items-center sm:my-20 my-16 transition-all duration-[400ms] ease-in ${
          delayedOpenModal ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        {children}
      </div>
    </motion.div>
  )
}

export default WrappingModal
