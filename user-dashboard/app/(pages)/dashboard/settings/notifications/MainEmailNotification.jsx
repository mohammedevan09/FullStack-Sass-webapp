'use client'

const MainEmailNotification = ({ emailNotifications }) => {
  return (
    <div className="grid justify-start items-center p-10 bg-white gap-7">
      {emailNotifications?.map((item, i) => (
        <div key={i} className="flex gap-3 items-center">
          <div className="h-4">
            <div class="inline-flex items-center bg-gray-300 rounded-full">
              <div class="relative inline-block w-8 h-4 rounded-full cursor-pointer">
                <input
                  defaultChecked={item?.isOn}
                  id={item?.title}
                  type="checkbox"
                  class="absolute w-8 h-4 transition-colors duration-300 rounded-full appearance-none cursor-pointer peer bg-blue-gray-100 checked:bg-blue-500 peer-checked:border-blue-500 peer-checked:before:bg-blue-500"
                />
                <label
                  htmlFor={item?.title}
                  class="before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-blue-gray-100 bg-white shadow-md transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-blue-500 peer-checked:before:bg-blue-500"
                >
                  <div
                    class="inline-block p-5 rounded-full top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
                    data-ripple-dark="true"
                  ></div>
                </label>
              </div>
            </div>
          </div>
          <div className="text-slate-900 text-sm font-normal leading-tight">
            {item?.title}
          </div>
        </div>
      ))}
      <div className="w-full my-2">
        <button className="w-full text-center text-white text-base font-semibold bg-blue-800 py-2 rounded-lg leading-7 hover:bg-white border-2 border-blue-800 hover:text-blue-800 transition-1">
          Save
        </button>
      </div>
    </div>
  )
}

export default MainEmailNotification
