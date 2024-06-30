'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { formatDateTwo } from '@/utils/formateDateAndTime'
import OrderBasicInfo from '../../orders/_components/OrderBasicInfo'
import { getColorClass, makeCapitalize } from '@/utils/StatusColor'
import { ErrorIcon, SpentHoursIcon } from '@/staticData/Icon'
import BackButton from '@/components/others/BackButton'

const MainSingleInvoicePage = ({ invoice, searchParams, params }) => {
  const contentRef = useRef(null)

  const downloadPdf = () => {
    const input = contentRef.current
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/pdf')
      const pdf = new jsPDF()
      const imgHeight = (canvas.height * 208) / canvas.width
      pdf.addImage(imgData, 'PDF', 0, 0, 208, imgHeight)

      pdf.save('invoice.pdf')
    })
  }

  return (
    <div className="max-w-[900px] mx-auto">
      <BackButton link={'/invoice'} title={'Go back'} />
      <div className="md:flex grid md:justify-between items-end gap-6 mb-6">
        {invoice?.serviceId?._id ? (
          <OrderBasicInfo order={invoice} service={invoice?.serviceId} />
        ) : (
          <div className="grid gap-3 svg-shadow bg-white md:w-[500px] w-full rounded-2xl p-5 relative overflow-hidden font-medium">
            <h1 className="text-xl font-semibold max-w-[310px]">
              {invoice?.title}
            </h1>
            <div className="grid gap-3 text-sm">
              <h6>
                <b>Proposal ID</b> - #{invoice?._id}
              </h6>
              <div className="flex items-center gap-2">
                <h6>
                  <b>Total Amount</b> - ${invoice?.totalAmount}
                </h6>
                |
                <h6 className="flex gap-1 items-center">
                  <b>Timeline</b>- {invoice?.timeline} Days{' '}
                  <SpentHoursIcon size={'1.4rem'} />
                </h6>
              </div>
            </div>
            <div
              className={`w-[160px] h-[34px] mx-auto bg-opacity-20 absolute rotate-45 top-5 -right-10 flex justify-center items-center 
          ${getColorClass(invoice?.status)}
          `}
            >
              {makeCapitalize(invoice?.status)}
            </div>
          </div>
        )}
        <div className="flex justify-start items-end gap-3 mt-4">
          <button
            onClick={downloadPdf}
            className="py-2 px-4 text-lg font-semibold rounded-lg text-blue-800 border-blue-800 border hover:scale-105 transition"
          >
            Download PDF
          </button>
        </div>
      </div>
      {invoice?.payment_status !== 'paid' && (
        <div className="bg-rose-400 bg-opacity-20 py-2 px-3 flex justify-between gap-4 rounded-lg font-medium text-sm my-5">
          <div className="flex items-center gap-1">
            <ErrorIcon color={'red'} /> Wait for your client to pay!
          </div>
        </div>
      )}
      <div className="grid bg-white rounded-none gap-5 font-medium overflow-x-scroll mx-auto">
        <div className="p-8">
          <div className="flex justify-between items-start">
            <div className="w-32">
              <Image
                src={'/images/wpsprint.png'}
                width={140}
                height={140}
                className="object-contain h-auto"
                alt="logo"
              />
            </div>
            <div className="grid gap-3 text-right w-full justify-end">
              <h1 className="font-bold text-3xl">INVOICE</h1>
              <h3 className="font-semibold text-lg">WP SPRINT LLC</h3>
              <h4>REG: 2023-001335076</h4>
              <div className="flex gap-2 justify-end">
                <Link href={'mailto:shadin@wpsprint.co'}>
                  Shadin@wpsprint.co
                </Link>{' '}
                |<Link href={'tel:+13072262866'}> +13072262866</Link>
              </div>
              <p>30 N Gloud ST, STE R Sheridan, Wyoming 82801</p>
            </div>
          </div>
          <div className="grid gap-2 font-semibold mt-6">
            <h2 className="text-xl">Billed To</h2>
            <h4>{invoice?.userId?.fullName}</h4>
            <h4>
              {invoice?.userId?.email} | {invoice?.userId?.number}
            </h4>
          </div>
          <div className="grid gap-2 mt-10 mb-3">
            <h6>
              <b>INVOICE ID</b> - INV-{invoice?._id}
            </h6>
            <h6>
              <b>INVOICE DATE</b> -{' '}
              {invoice?.startTime
                ? formatDateTwo(invoice.startTime)
                : formatDateTwo(invoice?.createdAt)}
            </h6>
          </div>
          <div className="w-full bg-white rounded-sm border-b border-zinc-600 mt-8">
            <table className="w-full">
              <thead>
                <tr className="bg-blue-600 text-white text-lg font-semibold tracking-tight text-left">
                  <th className="px-3 pt-2">Name</th>
                  <th className="text-center pt-2">Qty</th>
                  <th className="text-center pt-2">Price</th>
                  <th className="text-right px-3 pt-2">Amount</th>
                </tr>
              </thead>
              <tbody className="text-sm font-semibold text-zinc-600">
                <tr>
                  <td className="py-4 min-w-[120px] px-3">
                    <div className="flex justify-start items-center gap-3 min-w-[120px] truncate">
                      {makeCapitalize(invoice?.title)}
                    </div>
                  </td>
                  <td className="py-4 text-center px-8">1</td>
                  <td className="py-4 text-center">
                    <div className={`mx-auto tracking-wider`}>
                      ${invoice?.totalAmount}
                    </div>
                  </td>
                  <td className="py-4 text-right px-3">
                    <div className={`mx-auto tracking-wider`}>
                      ${invoice?.totalAmount}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="grid gap-3 py-2 px-3 text-base border-b border-zinc-600">
            <div className="flex justify-between w-full items-center">
              <b>Total - </b> <p>${invoice?.totalAmount}</p>
            </div>
            <div className="flex justify-between w-full items-center">
              <b>Due - </b>{' '}
              <p>
                ${invoice?.payment_status !== 'paid' ? invoice?.totalAmount : 0}
              </p>
            </div>
          </div>
        </div>
        <div className="grid bg-blue-600 text-white p-8 text-center items-center mt-4">
          <h1 className="text-2xl font-bold tracking-wider">
            PAYMENT INSTRUCTIONS
          </h1>

          <h3 className="text-xl py-3">
            We accept payment from Debit/Credit Card, Stripe.
          </h3>
          <hr />
          <p className="my-3">
            <Link href={'https://wpsprint.co/terms-conditions'}>
              Teams & Conditions
            </Link>{' '}
            |{' '}
            <Link href={'https://wpsprint.co/refund-policy'}>
              Refund Policy
            </Link>
          </p>
          <p>
            For any questions please contact us at{' '}
            <Link href={'mailto:shadin@wpsprint.co'}>Shadin@wpsprint.co</Link>
          </p>
        </div>
      </div>

      {/* Main download pdf */}

      <div className="relative left-[5000px]">
        <div
          className="grid bg-white rounded-none gap-5 font-medium overflow-x-scroll mx-auto"
          ref={contentRef}
        >
          <div className="p-8">
            <div className="flex justify-between items-start">
              <div className="w-32">
                <Image
                  src={'/images/wpsprint.png'}
                  width={140}
                  height={140}
                  className="object-contain h-auto"
                  alt="logo"
                />
              </div>
              <div className="grid gap-3 text-right w-full justify-end">
                <h1 className="font-bold text-3xl">INVOICE</h1>
                <h3 className="font-semibold text-lg">WP SPRINT LLC</h3>
                <h4>REG: 2023-001335076</h4>
                <div className="flex gap-2 justify-end">
                  <Link href={'mailto:shadin@wpsprint.co'}>
                    Shadin@wpsprint.co
                  </Link>{' '}
                  |<Link href={'tel:+13072262866'}> +13072262866</Link>
                </div>
                <p>30 N Gloud ST, STE R Sheridan, Wyoming 82801</p>
              </div>
            </div>
            <div className="grid gap-2 font-semibold mt-6">
              <h2 className="text-xl">Billed To</h2>
              <h4>{invoice?.userId?.fullName}</h4>
              <h4>
                {invoice?.userId?.email} | {invoice?.userId?.number}
              </h4>
            </div>
            <div className="grid gap-2 mt-10 mb-3">
              <h6>
                <b>INVOICE ID</b> - INV-{invoice?._id}
              </h6>
              <h6>
                <b>INVOICE DATE</b> -{' '}
                {invoice?.startTime
                  ? formatDateTwo(invoice.startTime)
                  : formatDateTwo(invoice?.createdAt)}
              </h6>
            </div>
            <div className="w-full bg-white rounded-sm border-b border-zinc-600 mt-8">
              <table className="w-full">
                <thead>
                  <tr className="bg-blue-600 text-white text-lg font-semibold tracking-tight text-left">
                    <th className="px-3 pt-2">Name</th>
                    <th className="text-center pt-2">Qty</th>
                    <th className="text-center pt-2">Price</th>
                    <th className="text-right px-3 pt-2">Amount</th>
                  </tr>
                </thead>
                <tbody className="text-sm font-semibold text-zinc-600">
                  <tr>
                    <td className="py-4 min-w-[120px] px-3">
                      <div className="flex justify-start items-center gap-3 min-w-[120px] truncate">
                        {makeCapitalize(invoice?.title)}
                      </div>
                    </td>
                    <td className="py-4 text-center px-8">1</td>
                    <td className="py-4 text-center">
                      <div className={`mx-auto tracking-wider`}>
                        ${invoice?.totalAmount}
                      </div>
                    </td>
                    <td className="py-4 text-right px-3">
                      <div className={`mx-auto tracking-wider`}>
                        ${invoice?.totalAmount}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="grid gap-3 py-2 px-3 text-base border-b border-zinc-600">
              <div className="flex justify-between w-full items-center">
                <b>Total - </b> <p>${invoice?.totalAmount}</p>
              </div>
              {invoice?.payment_status !== 'paid' && (
                <div className="flex justify-between w-full items-center">
                  <b>Due - </b> <p>${invoice?.totalAmount}</p>
                </div>
              )}
            </div>
          </div>
          <div className="grid bg-blue-600 text-white p-8 text-center items-center mt-4">
            <h1 className="text-2xl font-bold tracking-wider">
              PAYMENT INSTRUCTIONS
            </h1>

            <h3 className="text-xl py-3">
              We accept payment from Debit/Credit Card, Stripe.
            </h3>
            <hr />
            <p className="my-3">
              <Link href={'https://wpsprint.co/terms-conditions'}>
                Teams & Conditions
              </Link>{' '}
              |{' '}
              <Link href={'https://wpsprint.co/refund-policy'}>
                Refund Policy
              </Link>
            </p>
            <p>
              For any questions please contact us at{' '}
              <Link href={'mailto:shadin@wpsprint.co'}>Shadin@wpsprint.co</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainSingleInvoicePage
