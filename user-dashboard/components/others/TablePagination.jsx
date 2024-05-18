'use client'

import { CloseMenuIcon } from '@/staticData/Icon'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import ResponsivePagination from 'react-responsive-pagination'

const TablePagination = ({ pageCount, limit }) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const params = new URLSearchParams(searchParams)

  const totalPages = Math.ceil(pageCount / 10)

  function handlePageChange(page) {
    if (page) {
      params.set('page', page)
    } else {
      params.delete('page')
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="flex justify-between items-center lg:px-10 sm:px-8 px-5 pt-1">
      <div className="font-medium">
        {/* Showing {totalPages} Per Pages of {pageCount} Item */}
      </div>

      <div className="max-w-[360px]">
        <ResponsivePagination
          previousLabel={<CloseMenuIcon color={'#022493'} size={'16'} />}
          nextLabel={
            <div className="rotate-[180deg]">
              <CloseMenuIcon color={'#022493'} size={'16'} />
            </div>
          }
          total={totalPages}
          current={Number(searchParams.get('page')) || 1}
          onPageChange={(page) => handlePageChange(page)}
        />
      </div>
    </div>
  )
}

export default TablePagination
