/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import * as yup from 'yup'

interface Props {
  placeholder: string
  onSendMessage: (messageText: string) => void
}

const MessageBox = ({ placeholder, onSendMessage }: Props) => {
  const messageRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    messageRef.current?.focus()
  }, [router])

  const formik = useFormik({
    initialErrors: {},
    initialValues: {
      messageText: '',
    },
    validationSchema: yup.object().shape({
      messageText: yup.string().required(),
    }),

    onSubmit: (values) => {
      onSendMessage(values.messageText)
      messageRef.current!.innerText = ''
    },
  })

  return (
    <form
      className="bg-discord-gray-200 rounded-lg ml-4 mb-4 mr-4 "
      onSubmit={formik.handleSubmit}
      onKeyDown={(ev) => {
        if (ev.key === 'Enter' && !ev.shiftKey) {
          ev.preventDefault()
          formik.handleSubmit()
        }
      }}
    >
      <div
        ref={messageRef}
        role="textbox"
        data-placeholder={`Message ${placeholder}`}
        className="bg-transparent mb-0 px-4 py-[10px] 
          resize-none outline-none text-discord-gray-10 
          empty:before:content-[attr(data-placeholder)] before:text-discord-gray-60 before:font-light
          break-all cursor-text"
        contentEditable="true"
        onInput={() => {
          formik.values.messageText = messageRef.current!.innerText
        }}
      />
    </form>
  )
}

export default MessageBox
