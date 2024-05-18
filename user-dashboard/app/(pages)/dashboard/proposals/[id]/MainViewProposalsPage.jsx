'use client'

import ThanksAcceptProposalModal from '@/components/modals/proposalsModals/ThanksAcceptProposalModal'
import {
  AnyQuestionsIcon,
  CheckSignIcon4,
  DollarSignButtonIcon,
  NegotiateIcon,
  TotalHoursIcon,
} from '@/staticData/Icon'
import { useEffect, useState } from 'react'
import BackButton from '@/components/others/BackButton'
import GetACustomProposalModal from '@/components/modals/proposalsModals/GetACustomProposalModal'
import ThanksSubModal from '@/components/modals/proposalsModals/ThanksSubModal'
import { useSelector } from 'react-redux'
import { updateProposalApi } from '@/api/proposalApi'
import toast from 'react-hot-toast'
import Image from 'next/image'
import dummyProfile from '@/public/images/dummyProfile.png'
import { createChat } from '@/api/chatApi'
import { redirect } from 'next/navigation'

const MainViewProposalsPage = ({ data }) => {
  const [openModal, setOpenModal] = useState(false)
  const [openSubModal, setOpenSubModal] = useState(false)
  const [negotiateModal, setNegotiateModal] = useState(false)

  const { userInfo } = useSelector((state) => state?.user)

  const handleAccept = async (e) => {
    e.preventDefault()
    if (userInfo?.creatorId) {
      toast.error('Team member cannot do this!')
      return
    }
    try {
      toast.loading('Processing, please wait!', { duration: 600 })
      await updateProposalApi(
        {
          details: { ...data?.details, isAccepted: true },
        },
        data?._id
      )
      await createChat('proposal', {
        participants: [
          {
            participantType: 'User',
            participantId: data?.userId,
          },
          {
            participantType: 'User',
            participantId: data?.details?.lastProposalBy?._id,
          },
        ],
        proposalId: data?._id,
        messages: [],
      })
      toast.success('Proposal has been accepted!')
      window.location.reload()
    } catch (error) {
      toast.error('Cannot accept proposal')
    }
  }

  const handleNegotiate = (e) => {
    e.preventDefault()
    if (userInfo?.creatorId) {
      toast.error('Team member cannot do this!')
      return
    }
    setNegotiateModal(true)
  }

  useEffect(() => {
    if (!data?._id) {
      redirect(`/dashboard/proposals?userId=${userInfo?._id}`)
    }
  }, [data])

  return (
    <div className="w-full mx-auto">
      <BackButton link={'/dashboard/proposals'} title={'Go Back'} />
      <div className="my-4 bg-white rounded-[15px] relative">
        <div className="grid sm:py-10 py-5 justify-center items-center w-full gap-3">
          <h1 className="sm:text-2xl text-xl font-semibold">{data?.title}</h1>
          <h5 className="text-sm font-medium mx-auto">ID #{data?._id}</h5>
        </div>
        <div className="w-full border border-gray-300" />
        <div className="grid items-center gap-10 lg:mx-36 sm:mx-10 mx-5">
          <div className="grid items-center">
            <h1 className="sm:text-2xl text-xl font-semibold mx-auto my-6">
              Executive Summary
            </h1>

            <p className="text-base font-normal bg-amber-400 bg-opacity-20 rounded-[15px] md:py-8 py-4 md:px-12 px-8 text-justify mb-6">
              <span className="text-black text-base font-bold">
                Problem overview -{' '}
              </span>
              {data?.details?.executive_summary?.problem_overview}
            </p>
            <p className="text-base font-normal bg-green-500 bg-opacity-20 rounded-[15px] md:py-8 py-4 md:px-12 px-8 text-justify">
              <span className="text-black text-base font-bold">
                Proposed solution -{' '}
              </span>
              {data?.details?.executive_summary?.problem_solution}
            </p>
          </div>
          <div className="grid items-center gap-5">
            <h1 className="sm:text-2xl text-xl font-semibold mx-auto sm:mn-10 mb-2">
              Scope of Work
            </h1>

            <p className="text-base font-normal bg-sky-500 bg-opacity-20 rounded-[15px] md:py-8 py-4 md:px-12 px-8 text-justify">
              <span className="text-black text-base font-bold">
                Features -{' '}
              </span>
              {data?.details?.scope_of_work?.features}
            </p>
            <p className="text-base font-normal bg-sky-500 bg-opacity-20 rounded-[15px] md:py-8 py-4 md:px-12 px-8 text-justify">
              <span className="text-black text-base font-bold">
                Resources required -{' '}
              </span>
              {data?.details?.scope_of_work?.resources_required}
            </p>
          </div>
        </div>
        <div className="flex sm:gap-16 gap-6 justify-center items-center mt-9 pb-16">
          <button className="grid justify-center items-center bg-sky-500 bg-opacity-25 rounded-[20px] px-4 py-2 text-stone-900 text-lg">
            <DollarSignButtonIcon />
            <div>
              Budget - <span className="font-bold">${data?.totalAmount}</span>
            </div>
          </button>
          <button className="grid justify-center items-center bg-green-500 bg-opacity-25 rounded-[20px] px-4 py-2 text-stone-900 text-lg">
            <div className="mx-auto text-center py-1">
              <TotalHoursIcon size={'24'} color={'blue'} />
            </div>
            <div>
              Timeline -{' '}
              <span className="font-bold">{data?.timeline} days</span>
            </div>
          </button>
        </div>
      </div>
      <div className="grid gap-5 justify-center">
        {userInfo?._id !== data?.details?.lastProposalBy?._id ? (
          <button
            className="w-[223px] h-[51px] btn-hover rounded-[15px] text-xl font-medium flex items-center justify-center mx-auto gap-2"
            onClick={handleAccept}
          >
            <CheckSignIcon4 /> Accept proposal
          </button>
        ) : (
          <div className="flex gap-2 items-center font-medium">
            Wait for <span className="font-bold">Admin</span> to accept this
            Proposal. Last Negotiated by
            <span className="font-bold">
              {data?.details?.lastProposalBy?.fullName}
            </span>
            <Image
              src={data?.details?.lastProposalBy?.profileImage || dummyProfile}
              alt="profile"
              width={40}
              height={40}
              className="object-cover w-10 h-10 rounded-full"
            />
          </div>
        )}
        <button
          className="w-[223px] h-[51px] border-2 border-blue-800 rounded-[15px] text-blue-800 text-xl font-medium flex items-center justify-center mx-auto mb-24 gap-2"
          onClick={handleNegotiate}
        >
          <NegotiateIcon /> Negotiate
        </button>
      </div>
      <div className="grid justify-center items-center mb-32 gap-3">
        <AnyQuestionsIcon />
        <h3 className="text-2xl font-semibold sm:mx-[14rem] xs:mx-8 mx-6 text-center">
          have any question or thinking of negotiation? Talk to us!
        </h3>
      </div>
      {openModal && <ThanksAcceptProposalModal setOpenModal={setOpenModal} />}
      {negotiateModal && (
        <GetACustomProposalModal
          openModal={negotiateModal}
          setOpenModal={setNegotiateModal}
          setOpenSubModal={setOpenSubModal}
          existedData={data}
        />
      )}
      {openSubModal && (
        <ThanksSubModal
          setOpenModal={setNegotiateModal}
          setOpenSubModal={setOpenSubModal}
        />
      )}
    </div>
  )
}

export default MainViewProposalsPage
