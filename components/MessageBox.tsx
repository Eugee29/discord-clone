interface Props {
  placeholder: string
}

const MessageBox = ({ placeholder }: Props) => {
  return (
    <form className="bg-discord-gray-200 rounded-lg">
      <div
        role="textbox"
        data-placeholder={`Message ${placeholder}`}
        className="bg-transparent mb-0 px-4 py-[10px]
          resize-none outline-none text-discord-gray-10 
          empty:before:content-[attr(data-placeholder)] before:text-discord-gray-60 before:font-light
          break-all"
        contentEditable="true"
      />
    </form>
  )
}

export default MessageBox
