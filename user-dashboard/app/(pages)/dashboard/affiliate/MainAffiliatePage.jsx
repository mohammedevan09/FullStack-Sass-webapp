'use client'

import RequestWithdrawModal from '@/components/modals/affiliateModals/RequestWithdrawModal'
import ThanksWithdrawRequestModal from '@/components/modals/affiliateModals/ThanksWithdrawRequestModal'
import { CopyLinkIcon, RequestWithdrawIcon } from '@/staticData/Icon'
import { useState } from 'react'

const MainAffiliatePage = ({ affiliates, referrals, commissions }) => {
  const [openModal, setOpenModal] = useState(false)
  const [openSubModal, setOpenSubModal] = useState(false)
  return (
    <>
      <section className="grid justify-center items-center sm:my-16 my-8 sm:px-4 xs:px-3 px-1">
        <main className="grid">
          <h1 className="sm:text-4xl text-3xl font-semibold mb-11">
            Affiliate Commissions
          </h1>
          <div className="pt-8 pb-10 sm:px-10 px-5 sm:text-base text-sm bg-white rounded-[5px] grid sm:gap-6 gap-3 max-w-[97vw]">
            <p>
              Get your unique referral link and earn a commission for each order
              your referred clients place with us.
            </p>
            <div className="font-bold">Your link is:</div>
            <div className="sm:flex grid justify-start items-center sm:gap-6 gap-3">
              <input
                type="text"
                readOnly={true}
                className="sm:w-[347px] w-[320px] bg-opacity-25 rounded-[5px] border border-stone-500 text-black py-2 px-4"
                value={'https://Portal.wpsprint.co/ky-2034'}
              />
              <button className="font-semibold btn-hover rounded-[5px] py-2 w-[127px] flex justify-center gap-1 items-center">
                Copy Link <CopyLinkIcon />
              </button>
            </div>
          </div>
          <div className="xl:w-[1000px] lg:w-full w-full bg-white rounded-[5px] px-7 py-2 my-8 overflow-x-scroll">
            <table className="w-full border-separate border-spacing-y-3">
              <tbody>
                <tr className="text-base tracking-tight text-left">
                  <th className="text-center">Visitors</th>
                  <th className="text-center">Sign ups</th>
                  <th className="text-center">Unpaid Earnings</th>
                  <th className="text-center">Total Earnings</th>
                </tr>
                <tr className="text-lg">
                  <td className="text-center">
                    <div className="lg:w-full w-[150px] mx-auto">2</div>
                  </td>
                  <td className="text-center">
                    <div className="lg:w-full w-[150px] mx-auto">-</div>
                  </td>
                  <td className="text-center">
                    <div className="lg:w-full w-[150px] mx-auto">-</div>
                  </td>
                  <td className="text-center">
                    <div className="lg:w-full w-[150px] mx-auto">-</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
        <main className="grid">
          <h2 className="text-2xl font-medium">Referrals</h2>
          <div className="xl:w-[1000px] lg:w-full w-full bg-white rounded-[5px] px-7 py-2 mt-3 mb-8 overflow-x-scroll">
            <table className="w-full border-separate border-spacing-y-3">
              <tbody>
                <tr className="text-base tracking-tight text-left">
                  <th className="text-center">Name</th>
                  <th className="text-center">Total Project</th>
                  <th className="text-center">Total Spend</th>
                </tr>
                <tr className="text-base">
                  <td className="text-center">
                    <div className="lg:w-full w-[150px] mx-auto">
                      Shadin Mahmud
                    </div>
                  </td>
                  <td className="text-center">
                    <div className="lg:w-[180px] w-[150px] mx-auto">25</div>
                  </td>
                  <td className="text-center">
                    <div className="lg:w-[180px] w-[150px] mx-auto">$25000</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
        <main className="grid">
          <h2 className="text-2xl font-medium">Commissions</h2>
          <div className="xl:w-[1000px] lg:w-full w-full bg-white rounded-[5px] px-7 py-2 my-3 overflow-x-scroll">
            <table className="w-full border-separate border-spacing-y-3">
              <tbody>
                <tr className="text-base tracking-tight text-left">
                  <th className="text-center">Project</th>
                  <th className="text-center">Client</th>
                  <th className="text-center">Date</th>
                  <th className="text-center">Total Budget</th>
                  <th className="text-center">Commission</th>
                </tr>
                <tr className="text-base">
                  <td className="text-center">
                    <div className="lg:w-full w-[150px] mx-auto">#Abcd.com</div>
                  </td>
                  <td className="text-center">
                    <div className="lg:w-full w-[150px] mx-auto">
                      Shadin Mahmud
                    </div>
                  </td>
                  <td className="text-center">
                    <div className="lg:w-full w-[150px] mx-auto">
                      03/25/2024
                    </div>
                  </td>
                  <td className="text-center">
                    <div className="lg:w-full w-[150px] mx-auto">$25000</div>
                  </td>
                  <td className="text-center">
                    <div className="lg:w-full w-[150px] mx-auto">$2500</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
        <button
          className="flex btn-hover w-[223px] h-[53px] rounded-[5px] text-base font-semibold gap-2 justify-center items-center my-10"
          onClick={() => setOpenModal(true)}
        >
          Request Withdraw
          <div className="mb-[10px]">
            <RequestWithdrawIcon />
          </div>
        </button>
      </section>
      {openModal && (
        <RequestWithdrawModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          setOpenSubModal={setOpenSubModal}
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

export default MainAffiliatePage
