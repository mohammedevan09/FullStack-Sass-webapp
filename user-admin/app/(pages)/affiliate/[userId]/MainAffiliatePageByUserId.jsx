'use client'

import EditAffiliateModal from '@/components/modals/affiliateModals/EditAffiliateModal'
import TablePagination from '@/components/others/TablePagination'
import { EditIcon } from '@/staticData/Icon'
import { formatDateTwo } from '@/utils/formateDateAndTime'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

const MainAffiliatePageUserId = ({
  affiliate: { affiliate, orders, referredUsers, totalCountDocs },
}) => {
  const [openModal, setOpenModal] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    defaultValues: affiliate,
    mode: 'onChange',
  })

  return (
    <>
      <main className="grid">
        <h1 className="sm:text-4xl text-3xl font-semibold mb-11">
          Affiliate Commissions
        </h1>
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
            <thead>
              <tr className="text-base tracking-tight text-left">
                <th className="text-center">Name</th>
                <th className="text-center">Total Project</th>
                <th className="text-center">Total Spend</th>
              </tr>
            </thead>
            <tbody className="text-sm font-semibold text-zinc-700">
              {referredUsers?.map((item, i) => (
                <tr key={i}>
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
            <tbody className="text-sm font-medium text-zinc-700">
              {orders?.map((item, i) => (
                <tr key={i}>
                  <td className="lg:py-5 py-4 w-[120px] pr-2">
                    <div className="w-[120px] truncate">#{item?.title}</div>
                  </td>
                  <td>
                    <div className="w-[150px] truncate">{item?.fullName}</div>
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
        <h1 className="font-bold text-base">
          Paypal Email Account -{' '}
          <span className="font-semibold">
            {affiliate?.paymentAccounts?.paypal}
          </span>
        </h1>
      </div>
      <div>
        <button
          className={`rounded-[5px] text-base font-semibold gap-2 py-2 px-9 flex items-center mt-7 border-blue-800 border text-blue-800`}
          onClick={() => setOpenModal(true)}
        >
          Edit Paid Earnings
          <EditIcon />
        </button>
      </div>

      {openModal && (
        <EditAffiliateModal
          reset={reset}
          errors={errors}
          register={register}
          handleSubmit={handleSubmit}
          isValid={isValid}
          openModal={openModal}
          setOpenModal={setOpenModal}
          id={affiliate?._id}
        />
      )}
    </>
  )
}

export default MainAffiliatePageUserId
