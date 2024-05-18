'use client'

import RequestWithdrawModal from '@/components/modals/affiliateModals/RequestWithdrawModal'
import ThanksWithdrawRequestModal from '@/components/modals/affiliateModals/ThanksWithdrawRequestModal'
import TablePagination from '@/components/others/TablePagination'
import { CopyLinkIcon, EditIcon, RequestWithdrawIcon } from '@/staticData/Icon'
import { formatDateTwo } from '@/utils/formateDateAndTime'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'

const MainAffiliatePageUserId = ({
  affiliate: { affiliate, orders, referredUsers, totalCountDocs },
  searchParams,
}) => {
  const [openModal, setOpenModal] = useState(false)
  const [openSubModal, setOpenSubModal] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
  } = useForm({
    defaultValues: affiliate,
    mode: 'onChange',
  })

  const getBaseLink = () => {
    const baseUrl = window.location.origin
    return `${baseUrl}?ref=${searchParams?.userId}`
  }

  const handleCopyLink = (e) => {
    e.preventDefault()
    navigator.clipboard.writeText(getBaseLink())
    toast.success('Copied Link successfully!')
  }

  const paypalPaymentAccount = watch('paymentAccounts.paypal')

  return (
    <>
      <main className="grid">
        <h1 className="sm:text-4xl text-3xl font-semibold mb-11">
          Affiliate Commissions
        </h1>
        <div className="py-10 sm:px-10 px-5 sm:text-base text-sm bg-white rounded-[5px] grid gap-2 font-medium">
          <p>
            Get your unique referral link and earn a commission for each order
            your referred clients place with us.
          </p>
          <div className="font-bold pt-3">Your link is:</div>
          <div className="sm:flex grid justify-start items-center sm:gap-6 gap-3">
            <input
              type="text"
              readOnly={true}
              className="sm:w-[347px] w-[320px] bg-opacity-25 rounded-[5px] border border-stone-500 text-black py-2 px-4"
              value={getBaseLink()}
            />
            <button
              className="font-semibold btn-hover rounded-[5px] py-2 w-[127px] flex justify-center gap-1 items-center"
              onClick={handleCopyLink}
            >
              Copy Link <CopyLinkIcon />
            </button>
          </div>
        </div>
        <div className="lg:w-full w-full bg-white rounded-[5px] px-7 py-2 my-8 overflow-x-scroll">
          <table className="w-full border-separate border-spacing-y-3">
            <tbody>
              <tr className="text-base tracking-tight text-left">
                <th className="text-center">Visitors</th>
                <th className="text-center">Sign ups</th>
                <th className="text-center">Paid Earnings</th>
                <th className="text-center">Total Earnings</th>
              </tr>
              <tr className="text-lg">
                <td className="text-center">
                  <div className="lg:w-full w-[150px] mx-auto">
                    {affiliate?.visitorsCount || 0}
                  </div>
                </td>
                <td className="text-center">
                  <div className="lg:w-full w-[150px] mx-auto">
                    {affiliate?.signUps || 0}
                  </div>
                </td>
                <td className="text-center">
                  <div className="lg:w-full w-[150px] mx-auto">
                    ${affiliate?.paidEarnings || 0}
                  </div>
                </td>
                <td className="text-center">
                  <div className="lg:w-full w-[150px] mx-auto">
                    ${affiliate?.totalEarnings || 0}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
      <main className="grid">
        <h2 className="text-2xl font-medium">Referrals</h2>
        <div className="lg:w-full w-full bg-white rounded-[5px] px-7 py-2 mt-3 mb-8 overflow-x-scroll">
          <table className="w-full border-separate border-spacing-y-3">
            <tbody>
              <tr className="text-base tracking-tight text-left">
                <th className="text-center">Name</th>
                <th className="text-center">Total Project</th>
                <th className="text-center">Total Spend</th>
              </tr>
              {referredUsers?.map((item, i) => (
                <tr className="text-base" key={i}>
                  <td className="text-center">
                    <div className="lg:w-full w-[150px] mx-auto">
                      {item?.fullName}
                    </div>
                  </td>
                  <td className="text-center">
                    <div className="lg:w-[180px] w-[150px] mx-auto">
                      {item?.totalProjects}
                    </div>
                  </td>
                  <td className="text-center">
                    <div className="lg:w-[180px] w-[150px] mx-auto">
                      ${item?.totalSpend}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <main className="grid">
        <h2 className="text-2xl font-medium">Commissions</h2>
        <div className="lg:w-full w-full bg-white rounded-[5px] px-7 py-2 my-3 overflow-x-scroll">
          <table className="w-full border-separate border-spacing-y-3">
            <thead>
              <tr className="text-base tracking-tight text-left">
                <th>Project</th>
                <th>Client</th>
                <th>Date</th>
                <th className="text-center">Total Budget</th>
                <th className="text-center">Commission</th>
              </tr>
            </thead>
            <tbody className="lg:text-base text-sm font-medium text-zinc-600">
              {orders?.map((item, i) => (
                <tr key={i}>
                  <td className="lg:py-5 py-4 2xl:w-[300px] w-[250px] pl-1 pr-2">
                    <div className="2xl:w-full w-[250px] truncate">
                      {item.title}
                    </div>
                  </td>
                  <td>
                    <div className="w-[150px]">{item?.fullName}</div>
                  </td>
                  <td>
                    <div className="w-[160px]">
                      {formatDateTwo(item?.createdAt)}
                    </div>
                  </td>
                  <td className="text-center mx-4">
                    <div className="w-[90px] mx-auto px-4">
                      ${item?.totalAmount}
                    </div>
                  </td>
                  <td className="text-center mx-4">
                    <div className="w-[90px] mx-auto px-4">
                      ${item?.totalAmount / 10}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <TablePagination pageCount={totalCountDocs} />
      </main>
      <div>
        <button
          className={`rounded-[5px] text-base font-semibold gap-2 py-2 px-9 flex items-center mt-7 ${
            !paypalPaymentAccount
              ? 'bg-blue-800 text-white'
              : 'text-[#0024ff87] border border-[#0024ff87]'
          }`}
          onClick={() => setOpenModal(true)}
        >
          {!paypalPaymentAccount ? 'Request Withdraw' : 'Submitted'}

          {!paypalPaymentAccount ? (
            <div className="mb-[10px]">
              <RequestWithdrawIcon />
            </div>
          ) : (
            <EditIcon />
          )}
        </button>
      </div>

      {openModal && (
        <RequestWithdrawModal
          reset={reset}
          errors={errors}
          register={register}
          handleSubmit={handleSubmit}
          isValid={isValid}
          openModal={openModal}
          setOpenModal={setOpenModal}
          setOpenSubModal={setOpenSubModal}
          id={affiliate?._id}
        />
      )}
      {openSubModal && (
        <ThanksWithdrawRequestModal
          setOpenModal={setOpenModal}
          setOpenSubModal={setOpenSubModal}
        />
      )}
    </>
  )
}

export default MainAffiliatePageUserId
