import { ReactNode } from 'react'

interface Props {
  children?: ReactNode
  onClick?: () => any
  isDark?: boolean
}

const HomePageButton = ({ children, onClick, isDark }: Props) => {
  const colors = isDark
    ? 'text-white bg-discord-gray-560  hover:bg-discord-gray-500 hover:shadow-2xl z-10'
    : 'text-discord-gray-560 bg-white  hover:text-discord-blue-200 hover:shadow-2xl'

  return (
    <button
      className={`flex items-center gap-3 text-xl rounded-full py-4 px-16 transition-all ${colors}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default HomePageButton
