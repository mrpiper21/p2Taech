import { appTheme } from "../../../../../constant/theme";

interface Props {
    status: string,
    theme: "light" | "dark"
}

const StatusBadge = ({ status, theme }:Props) => (
	<span
		className="px-2 py-1 rounded-full text-xs md:text-sm"
		style={{
			backgroundColor:
				status === "Completed" || status === "Active"
					? appTheme[theme].status.success + "20"
					: appTheme[theme].status.warning + "20",
			color:
				status === "Completed" || status === "Active"
					? appTheme[theme].status.success
					: appTheme[theme].status.warning,
		}}
	>
		{status}
	</span>
);

export default StatusBadge