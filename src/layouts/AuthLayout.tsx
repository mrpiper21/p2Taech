import { Outlet, Link } from "react-router-dom";
import { appTheme } from "../constant/theme";
import logo from "../assets/logo.jpg";
import useAppStore from "../store/useAppStore";

const AuthLayout = () => {
	const { theme } = useAppStore(["theme"]);
	return (
		<div
			className="flex flex-col min-h-screen"
			style={{
				height: "100%",
				margin: 0,
				backgroundColor: appTheme[theme].surface.primary,
			}}
		>
			{/* Header with Logo */}
			<header className="py-6 px-4 sm:px-6 lg:px-8 flex-none">
				<div className="max-w-7xl mx-auto flex justify-center">
					<Link to="/" className="flex items-center">
						<img src={logo} alt="Company Logo" className="h-10 w-auto" />
						<span
							className="ml-3 text-2xl font-bold"
							style={{ color: appTheme[theme].accent.primary }}
						>
							P2Teach
						</span>
					</Link>
				</div>
			</header>

			{/* Main Content Area - now properly fills remaining space */}
			<main className="flex-1 flex items-center justify-center p-4">
				<div
					className="w-full max-w-xl rounded-xl p-8"
					style={{
						backgroundColor: appTheme[theme].surface.primary,
					}}
				>
					<Outlet />
				</div>
			</main>

			{/* Footer */}
			<footer className="py-4 text-center flex-none">
				<p className="text-sm" style={{ color: appTheme.text.secondary }}>
					© {new Date().getFullYear()} P2Teach. All rights reserved.
				</p>
			</footer>
		</div>
	);
};

export default AuthLayout;
