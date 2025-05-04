// components/RememberMe.tsx
import React from "react";
import { appTheme } from "../../constant/theme";

interface Props {
	theme: "light" | "dark";
}

export const RememberMe: React.FC<Props> = ({ theme }) => (
	<div className="flex items-center">
		<input
			id="remember-me"
			name="remember-me"
			type="checkbox"
			className="h-4 w-4 rounded"
			style={{
				borderColor: appTheme[theme].neutral[500],
				backgroundColor: appTheme[theme].surface.primary,
			}}
		/>
		<label
			htmlFor="remember-me"
			className="ml-2 block text-sm"
			style={{ color: appTheme.text.secondary }}
		>
			Remember me
		</label>
	</div>
);