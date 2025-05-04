import  { ReactNode } from 'react'
import { appTheme } from '../../../../../constant/theme'

interface Props {
    theme: "light" | "dark",
    className?: string,
    children: ReactNode
}

const DashboardTableHeader = ({ children, className, theme }: Props) => (
    <th
		className={`p-3 md:p-4 text-left text-sm ${className}`}
		style={{ borderBottom: `1px solid ${appTheme[theme].neutral[200]}` }}
	>
		{children}
	</th>
)

export default DashboardTableHeader