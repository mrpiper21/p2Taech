/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import useAppStore from "../../../store/useAppStore";
import {
	FiClock,
	FiCalendar,
	FiMapPin,
	FiUser,
	FiSearch,
} from "react-icons/fi";
import { appTheme } from "../../../constant/theme";
import { useBookingStore } from "../../../store/useBookingStore";
import useUserStore from "../../../store/useUserStore";

const Bookings = () => {
	const { theme } = useAppStore(["theme"]);
	const { bookings, loading, error, fetchBookings } = useBookingStore();
	const { currentUser } = useUserStore((state) => state);
	const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");

	const groupedBookings = useMemo(() => {
		const now = new Date();
		return bookings?.reduce(
			(acc: any, booking) => {
				try {
					const [year, month, day] = booking.date.split("-");
					const [hours, minutes] = booking.time.split(":");
					const sessionDate = new Date(
						parseInt(year),
						parseInt(month) - 1,
						parseInt(day),
						parseInt(hours),
						parseInt(minutes)
					);

					const category = sessionDate > now ? "upcoming" : "past";
					acc[category].push(booking);
				} catch (error) {
					console.error("Error parsing booking date:", error);
				}
				return acc;
			},
			{ upcoming: [], past: [] }
		);
	}, [bookings]);

	useEffect(() => {
		if (currentUser?.id) {
			fetchBookings(currentUser.id, "student");
		}
	}, [currentUser?.id, fetchBookings]);

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString("en-US", {
			month: "long",
			day: "numeric",
			year: "numeric",
		});
	};

	const formatTime = (timeString: string) => {
		const [hours, minutes] = timeString.split(":");
		const date = new Date();
		date.setHours(parseInt(hours), parseInt(minutes));
		return date.toLocaleTimeString("en-US", {
			hour: "numeric",
			minute: "2-digit",
		});
	};

	if (loading)
		return <div className="p-4 text-center">Loading bookings...</div>;
	if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

	return (
		<div
			style={{
				color:
					theme === "light" ? appTheme.text.primary : appTheme.text.inverted,
			}}
			className="p-4 space-y-8"
		>
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-bold">My Bookings</h1>
				<div className="relative w-64">
					<input
						type="text"
						placeholder="Search bookings..."
						className="pl-10 pr-4 py-2 rounded-lg focus:outline-none w-full text-sm"
						style={{
							backgroundColor: appTheme[theme].surface.primary,
							border: `1px solid ${appTheme[theme].neutral[200]}`,
						}}
					/>
					<FiSearch className="absolute left-3 top-1/2 -translate-y-1/2" />
				</div>
			</div>

			{/* Tabs */}
			<div
				className="flex border-b"
				style={{ borderColor: appTheme[theme].neutral[200] }}
			>
				<button
					onClick={() => setActiveTab("upcoming")}
					className={`px-4 hover:cursor-pointer py-2 text-sm font-medium transition-colors ${
						activeTab === "upcoming" ? "border-b-2" : ""
					}`}
					style={{
						color:
							activeTab === "upcoming"
								? appTheme[theme].accent.primary
								: appTheme.text.primary,
						borderColor:
							activeTab === "upcoming"
								? appTheme[theme].accent.primary
								: "transparent",
					}}
				>
					Upcoming ({groupedBookings?.upcoming.length || 0})
				</button>
				<button
					onClick={() => setActiveTab("past")}
					className={`px-4 hover:cursor-pointer py-2 text-sm font-medium transition-colors ${
						activeTab === "past" ? "border-b-2" : ""
					}`}
					style={{
						color:
							activeTab === "past"
								? appTheme[theme].accent.primary
								: appTheme.text.primary,
						borderColor:
							activeTab === "past"
								? appTheme[theme].accent.primary
								: "transparent",
					}}
				>
					Past ({groupedBookings?.past.length || 0})
				</button>
			</div>

			{/* Tab Content */}
			<div className="space-y-4">
				{activeTab === "upcoming" ? (
					groupedBookings?.upcoming.length > 0 ? (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
							{groupedBookings.upcoming.map((booking: any) => (
								<div
									key={booking.id}
									className="p-4 rounded-xl transition-all hover:shadow-lg"
									style={{
										backgroundColor: appTheme[theme].surface.primary,
										border: `1px solid ${appTheme[theme].neutral[200]}`,
									}}
								>
									<div className="flex items-center justify-between mb-3">
										<div className="flex items-center gap-2">
											<div
												className="w-10 h-10 rounded-full flex items-center justify-center"
												style={{
													backgroundColor:
														appTheme[theme].accent.primary + "20",
												}}
											>
												<FiUser size={20} />
											</div>
											<div>
												<h3 className="font-semibold">
													{booking.tutor.firstname} {booking.tutor.lastname}
												</h3>
												<p
													className="text-sm"
													style={{ color: appTheme[theme].neutral[500] }}
												>
													{booking.tutor.program}
												</p>
											</div>
										</div>
										<span
											className="text-sm px-2 py-1 rounded-full capitalize"
											style={{
												backgroundColor: appTheme[theme].accent.primary + "20",
											}}
										>
											upcoming
										</span>
									</div>

									<div className="space-y-2">
										<div className="flex items-center gap-2">
											<FiCalendar
												style={{ color: appTheme[theme].accent.secondary }}
											/>
											<span>{formatDate(booking.date)}</span>
										</div>
										<div className="flex items-center gap-2">
											<FiClock
												style={{ color: appTheme[theme].accent.secondary }}
											/>
											<span>{formatTime(booking.time)}</span>
										</div>
										<div className="flex items-center gap-2">
											<FiMapPin
												style={{ color: appTheme[theme].accent.secondary }}
											/>
											<span>{booking.location}</span>
										</div>
									</div>

									<div className="mt-4 flex gap-2">
										<button
											className="px-4 hover:cursor-pointer py-2 rounded-lg text-sm font-medium transition-colors"
											style={{
												backgroundColor: appTheme[theme].accent.primary,
												color:
													theme === "light"
														? appTheme.text.primary
														: appTheme.text.inverted,
											}}
										>
											View Details
										</button>
										<button
											className="px-4 hover:cursor-pointer py-2 rounded-lg text-sm font-medium transition-colors"
											style={{
												backgroundColor: appTheme[theme].surface.secondary,
											}}
										>
											Reschedule
										</button>
									</div>
								</div>
							))}
						</div>
					) : (
						<div className="text-center py-8">No upcoming sessions found</div>
					)
				) : groupedBookings?.past.length > 0 ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{groupedBookings.past.map((booking: any) => (
							<div
								key={booking.id}
								className="p-4 rounded-xl transition-all hover:shadow-lg"
								style={{
									backgroundColor: appTheme[theme].surface.primary,
									border: `1px solid ${appTheme[theme].neutral[200]}`,
								}}
							>
								<div className="flex items-center justify-between mb-3">
									<div className="flex items-center gap-2">
										<div
											className="w-10 h-10 rounded-full flex items-center justify-center"
											style={{
												backgroundColor: appTheme[theme].accent.primary + "20",
											}}
										>
											<FiUser size={20} />
										</div>
										<div>
											<h3 className="font-semibold">
												{booking.tutor.firstname} {booking.tutor.lastname}
											</h3>
											<p className="text-sm">{booking.tutor.program}</p>
										</div>
									</div>
									<span
										className="text-sm px-2 py-1 rounded-full capitalize"
										style={{
											backgroundColor: appTheme[theme].neutral[200],
										}}
									>
										past
									</span>
								</div>

								<div className="space-y-2">
									<div className="flex items-center gap-2">
										<FiCalendar />
										<span>{formatDate(booking.date)}</span>
									</div>
									<div className="flex items-center gap-2">
										<FiClock />
										<span>{formatTime(booking.time)}</span>
									</div>
									<div className="flex items-center gap-2">
										<FiMapPin />
										<span>{booking.location}</span>
									</div>
								</div>

								<div className="mt-4">
									<button
										className="w-full hover:cursor-pointer px-4 py-2 rounded-lg text-sm font-medium transition-colors"
										style={{
											backgroundColor: appTheme[theme].surface.secondary,
											color:
												theme === "light"
													? appTheme.text.primary
													: appTheme.text.inverted,
										}}
									>
										View Details
									</button>
								</div>
							</div>
						))}
					</div>
				) : (
					<div
						className="text-center py-8"
						style={{ color: appTheme[theme].neutral[500] }}
					>
						No past sessions found
					</div>
				)}
			</div>
		</div>
	);
};

export default Bookings;
