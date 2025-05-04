/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { appTheme } from "../../constant/theme";
import { toast } from "react-toastify";
import { AuthButton } from "./components/auth-button";
import useAppStore from "../../store/useAppStore";

export default function RegistrationPage() {
	const { theme } = useAppStore(["theme"]);
	const [step, setStep] = useState(1);
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		course: "",
		password: "",
		confirmPassword: "",
	});
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const courses = [
		"Computer Science",
		"Mathematics",
		"Physics",
		"Engineering",
		"Business",
		"Biology",
		"Chemistry",
	];

	const validateStep1 = () => {
		const newErrors: Record<string, string> = {};

		if (!formData.firstName.trim())
			newErrors.firstName = "First name is required";
		if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";

		if (!formData.email.trim()) {
			newErrors.email = "Email is required";
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			newErrors.email = "Invalid email format";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const validateStep2 = () => {
		const newErrors: Record<string, string> = {};

		if (!formData.course) newErrors.course = "Course is required";

		if (!formData.password) {
			newErrors.password = "Password is required";
		} else if (formData.password.length < 8) {
			newErrors.password = "Password must be at least 8 characters";
		}

		if (formData.password !== formData.confirmPassword) {
			newErrors.confirmPassword = "Passwords do not match";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleNextStep = (e: React.FormEvent) => {
		e.preventDefault();
		if (validateStep1()) {
			setStep(2);
		}
	};

	const handlePrevStep = () => {
		setStep(1);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!validateStep2()) return;

		setIsSubmitting(true);

		try {
			const response = await axios.post(
				"http://localhost:3001/api/user/auth/register",
				{
					firstname: formData.firstName,
					lastname: formData.lastName,
					email: formData.email,
					program: formData.course,
					password: formData.password,
				}
			);

			if (!response.data?.success) {
				toast.error(response?.data?.message);
				setIsSubmitting(false);
				return;
			}
			toast.success(response.data?.message);
			setIsSubmitting(false);
			return;
		} catch (error) {
			const axiosError = error as AxiosError<{ message?: string }>;
			setErrors({
				...errors,
				api:
					axiosError.response?.data?.message ||
					"Registration failed. Please try again.",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
	};

	return (
		<div
			className="w-full max-w-lg mx-auto rounded-xl p-8"
			style={{
				backgroundColor: appTheme[theme].surface.primary,
				border: `1px solid ${appTheme[theme].neutral[200]}`,
				color:
					theme === "light" ? appTheme.text.primary : appTheme.text.inverted,
			}}
		>
			<h2 className="text-center text-2xl font-bold mb-6">
				Create Your Account
			</h2>

			{errors.api && (
				<div
					className="mb-4 p-3 text-center rounded"
					style={{
						backgroundColor: appTheme[theme].status.error + "10",
						color: appTheme[theme].status.error,
						border: `1px solid ${appTheme[theme].status.error}`,
					}}
				>
					{errors.api}
				</div>
			)}

			{step === 1 ? (
				<form onSubmit={handleNextStep} className="space-y-4">
					<div className="flex flex-col gap-4">
						<div className="flex-1">
							<label className="block text-sm font-medium mb-2">
								First Name
							</label>
							<input
								type="text"
								name="firstName"
								value={formData.firstName}
								onChange={handleChange}
								className="w-full p-3 rounded border focus:ring-2 focus:outline-none"
								style={{
									borderColor: errors.firstName
										? appTheme[theme].status.error
										: appTheme[theme].neutral[200],
									backgroundColor: appTheme[theme].surface.secondary,
									// focusRingColor: appTheme.colors.accent.primary as any
								}}
							/>
							{errors.firstName && (
								<span
									className="text-xs mt-1 block"
									style={{ color: appTheme[theme].status.error }}
								>
									{errors.firstName}
								</span>
							)}
						</div>

						<div className="flex-1">
							<label className="block text-sm font-medium mb-2">
								Last Name
							</label>
							<input
								type="text"
								name="lastName"
								value={formData.lastName}
								onChange={handleChange}
								className="w-full p-3 rounded border focus:ring-2 focus:outline-none"
								style={{
									borderColor: errors.lastName
										? appTheme[theme].status.error
										: appTheme[theme].neutral[200],
									backgroundColor: appTheme[theme].surface.secondary,
									// focusRingColor: appTheme.colors.accent.primary
								}}
							/>
							{errors.lastName && (
								<span
									className="text-xs mt-1 block"
									style={{ color: appTheme[theme].status.error }}
								>
									{errors.lastName}
								</span>
							)}
						</div>
					</div>

					<div>
						<label className="block text-sm font-medium mb-2">
							Email Address
						</label>
						<input
							type="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							className="w-full p-3 rounded border focus:ring-2 focus:outline-none"
							style={{
								borderColor: errors.email
									? appTheme[theme].status.error
									: appTheme[theme].neutral[200],
								backgroundColor: appTheme[theme].surface.secondary,
								// focusRingColor: appTheme.colors.accent.primary
							}}
						/>
						{errors.email && (
							<span
								className="text-xs mt-1 block"
								style={{ color: appTheme[theme].status.error }}
							>
								{errors.email}
							</span>
						)}
					</div>

					<button
						type="submit"
						className="w-full p-3 rounded font-bold transition-all hover:brightness-95 active:brightness-90"
						style={{
							backgroundColor: appTheme[theme].accent.primary,
							boxShadow: appTheme.shadows.md,
						}}
					>
						Continue
					</button>

					<p className="text-center mt-4 text-sm">
						Already have an account?{" "}
						<a
							href="login"
							className="font-medium hover:underline"
							style={{ color: appTheme[theme].accent.primary }}
						>
							Log in
						</a>
					</p>
				</form>
			) : (
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label className="block text-sm font-medium mb-2">
							Course of Study
						</label>
						<select
							name="course"
							value={formData.course}
							onChange={handleChange}
							className="w-full p-3 rounded border focus:ring-2 focus:outline-none appearance-none"
							style={{
								borderColor: errors.course
									? appTheme[theme].status.error
									: appTheme[theme].neutral[200],
								backgroundColor: appTheme[theme].surface.secondary,
								backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='${appTheme[
									theme
								].neutral[500].replace(
									"#",
									"%23"
								)}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
								backgroundRepeat: "no-repeat",
								backgroundPosition: "right 1rem center",
								backgroundSize: "1rem",
								// focusRingColor: appTheme.colors.accent.primary
							}}
						>
							<option value="">Select your course</option>
							{courses.map((course) => (
								<option key={course} value={course}>
									{course}
								</option>
							))}
						</select>
						{errors.course && (
							<span
								className="text-xs mt-1 block"
								style={{ color: appTheme[theme].status.error }}
							>
								{errors.course}
							</span>
						)}
					</div>

					<div>
						<label className="block text-sm font-medium mb-2">Password</label>
						<input
							type="password"
							name="password"
							value={formData.password}
							onChange={handleChange}
							className="w-full p-3 rounded border focus:ring-2 focus:outline-none"
							style={{
								borderColor: errors.password
									? appTheme[theme].status.error
									: appTheme[theme].neutral[200],
								backgroundColor: appTheme[theme].surface.secondary,

								// focusRingColor: appTheme.colors.accent.primary
							}}
						/>
						{errors.password && (
							<span
								className="text-xs mt-1 block"
								style={{ color: appTheme[theme].status.error }}
							>
								{errors.password}
							</span>
						)}
					</div>

					<div>
						<label className="block text-sm font-medium mb-2">
							Confirm Password
						</label>
						<input
							type="password"
							name="confirmPassword"
							value={formData.confirmPassword}
							onChange={handleChange}
							className="w-full p-3 rounded border focus:ring-2 focus:outline-none"
							style={{
								borderColor: errors.confirmPassword
									? appTheme[theme].status.error
									: appTheme[theme].neutral[200],
								backgroundColor: appTheme[theme].surface.secondary,
								color:
									theme === "light"
										? appTheme.text.primary
										: appTheme.text.inverted,

								// focusRingColor: appTheme[theme].accent.primary
							}}
						/>
						{errors.confirmPassword && (
							<span
								className="text-xs mt-1 block"
								style={{ color: appTheme[theme].status.error }}
							>
								{errors.confirmPassword}
							</span>
						)}
					</div>

					<div className="flex gap-4">
						<button
							type="button"
							onClick={handlePrevStep}
							className="w-1/3 p-3 rounded font-medium transition-all hover:brightness-95 active:brightness-90"
							style={{
								backgroundColor: appTheme[theme].surface.secondary,
								border: `1px solid ${appTheme[theme].neutral[200]}`,
								boxShadow: appTheme.shadows.sm,
							}}
						>
							Back
						</button>

						<AuthButton
							type="submit"
							disabled={isSubmitting}
							isLoading={isSubmitting}
							label="Create Account"
						/>
					</div>
				</form>
			)}

			{/* Progress Indicator */}
			<div className="flex items-center justify-center mt-8 gap-2">
				{[1, 2].map((stepNumber) => (
					<div
						key={stepNumber}
						className={`w-2 h-2 rounded-full transition-all ${
							step === stepNumber ? "w-4" : ""
						}`}
						style={{
							backgroundColor:
								step >= stepNumber
									? appTheme[theme].accent.primary
									: appTheme[theme].neutral[300],
						}}
					></div>
				))}
			</div>
		</div>
	);
}
