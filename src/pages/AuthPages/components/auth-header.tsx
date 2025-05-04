// components/AuthHeader.tsx

import { appTheme } from "../../../constant/theme";

interface AuthHeaderProps {
	title: string;
	subtitle: string;
	theme: "light" | "dark";
}

export const AuthHeader = ({ title, subtitle, theme }: AuthHeaderProps) => (
	<div
		style={{
			color: theme === "light" ? appTheme.text.primary : appTheme.text.inverted,
		}}
		className="text-center"
	>
		<h2 className="text-2xl font-bold">{title}</h2>
		<p className="mt-2 text-sm">{subtitle}</p>
	</div>
);