import { ReactNode } from 'react'
import { PulseLoader } from 'react-spinners'

interface Props {
  isLoading?: boolean
  children?: ReactNode
}

const FormButton = ({ isLoading, children }: Props) => {
  return (
    <button
      className="w-full mb-2 bg-discord-blue-200 p-[0.625em] text-white rounded transition-colors enabled:hover:bg-discord-blue-250"
      type="submit"
      disabled={isLoading}
    >
      {isLoading ? <PulseLoader color="white" size={5} /> : children}
    </button>
  )
}

export default FormButton
