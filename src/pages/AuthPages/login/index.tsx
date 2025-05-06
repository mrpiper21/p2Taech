/* eslint-disable @typescript-eslint/no-explicit-any */
// pages/Login.tsx
import { useState } from 'react';
import { TValidationError } from '../../../@types/oauth.type';
import { AuthHeader } from '../components/auth-header';
import { FormInput } from '../../../components/form/FormInput';
import { RememberMe } from '../../../components/atoms/RememberMe';
import { AuthButton } from "../components/auth-button";
import { toast } from "react-toastify";
import { appTheme } from "../../../constant/theme";
import useAppStore from "../../../store/useAppStore";
import useUserStore from "../../../store/useUserStore";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const { theme } = useAppStore(["theme"]);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [errors, setErrors] = useState<TValidationError>({
		email: "",
		password: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const navigate = useNavigate();

	const validateForm = (): TValidationError => {
		const newErrors: TValidationError = { email: "", password: "" };

		if (!formData.email.trim()) {
			newErrors.email = "Email is required";
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			newErrors.email = "Invalid email format";
		}

		if (!formData.password.trim()) {
			newErrors.password = "Password is required";
		}

		return newErrors;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// Validate form
		const validationErrors = validateForm();
		setErrors(validationErrors);

		// Check if form is valid
		const isValid = Object.values(validationErrors).every(
			(error) => error === ""
		);
		if (!isValid) return;

		setIsSubmitting(true);

		try {
			await useUserStore.getState().login(formData.email, formData.password);

			toast.success("Login successful!");

			// Redirect or perform other actions
			navigate("/home");
		} catch (error: any) {
			console.error("Login error:", error);

			const errorMessage =
				error.response?.data?.message ||
				error.message ||
				"Login failed. Please try again.";

			toast.error(errorMessage);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		if (errors[name as keyof TValidationError]) {
			setErrors((prev) => ({ ...prev, [name]: "" }));
		}
	};

	return (
		<div
			className="w-full max-w-lg mx-auto rounded-xl p-8"
			style={{
				backgroundColor: appTheme[theme].surface.primary,
				border: `1px solid ${appTheme[theme].neutral[200]}`,
			}}
		>
			<AuthHeader
				theme={theme}
				title="Welcome back"
				subtitle="Please enter your credentials to login"
			/>

			<form onSubmit={handleSubmit} className="space-y-4">
				<FormInput
					theme={theme}
					type="email"
					name="email"
					value={formData.email}
					onChange={handleChange}
					label="Email address"
					error={errors.email}
					placeholder="Enter your email"
				/>

				<FormInput
					theme={theme}
					type="password"
					name="password"
					value={formData.password}
					onChange={handleChange}
					label="Password"
					error={errors.password}
					placeholder="Enter your password"
				/>

				<div className="flex items-center justify-between">
					<RememberMe theme={theme} />
					{/* <ForgotPasswordLink /> */}
				</div>

				<AuthButton
					type="submit"
					disabled={isSubmitting}
					isLoading={isSubmitting}
					label="Sign in"
				/>
				<p
					className="text-center mt-4 text-sm"
					style={{ color: appTheme.text.secondary }}
				>
					Don't have an account?{" "}
					<a
						href="register"
						className="font-medium hover:underline"
						style={{ color: appTheme[theme].accent.primary }}
					>
						Register
					</a>
				</p>
			</form>

			{/* <AuthFooter 
        promptText="Don't have an account?"
        linkText="Sign up"
        linkPath="/auth/register"
      /> */}
		</div>
	);
};

export default Login