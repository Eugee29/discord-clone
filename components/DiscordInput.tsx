interface Props {
  label?: string
  type?: string
  name?: string
  autoComplete?: string
  value?: string | number | readonly string[] | undefined
  error?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const LabeledInput = ({
  label,
  type,
  name,
  autoComplete,
  value,
  error,
  onChange,
}: Props) => {
  return (
    <label className="flex flex-col gap-2">
      <h1
        className={`text-xs uppercase font-ginto ${
          error ? 'text-discord-red-100' : 'text-discord-gray-20'
        }`}
      >
        {label}{' '}
        {!!error && <span className="normal-case italic">- {error}</span>}
      </h1>
      <input
        className="p-[10px] rounded bg-black bg-opacity-40 text-discord-gray-10 h-10 outline-none font-whitney font-light"
        type={type}
        name={name}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
      />
    </label>
  )
}

export default LabeledInput
