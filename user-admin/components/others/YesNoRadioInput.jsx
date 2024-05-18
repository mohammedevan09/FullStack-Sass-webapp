import Labels from './Labels'

const YesNoRadioInput = ({ radioFor, yesClick, noClick, name }) => {
  return (
    <div className="grid justify-start">
      <Labels name={name} />
      <div className="flex gap-7">
        <div className="flex gap-2 items-center">
          <input
            type="radio"
            id={`yes-${radioFor}`}
            name={radioFor}
            value={`yes-${radioFor}`}
            className="w-5 h-5"
            onClick={yesClick}
          />
          <label htmlFor={`yes-${radioFor}`}>Yes</label>
        </div>
        <div className="flex gap-2 items-center">
          <input
            type="radio"
            id={`no-${radioFor}`}
            name={radioFor}
            value={`no-${radioFor}`}
            className="w-5 h-5"
            onClick={noClick}
          />
          <label htmlFor={`no-${radioFor}`}>No</label>
        </div>
      </div>
    </div>
  )
}

export default YesNoRadioInput
