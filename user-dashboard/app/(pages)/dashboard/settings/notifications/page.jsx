import MainEmailNotification from './MainEmailNotification'

const page = () => {
  const emailNotifications = [
    {
      title: 'Send me  new message notification to my email',
      isOn: true,
    },
    {
      title: 'Send me project status update notification to my email',
      isOn: false,
    },
    {
      title: 'Send me ticket status update notification to my email',
      isOn: true,
    },
    {
      title: 'Send me  new proposals & invoice notification to my email',
      isOn: false,
    },
    {
      title:
        'Send me  subscription renew & due payment notification to my email',
      isOn: true,
    },
    {
      title: 'Send me  meeting notification to my email',
      isOn: false,
    },
  ]
  return (
    <div className="w-full grid items-center sm:my-20 xs:my-10 my-5 sm:px-4 xs:px-3 px-1">
      <h2 className="text-black text-lg font-medium leading-relaxed sm:mb-7 mb-4">
        Email Notifications
      </h2>
      <MainEmailNotification emailNotifications={emailNotifications} />
    </div>
  )
}

export default page
