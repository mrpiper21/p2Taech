import { motion } from "framer-motion";
import useAppStore from "../../../../../store/useAppStore";
import { FiClock, FiBook } from "react-icons/fi";
import { appTheme } from "../../../../../constant/theme";
import { useState } from "react";
import { AuthButton } from "../../../../AuthPages/components/auth-button";
import axios from "axios";
import { toast } from "react-toastify";
import useUserStore from "../../../../../store/useUserStore";
import { useWalletStore } from "../../../../../store/useWalletStore";
import { useModal } from "../../../../../hooks/useModal";

// Animation variants
const modalVariants = {
	hidden: {
		opacity: 0,
		y: 20,
		scale: 0.95,
	},
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: {
			type: "spring",
			stiffness: 300,
			damping: 20,
			duration: 0.3,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 10 },
	visible: { opacity: 1, y: 0 },
};

const buttonVariants = {
	hover: { scale: 1.02 },
	tap: { scale: 0.98 },
};

const UploadSessionModal = () => {
	const { theme } = useAppStore(["theme"]);
	const [durationUnit, setDurationUnit] = useState("hours");
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const { currentUser } = useUserStore((state) => state);
	const { account } = useWalletStore();
	const { closeModal } = useModal();
	const [formData, setFormData] = useState({
		title: "",
		subject: "",
		amount: "",
		duration: "",
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		console.log("wallet address  ---", account);

		try {
			const response = await axios.post("http://localhost:3001/api/sessions/", {
				user_id: currentUser?.id,
				coursetitle: formData.title,
				subjectitle: formData.subject,
				price: formData.amount,
				duration: formData.duration,
				walletaddress: account,
			});

			if (response.status === 201) {
				toast.success(response.data.message || "Session created successfully!");
				closeModal();
			}
		} catch (error) {
			console.error("Error creating session:", error);
			if (axios.isAxiosError(error)) {
				const errorMessage =
					error.response?.data?.message || "Failed to create session";
				toast.error(errorMessage);
			} else {
				toast.error("An unexpected error occurred");
			}
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<motion.div
			initial="hidden"
			animate="visible"
			variants={modalVariants}
			className="p-6 rounded-lg w-full max-w-md"
			style={{
				backgroundColor: appTheme[theme].surface.primary,
				color:
					theme === "light" ? appTheme.text.primary : appTheme.text.inverted,
			}}
		>
			<div className="flex justify-center items-center mb-6">
				<motion.h2 className="text-xl font-semibold" variants={itemVariants}>
					Create New Session
				</motion.h2>
			</div>

			<motion.form
				onSubmit={handleSubmit}
				className="space-y-6"
				variants={{
					visible: {
						transition: {
							staggerChildren: 0.1,
						},
					},
				}}
			>
				{/* Course Title */}
				<motion.div variants={itemVariants}>
					<label className="block text-sm font-medium mb-2">
						Course Title *
					</label>
					<div className="relative">
						<FiBook
							size={18}
							className="absolute left-3 top-1/2 -translate-y-1/2"
							style={{ color: appTheme[theme].neutral[400] }}
						/>
						<motion.input
							type="text"
							required
							className="w-full pl-10 pr-4 py-3 rounded-lg transition-colors duration-200"
							style={{
								backgroundColor: appTheme[theme].surface.secondary,
								border: `1px solid ${appTheme[theme].neutral[200]}`,
							}}
							placeholder="Introduction to Computer Science"
							value={formData.title}
							onChange={(e) =>
								setFormData({ ...formData, title: e.target.value })
							}
						/>
					</div>
				</motion.div>

				{/* Subject */}
				<motion.div variants={itemVariants}>
					<label className="block text-sm font-medium mb-2">Subject *</label>
					<div className="relative">
						<motion.input
							type="text"
							required
							className="w-full px-4 py-3 rounded-lg transition-colors duration-200"
							style={{
								backgroundColor: appTheme[theme].surface.secondary,
								border: `1px solid ${appTheme[theme].neutral[200]}`,
							}}
							placeholder="Data Structures & Algorithms"
							value={formData.subject}
							onChange={(e) =>
								setFormData({ ...formData, subject: e.target.value })
							}
						/>
					</div>
				</motion.div>

				{/* Price and Duration */}
				<motion.div
					className="grid grid-cols-1 md:grid-cols-2 gap-4"
					variants={itemVariants}
				>
					{/* Amount */}
					<div>
						<label className="block text-sm font-medium mb-2">Price *</label>
						<div className="relative">
							<motion.input
								type="number"
								required
								className="w-full pl-10 pr-4 py-3 rounded-lg transition-colors duration-200"
								style={{
									backgroundColor: appTheme[theme].surface.secondary,
									border: `1px solid ${appTheme[theme].neutral[200]}`,
								}}
								placeholder="0.00"
								value={formData.amount}
								onChange={(e) =>
									setFormData({ ...formData, amount: e.target.value })
								}
							/>
						</div>
					</div>

					{/* Duration */}
					<div>
						<label className="block text-sm font-medium mb-2">Duration *</label>
						<div className="relative">
							<FiClock
								size={18}
								className="absolute left-3 top-1/2 -translate-y-1/2"
							/>
							<div className="flex gap-2">
								<motion.input
									type="number"
									required
									className="w-full pl-10 pr-4 py-3 rounded-lg transition-colors duration-200"
									style={{
										backgroundColor: appTheme[theme].surface.secondary,
										border: `1px solid ${appTheme[theme].neutral[200]}`,
									}}
									placeholder="6"
									value={formData.duration}
									onChange={(e) =>
										setFormData({ ...formData, duration: e.target.value })
									}
								/>
								<motion.select
									className="rounded-lg px-3 transition-colors duration-200"
									style={{
										backgroundColor: appTheme[theme].surface.secondary,
										border: `1px solid ${appTheme[theme].neutral[200]}`,
									}}
									value={durationUnit}
									onChange={(e) => setDurationUnit(e.target.value)}
								>
									<option value="hours">Hours</option>
									<option value="days">Days</option>
									<option value="weeks">Weeks</option>
								</motion.select>
							</div>
						</div>
					</div>
				</motion.div>

				{/* Action Buttons */}
				<motion.div className="flex gap-4" variants={itemVariants}>
					<motion.div
						variants={buttonVariants}
						whileHover="hover"
						whileTap="tap"
					>
						<AuthButton
							isLoading={isSubmitting}
							label="Create Session"
							type="submit"
						/>
					</motion.div>
					<motion.button
						onClick={closeModal}
						type="button"
						className="flex-1 px-4 py-3 rounded-lg font-semibold transition-colors duration-200 hover:brightness-95"
						style={{
							backgroundColor: appTheme[theme].surface.secondary,
							border: `1px solid ${appTheme[theme].neutral[200]}`,
						}}
						variants={buttonVariants}
						whileHover="hover"
						whileTap="tap"
					>
						Cancel
					</motion.button>
				</motion.div>
			</motion.form>
		</motion.div>
	);
};

export default UploadSessionModal;
