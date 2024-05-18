'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

const MainSingleInvoicePage = () => {
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
      <div className="flex justify-start items-center gap-3 mb-8 mt-4">
        <button
          onClick={downloadPdf}
          className="py-2 px-4 text-lg font-semibold rounded-lg text-blue-800 border-blue-800 border hover:scale-105 transition"
        >
          Download PDF
        </button>
        <Link href={'/'}>
          <div className="py-2 px-4 text-lg font-semibold rounded-lg bg-blue-800 text-white hover:scale-105 transition">
            Pay Now
          </div>
        </Link>
      </div>
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
            <h4>Neat bla bla</h4>
            <h4>blablabla@gmail.com | +32141234312</h4>
          </div>
          <div className="grid gap-2 mt-10 mb-3">
            <h6>
              <b>INVOICE NUMBER</b> - INV-242312
            </h6>
            <h6>
              <b>INVOICE DATE</b> - 07 FEB 2321
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
                {/* {members?.map((item, i) => {
                  return ( */}
                <tr>
                  <td className="py-4 min-w-[120px] px-3">
                    <div className="flex justify-start items-center gap-3 min-w-[120px]">
                      Bla Bla Bla bla
                    </div>
                  </td>
                  <td className="py-4 text-center px-8">1</td>
                  <td className="py-4 text-center">
                    <div className={`mx-auto tracking-wider`}>$3121</div>
                  </td>
                  <td className="py-4 text-right px-3">
                    <div className={`mx-auto tracking-wider`}>$3121</div>
                  </td>
                </tr>
                {/* )
                })} */}
              </tbody>
            </table>
          </div>
          <div className="grid gap-3 py-2 px-3 text-base border-b border-zinc-600">
            <div className="flex justify-between w-full items-center">
              <b>Total - </b> <p>$1343</p>
            </div>
            <div className="flex justify-between w-full items-center">
              <b>Due - </b> <p>$1343</p>
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
          className="grid bg-white rounded-none gap-5 font-medium overflow-x-scroll mx-auto w-[900px]"
          ref={contentRef}
        >
          <div className="p-8 mt-24">
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
              <h4>Neat bla bla</h4>
              <h4>blablabla@gmail.com | +32141234312</h4>
            </div>
            <div className="grid gap-2 mt-10 mb-3">
              <h6>
                <b>INVOICE NUMBER</b> - INV-242312
              </h6>
              <h6>
                <b>INVOICE DATE</b> - 07 FEB 2321
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
                  {/* {members?.map((item, i) => {
                  return ( */}
                  <tr>
                    <td className="py-4 min-w-[120px] px-3">
                      <div className="flex justify-start items-center gap-3 min-w-[120px]">
                        Bla Bla Bla bla
                      </div>
                    </td>
                    <td className="py-4 text-center px-8">1</td>
                    <td className="py-4 text-center">
                      <div className={`mx-auto tracking-wider`}>$3121</div>
                    </td>
                    <td className="py-4 text-right px-3">
                      <div className={`mx-auto tracking-wider`}>$3121</div>
                    </td>
                  </tr>
                  {/* )
                })} */}
                </tbody>
              </table>
            </div>
            <div className="grid gap-3 py-2 px-3 text-base border-b border-zinc-600">
              <div className="flex justify-between w-full items-center">
                <b>Total - </b> <p>$1343</p>
              </div>
              <div className="flex justify-between w-full items-center">
                <b>Due - </b> <p>$1343</p>
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
      </div>
    </div>
  )
}

export default MainSingleInvoicePage
