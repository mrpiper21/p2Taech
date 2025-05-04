// components/FormInput.tsx
import { ChangeEvent } from 'react';
import { appTheme } from '../../constant/theme';

interface FormInputProps {
	type: string;
	name: string;
	value: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	label: string;
	error?: string;
	placeholder?: string;
	theme: "light" | "dark";
}

export const FormInput = ({
	type,
	name,
	value,
	onChange,
	label,
	error,
	placeholder = "",
	theme,
}: FormInputProps) => (
	<div>
		<label
			className="block text-sm font-medium mb-2"
			style={{
				color:
					theme === "light" ? appTheme.text.primary : appTheme.text.inverted,
			}}
		>
			{label}
		</label>
		<input
			type={type}
			name={name}
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			className="w-full p-3 rounded border"
			style={{
				borderColor: error
					? appTheme[theme].status.error
					: appTheme[theme].neutral[200],
				backgroundColor: appTheme[theme].surface.secondary,
				color:
					theme === "light" ? appTheme.text.primary : appTheme.text.inverted,
			}}
		/>
		{error && (
			<span
				className="text-xs mt-1 block"
				style={{ color: appTheme[theme].status.error }}
			>
				{error}
			</span>
		)}
	</div>
);