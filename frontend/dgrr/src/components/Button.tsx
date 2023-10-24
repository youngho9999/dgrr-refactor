type ButtonProps = {
  value: string
}

export const Button = ({ value }: ButtonProps) => {
  return (
    <div className="bg-gradient-to-b from-start-yellow to-end-yellow rounded-lg shadow-inner border-2 border-zinc-800 max-w-xs py-5 cursor-pointer hover:brightness-110">
      <p className="text-center text-zinc-800 text-base font-bold uppercase leading-none">{value}</p>
    </div>
  )
}