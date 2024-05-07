'use client'

import { formatChatDateAndTime } from '@/utils/formateDateAndTime'
import { useState } from 'react'
import {
  useCalendlyEventListener,
  PopupModal,
  InlineWidget,
} from 'react-calendly'
import { useSelector } from 'react-redux'

const MeetingCalendly = () => {
  const [openMeeting, setOpenMeeting] = useState(false)

  const { userInfo } = useSelector((state) => state?.user)

  const pageSettings = {
    backgroundColor: 'ffffff',
    hideEventTypeDetails: false,
    hideLandingPageDetails: false,
    primaryColor: 'red',
    textColor: 'blue',
  }

  const prefill = {
    email: userInfo?.email,
    name: userInfo?.fullName,
    smsReminderNumber: userInfo?.number,
  }

  useCalendlyEventListener({
    onProfilePageViewed: () => console.log('onProfilePageViewed'),
    onDateAndTimeSelected: () => console.log('onDateAndTimeSelected'),
    onEventTypeViewed: () => console.log('onEventTypeViewed'),
    onEventScheduled: (e) => console.log(e.data.payload),
  })

  return (
    <div>
      <button
        className="bg-blue-800 text-white font-semibold py-2 px-7 rounded-md text-xl hover:scale-105 transition mt-8"
        onClick={() => setOpenMeeting(true)}
      >
        Custom Button
      </button>
      <PopupModal
        url="https://calendly.com/mohammedevan07"
        pageSettings={pageSettings}
        //  utm={this.props.utm}
        prefill={prefill}
        onModalClose={() => setOpenMeeting(false)}
        open={openMeeting}
        rootElement={document.getElementById('root')}
      />
      <div id="root"></div>
    </div>
  )
}

// {
//     "event": {
//         "uri": "https://api.calendly.com/scheduled_events/3b3b3d41-35d6-44b9-b5f4-616fed8a180a"
//     },
//     "invitee": {
//         "uri": "https://api.calendly.com/scheduled_events/3b3b3d41-35d6-44b9-b5f4-616fed8a180a/invitees/2bffa73e-e924-43a5-8a58-4df525b7f60d"
//     }
// }

export default MeetingCalendly
