'use client'

import ThanksInvoicePaymentPaid from '@/components/modals/invoicesModals/ThanksInvoicePaymentPaid'
import { useState } from 'react'

const MainInvoicePage = ({ invoices }) => {
  const [openModal, setOpenModal] = useState(false)

  return (
    <>
      <div className="sm:px-4 xs:px-3 px-1">
        <div className="sm:flex grid justify-between items-center sm:gap-[none] gap-5">
          <h2 className="text-2xl font-semibold">All Invoice</h2>
          {/* <div className="flex md:gap-9 gap-3 sm:">
            <div className="flex sm:px-4 px-1 py-[7px] bg-white rounded-xl justify-start items-center sm:gap-4 gap-1">
              <SearchByIdIcon />
              <input
                type="text"
                className="outline-none sm:w-full w-[150px]"
                placeholder="Search by name, ID"
              />
            </div>
            <div className="relative w-[185px]" ref={dropRef}>
              <div className="bg-white py-1 px-3 bg-opacity-40 rounded-[5px] absolute text-base backdrop-blur-[40px]">
                <button
                  className="flex justify-center items-center h-[30px] gap-2"
                  onClick={(e) => {
                    e.preventDefault()
                    setDropOpen((prev) => !prev)
                  }}
                >
                  Filter by status <FilterByIdIcon />
                </button>
                <div
                  className={`grid justify-normal items-center gap-3 overflow-hidden font-semibold ${
                    dropOpen ? 'h-full mt-2' : 'h-0'
                  }`}
                >
                  {filterByStatusData?.map((item, i) => (
                    <div
                      className="border-t pt-3 border-zinc-400 text-center"
                      key={i}
                    >
                      <button className=" hover:text-blue-600">
                        {item?.title}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
      <div className="lg:w-full w-screen bg-white rounded-[20.37px] px-7 py-8 sm:my-14 my-10 overflow-x-scroll">
        <table className="w-full ">
          <tbody>
            <tr className="text-zinc-700 text-xl font-semibold tracking-tight text-left">
              <th>ID</th>
              <th className="text-center">Name</th>
              <th className="text-center">Amount</th>
              <th className="text-center">Action</th>
            </tr>

            {invoices?.map((item, i) => (
              <tr
                key={i}
                className="text-zinc-700 sm:text-xl text-lg font-normal"
              >
                <td className="lg:py-7 py-4">
                  <div className="text-zinc-700 lg:text-xl text-[16px] font-normal flex justify-start items-center gap-3 md:w-full w-[80px]">
                    #{item?.id}
                  </div>
                </td>
                <td className="lg:py-7 py-4 2xl:w-[350px] w-[300px]">
                  <div className="text-zinc-700 lg:text-xl text-[16px] font-normal flex justify-start items-center gap-3 lg:w-full w-[270px]">
                    {item?.name}
                  </div>
                </td>
                <td className="lg:py-7 py-4 text-center">
                  <div className="mx-auto font-bold w-[100px]">
                    {item?.amount}
                  </div>
                </td>
                <td className="lg:py-7 py-4 text-center">
                  <button
                    className="sm:w-44 w-36 h-[34px] btn-hover rounded-[10px] text-center mx-auto"
                    onClick={(e) => {
                      e.preventDefault()
                      //   router.push(`/dashboard/invoices/${item?.id}`)
                      setOpenModal(true)
                    }}
                  >
                    Open Invoice
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {openModal && <ThanksInvoicePaymentPaid setOpenModal={setOpenModal} />}
    </>
  )
}

export default MainInvoicePage
