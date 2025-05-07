import { appTheme } from "../../../constant/theme";
import { motion, Variants } from "framer-motion";
import useAppStore from "../../../store/useAppStore";

interface AuthButtonProps {
	type: "submit" | "button";
	disabled?: boolean;
	isLoading?: boolean;
	label?: string;
	onClick?: () => void;
}

export const AuthButton = ({
	type,
	disabled = false,
	isLoading = false,
	label,
	onClick,
}: AuthButtonProps) => {
	const { theme } = useAppStore(["theme"]);
	const dotVariants: Variants = {
		initial: { y: 0 },
		animate: (i: number) => ({
			y: [-3, 3, -3],
			transition: {
				repeat: Infinity,
				repeatType: "reverse" as const,
				duration: 0.8,
				ease: "easeInOut",
				delay: i * 0.2,
			},
		}),
	};

	const containerVariants: Variants = {
		animate: {
			transition: {
				staggerChildren: 0.2,
			},
		},
	};

	return (
		<button
			type={type}
			disabled={disabled || isLoading}
			onClick={onClick}
			className={`w-full hover:cursor-pointer p-3 rounded font-bold transition-all ${
				disabled ? "opacity-70 cursor-not-allowed" : "hover:brightness-110"
			}`}
			style={{
				backgroundColor: appTheme[theme].accent.primary,
				color: appTheme[theme].accent.primary,
				position: "relative",
				overflow: "hidden",
				minHeight: "44px", // Ensure consistent height during loading
			}}
		>
			{isLoading ? (
				<motion.div
					variants={containerVariants}
					initial="initial"
					animate="animate"
					className="flex items-center justify-center gap-1 h-full"
				>
					{[0, 1, 2].map((i) => (
						<motion.span
							key={i}
							custom={i}
							variants={dotVariants}
							className="w-2 h-2 rounded-full"
							style={{ backgroundColor: appTheme[theme].surface.primary }}
						/>
					))}
				</motion.div>
			) : (
				<>{label && <span className="text-white">{label}</span>}</>
			)}

			{/* Subtle shimmer effect */}
			{isLoading && (
				<motion.div
					className="absolute inset-0 bg-white opacity-10"
					initial={{ x: "-100%" }}
					animate={{ x: "100%" }}
					transition={{
						repeat: Infinity,
						duration: 1.5,
						ease: "linear",
					}}
				/>
			)}
		</button>
	);
};