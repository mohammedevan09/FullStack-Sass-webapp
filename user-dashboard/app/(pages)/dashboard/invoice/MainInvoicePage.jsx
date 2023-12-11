'use client'

import ThanksInvoicePaymentPaid from '@/components/modals/invoicesModals/ThanksInvoicePaymentPaid'
import { FilterByIdIcon, SearchByIdIcon } from '@/staticData/Icon'
import { useState } from 'react'

const MainInvoicePage = ({ invoices }) => {
  const [openModal, setOpenModal] = useState(false)
  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">All Invoice</h2>
        <div className="flex gap-9">
          <div className="flex px-4 py-[7px] bg-white rounded-xl justify-start items-center gap-4">
            <SearchByIdIcon />
            <input
              type="text"
              className="outline-none"
              placeholder="Search by name, ID"
            />
          </div>
          <div className="w-[185px] h-[37px] bg-white bg-opacity-25 rounded-[5px] flex justify-center items-center gap-2">
            Filter by status <FilterByIdIcon />
          </div>
        </div>
      </div>
      <div className="w-full bg-white rounded-[20.37px] px-7 py-8 my-14">
        <table className="w-full ">
          <tbody>
            <tr className="text-zinc-700 text-xl font-semibold tracking-tight text-left">
              <th>ID</th>
              <th className="text-center">Name</th>
              <th className="text-center">Amount</th>
              <th className="text-center">Action</th>
            </tr>

            {invoices?.map((item, i) => (
              <tr key={i} className="text-zinc-700 text-xl font-normal">
                <td className="py-7">
                  <div className="">#{item?.id}</div>
                </td>
                <td className="py-7 text-center">
                  <div className="mx-auto">{item?.name}</div>
                </td>
                <td className="py-7 text-center">
                  <div className="mx-auto font-bold">{item?.amount}</div>
                </td>
                <td className="py-7 text-center">
                  <button
                    className="w-44 h-[34px] bg-blue-800 rounded-[10px] text-white text-center mx-auto"
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
