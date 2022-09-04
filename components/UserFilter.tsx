import { ChangeEvent } from 'react'
import { BiSearch } from 'react-icons/bi'
import { VscChromeClose } from 'react-icons/vsc'

interface Props {
  value: string
  setValue: (value: string) => void
}

const UserFilter = ({ value, setValue }: Props) => {
  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setValue(ev.target.value)
  }

  const clearValue = () => {
    setValue('')
  }

  return (
    <div className="mx-3 mb-5 flex bg-black bg-opacity-40 rounded">
      <input
        className="flex-1 px-2 py-1  outline-none bg-transparent text-discord-gray-10"
        type="text"
        placeholder="Search"
        onChange={handleChange}
        value={value}
      />
      <div className="flex items-center justify-center w-8">
        {value ? (
          <VscChromeClose
            className="w-5 h-5 text-discord-gray-10 cursor-pointer"
            aria-label="Clear"
            onClick={clearValue}
          />
        ) : (
          <BiSearch
            className="w-5 h-5 text-discord-gray-10"
            aria-label="Magnifying Glass"
          />
        )}
      </div>
    </div>
  )
}

export default UserFilter
