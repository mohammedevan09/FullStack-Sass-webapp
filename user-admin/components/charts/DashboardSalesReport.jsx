'use client'

import { ExportIcon } from '@/staticData/Icon'
import { ResponsiveLine } from '@nivo/line'
import { useState } from 'react'

const DashboardSalesReport = ({ data }) => {
  const [active, setActive] = useState(0)

  const filter = [
    {
      title: '12 Months',
    },
    {
      title: '6 Months',
    },
    {
      title: '30 Days',
    },
  ]
  return (
    <div className="lg:w-full w-[1200px] h-[500px] bg-white rounded-[20.37px] px-7 py-8 grid">
      <div className="flex justify-between items-center">
        <h2 className="text-zinc-900 text-base font-bold">Sales Report</h2>
        <div className="flex gap-5">
          {filter?.map((item, i) => (
            <button
              key={i}
              className={`px-4 py-2 font-bold text-[12px] text-zinc-900 rounded-[5px] ${
                active === i ? 'border border-zinc-400' : ''
              }`}
              onClick={() => setActive(i)}
            >
              {item?.title}
            </button>
          ))}
        </div>
        <button className="px-4 py-2 font-bold text-[12px] text-zinc-900 rounded-[5px] border border-zinc-400 flex gap-1">
          <ExportIcon /> Export PDF
        </button>
      </div>
      <ResponsiveLine
        data={data}
        colors={{ datum: 'color' }}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
          stacked: false,
          reverse: false,
        }}
        yFormat=" >-.2f"
        curve="monotoneX"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 4,
          tickRotation: 0,
          legend: 'Months',
          legendOffset: 44,
          legendPosition: 'middle',
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 4,
          tickRotation: 0,
          legend: 'Sales',
          legendOffset: -53,
          legendPosition: 'middle',
        }}
        lineWidth={3}
        pointSize={5}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={5}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        enableArea={true}
        theme={{
          axis: {
            ticks: {
              text: {
                fontSize: 12,
                fill: 'black',
                fontWeight: 'Bold',
              },
            },
            legend: {
              text: {
                fontSize: 12,
                outlineWidth: 6,
                fontWeight: 'Bold',
              },
            },
          },
          grid: {
            line: {
              strokeWidth: 0,
            },
          },
          legends: {
            text: {
              fontSize: 14,
              fontWeight: '600',
            },
          },
        }}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 120,
            translateY: 10,
            itemsSpacing: 10,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 1,
            symbolSize: 13,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
          },
        ]}
      />
    </div>
  )
}

export default DashboardSalesReport
