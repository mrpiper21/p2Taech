/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, Outlet } from "react-router-dom";
import {
	FiHome,
	FiUsers,
	FiSettings,
	FiMenu,
	FiX,
	FiSearch,
	FiPocket,
	FiMoon,
	FiSun,
	FiBook,
	FiBookmark,
	FiVideo,
	FiFileText,
	FiDollarSign,
	FiBookOpen,
	FiAlertCircle,
} from "react-icons/fi";
import { useMemo, useState } from "react";
import { appTheme } from "../constant/theme";
import useAppStore from "../store/useAppStore";
import useBookings from "../hooks/useBookings";
import Logo3d from "../assets/Logo3d";

const AppLayout = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
	const { theme, setTheme } = useAppStore(["theme", "setTheme"]);
	const { data: bookingsData, isLoading } = useBookings();

	const getUpcomingSessions = () => {
		if (!bookingsData?.data?.tutorBookings) return [];

		const now = new Date();

		return bookingsData.data.tutorBookings.filter((booking: any) => {
			try {
				const [year, month, day] = booking.date.split("-");
				const [hour, minute] = booking.time.split(":");
				const sessionDate = new Date(year, month - 1, day, hour, minute);

				if (isNaN(sessionDate.getTime())) return false;

				const timeDiff = sessionDate.getTime() - now.getTime();

				return timeDiff > 0 && timeDiff <= 60 * 60 * 1000; // next 30 minutes
			} catch (err: any) {
				console.error("Invalid booking format:", err, booking);
				return false;
			}
		});
	};

	const dueSessions = useMemo(getUpcomingSessions, [bookingsData]);

	const navigation = [
		{ name: "Dashboard", href: "/home", icon: FiHome },
		{ name: "Discover Courses", href: "/home/discover", icon: FiBook },
		{ name: "My Learning", href: "/my-learning", icon: FiBookmark },
		{ name: "Bookings", href: "/home/bookings", icon: FiBookOpen },
		{ name: "Live Sessions", href: "/live", icon: FiVideo },
		{ name: "Study Groups", href: "/groups", icon: FiUsers },
		{ name: "Resource Library", href: "/resources", icon: FiFileText },
		{ name: "Wallet", href: "/wallet", icon: FiDollarSign },
		{ name: "Settings", href: "/settings", icon: FiSettings },
	];

	return (
		<div className="min-h-screen flex">
			{/* Sidebar */}
			<aside
				className={`${
					isSidebarOpen ? "w-64 translate-x-0" : "-translate-x-full"
				} fixed md:fixed top-0 left-0 h-screen z-30 transition-all duration-300 ease-in-out scrollbar-hide`}
				style={{
					backgroundColor: appTheme[theme].base.secondary,
					color: appTheme.text.primary,
				}}
			>
				<div className={`${isSidebarOpen ? "block" : "hidden"} p-4 h-screen`}>
					<div className="gap-3 flex items-center justify-center mb-8">
						<div className="h-20 w-20">
							<Logo3d />
						</div>
						<h1
							className="text-xl font-bold"
							style={{ color: appTheme[theme].accent.primary }}
						>
							p2Teach
						</h1>
						<button
							onClick={() => setIsSidebarOpen(false)}
							className="md:hidden p-2 rounded hover:brightness-90"
							style={{
								backgroundColor: appTheme[theme].accent.primary + "20",
								color: appTheme[theme].accent.primary,
							}}
						>
							<FiX size={20} />
						</button>
					</div>

					{/* Navigation */}
					<nav className="space-y-2 h-[calc(100vh-180px)] overflow-y-auto pb-4 scrollbar-hide">
						{navigation.map((item) => (
							<Link
								key={item.name}
								to={item.href}
								className="flex items-center p-3 rounded-lg transition-colors group hover:bg-opacity-20"
								style={{
									backgroundColor: appTheme[theme].base.tertiary,
									color:
										theme === "light"
											? appTheme.text.primary
											: appTheme.text.inverted,
									boxShadow: appTheme.shadows.sm,
								}}
							>
								<item.icon className="mr-3" size={20} />
								<span className="truncate">{item.name}</span>
							</Link>
						))}
						<div className="absolute bottom-5 right-5 w-full justify-end flex">
							{theme === "dark" ? (
								<FiMoon
									onClick={() => setTheme("light")}
									className="hover:cursor-pointer p-1.5 rounded hover:bg-opacity-20"
									size={34}
									style={{
										color: appTheme[theme].accent.primary,
										backgroundColor: appTheme[theme].accent.primary + "10",
									}}
								/>
							) : (
								<FiSun
									onClick={() => setTheme("dark")}
									className="hover:cursor-pointer p-1.5 rounded hover:bg-opacity-20"
									size={34}
									style={{
										color: appTheme[theme].accent.primary,
										backgroundColor: appTheme[theme].accent.primary + "10",
									}}
								/>
							)}
						</div>
					</nav>
				</div>
			</aside>

			{/* Main Content */}
			<div className="flex-1 flex flex-col md:ml-64">
				{/* Navbar */}
				<header
					className="sticky top-0 z-20 p-4 flex flex-col md:flex-row gap-4 md:gap-0 items-center justify-between"
					style={{
						backgroundColor: appTheme[theme].surface.primary,
						color: appTheme.text.primary,
						boxShadow: appTheme.shadows.sm,
						borderBottom: `1px solid ${appTheme[theme].neutral[200]}`,
					}}
				>
					<div className="flex items-center w-full md:w-auto justify-between">
						<div className="flex items-center space-x-4">
							<button
								onClick={() => setIsSidebarOpen(!isSidebarOpen)}
								className="p-2 rounded hover:brightness-90 md:hidden"
								style={{
									backgroundColor: appTheme[theme].accent.primary + "20",
									color: appTheme[theme].accent.primary,
								}}
							>
								{isSidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
							</button>
							<h1
								className="md:hidden text-lg font-bold"
								style={{ color: appTheme[theme].accent.primary }}
							>
								p2Teach
							</h1>
						</div>
						<div className="md:hidden flex items-center gap-2">
							<FiPocket color={appTheme[theme].accent.secondary} size={24} />
							<div
								className="w-8 h-8 rounded-full flex items-center justify-center"
								style={{
									backgroundColor: appTheme[theme].accent.primary,
									color: appTheme.text.inverted,
								}}
							>
								JD
							</div>
						</div>
					</div>

					<div className="w-full md:w-auto flex items-center gap-4">
						<div className="relative w-full md:w-64">
							<FiSearch
								className="absolute left-3 top-1/2 -translate-y-1/2"
								style={{ color: appTheme[theme].neutral[400] }}
							/>
							<input
								type="text"
								placeholder="Search..."
								className="pl-10 pr-4 py-2 rounded-lg focus:outline-none w-full text-sm md:text-base"
								style={{
									color: appTheme.text.primary,
									backgroundColor: appTheme[theme].surface.secondary,
									border: `1px solid ${appTheme[theme].neutral[200]}`,
								}}
							/>
						</div>

						{/* Desktop Profile Section */}
						<div className="hidden md:flex items-center gap-4">
							<div
								className="flex hover:cursor-pointer gap-2 items-center py-2 px-4 rounded-full"
								style={{
									backgroundColor: appTheme[theme].surface.secondary,
								}}
							>
								<FiPocket color={appTheme[theme].accent.secondary} size={24} />
								<span
									style={{ color: appTheme[theme].neutral[500] }}
									className="text-sm"
								>
									0x748s4..
								</span>
							</div>
							<div className="relative">
								<button
									onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
									className="flex items-center cursor-pointer space-x-2 p-2 rounded hover:brightness-90"
									style={{
										backgroundColor: appTheme[theme].surface.secondary,
									}}
								>
									<div
										className="w-8 h-8 rounded-full flex items-center justify-center"
										style={{
											backgroundColor: appTheme[theme].accent.primary,
											color: appTheme.text.inverted,
										}}
									>
										JD
									</div>
								</button>

								{isProfileMenuOpen && (
									<div
										className="absolute right-0 mt-2 w-48 rounded-lg py-2"
										style={{
											backgroundColor: appTheme[theme].surface.primary,
											boxShadow: appTheme.shadows.md,
											border: `1px solid ${appTheme[theme].neutral[200]}`,
										}}
									>
										<Link
											to="/profile"
											className="block px-4 py-2 hover:brightness-95 text-sm"
											style={{
												backgroundColor: appTheme[theme].surface.secondary,
											}}
										>
											Profile
										</Link>
										<Link
											to="/logout"
											className="block px-4 py-2 hover:brightness-95 text-sm"
											style={{
												backgroundColor: appTheme[theme].surface.secondary,
											}}
										>
											Logout
										</Link>
									</div>
								)}
							</div>
						</div>
					</div>
				</header>
				<main
					className="flex-1 p-4 min-h-[calc(100vh-76px)]"
					style={{
						backgroundColor: appTheme[theme].surface.secondary,
						color: appTheme.text.primary,
					}}
				>
					{dueSessions.length > 0 && (
						<div
							className="mb-4 p-4 rounded-lg flex items-center justify-between"
							style={{
								backgroundColor: appTheme[theme].accent.primary + "20",
								border: `1px solid ${appTheme[theme].accent.primary}`,
							}}
						>
							<div className="flex items-center gap-2">
								<FiAlertCircle
									size={20}
									style={{ color: appTheme[theme].accent.primary }}
								/>
								<span>
									You have {dueSessions.length} session
									{dueSessions?.length > 1 ? "s" : ""} starting soon:{" "}
									{dueSessions?.map((session: any) => (
										<span key={session?.id}>
											{session.tutor?.name}'s session at{" "}
											{new Date(
												`${session.date}T${session.time}`
											).toLocaleTimeString([], {
												hour: "2-digit",
												minute: "2-digit",
											})}
										</span>
									))}
								</span>
							</div>
							<Link
								to={`/live/${dueSessions[0]?.id}`} // Link to first upcoming session
								className="px-4 py-2 rounded-md flex items-center gap-2 hover:brightness-95"
								style={{
									backgroundColor: appTheme[theme].accent.primary,
									color: appTheme.text.inverted,
								}}
							>
								<FiVideo size={16} />
								View Session
							</Link>
						</div>
					)}
					{isLoading && (
						<div className="mb-4 p-4 rounded-lg bg-blue-100 text-blue-800">
							Loading sessions...
						</div>
					)}
					<Outlet />
				</main>
			</div>
		</div>
	);
};

export default AppLayout;
