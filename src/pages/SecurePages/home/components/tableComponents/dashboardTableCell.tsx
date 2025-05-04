import { ReactNode } from "react"

interface Props {
    children: ReactNode,
    className?: string
}

const DashboardTableCell = ({ children, className }: Props) => {
  return (
    <td className={`p-3 md:p-4 text-sm md:text-base ${className}`}>{children}</td>
  )
}

export default DashboardTableCell