/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import useAppStore from "../../../../store/useAppStore";
import { FiCalendar, FiClock, FiMapPin, FiCheck, FiUser } from "react-icons/fi";
import { appTheme } from "../../../../constant/theme";
import { SessionAttributes } from "../../../../components/cards/discover-course-card";
import { FormInput } from "../../../../components/form/FormInput";
import { AuthButton } from "../../../AuthPages/components/auth-button";
import useUserStore from "../../../../store/useUserStore";
import axios from "axios";
import { baseUrl } from "../../../../apis";
import { toast } from "react-toastify";
import { useModal } from "../../../../hooks/useModal";

const availableLocations = [
	"Valco Hall",
	"Fraser Library",
	"Lugard Library",
	"Kingsley summer hut",
	"Main Auditorium",
	"Other",
];

const timeSlots = [
	"09:00 AM",
	"10:00 AM",
	"11:00 AM",
	"12:00 PM",
	"01:00 PM",
	"02:00 PM",
	"03:00 PM",
	"04:00 PM",
	"05:00 PM",
];

interface BookLectureDrawerProps {
	course?: SessionAttributes;
}

const BookLectureDrawer: React.FC<BookLectureDrawerProps> = ({ course }) => {
	const { theme } = useAppStore(["theme"]);
	const [selectedLocation, setSelectedLocation] = useState<string>("");
	const [selectedDate, setSelectedDate] = useState<string>("");
	const [selectedTime, setSelectedTime] = useState<string>("");
	const [genericLocation, setGenericLocation] = useState<string>("");
	const { currentUser } = useUserStore((state) => state);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { closeModal } = useModal();

	const handleSubmit = async () => {
		setIsLoading(true);
		const payload = {
			location: selectedLocation,
			date: selectedDate,
			time: selectedTime,
			studentid: currentUser?.id,
			tutorid: course?.tutor.id,
		};
		try {
			const response = await axios.post(`${baseUrl}/bookings/create`, payload);

			if (response.data.success) {
				console.log(response.data.data);
				toast.success(response.data.message);
				setIsLoading(false);
				closeModal();
				return;
			}
			toast.error(response.data.message);
			return;
		} catch (error) {
			console.log(error);
		}
	};

	const handleOnGenericChange = (_text: any) => {
		setGenericLocation(_text);
	};

	useEffect(() => {
		if (selectedLocation === "Other") {
			const input = document.getElementById("location-input");
			input?.focus();
		}
	}, [selectedLocation]);

	return (
		<div
			className="w-[45dvw] h-full flex flex-col p-6"
			style={{
				backgroundColor: appTheme[theme].surface.primary,
				color:
					theme === "light" ? appTheme.text.primary : appTheme.text.inverted,
			}}
		>
			{/* Header Section */}
			<div className="mb-6">
				<h2 className="text-2xl font-bold">Book Lecture Session</h2>
				{course && (
					<div
						className="mt-4 p-4 rounded-lg"
						style={{
							backgroundColor: appTheme[theme].surface.secondary,
							border: `1px solid ${appTheme[theme].neutral[200]}`,
						}}
					>
						<div className="flex flex-col gap-2">
							<h3 className="text-lg font-semibold">{course.coursetitle}</h3>
							<p className="text-sm opacity-75">{course.subjectitle}</p>
							<div className="flex justify-between items-center">
								<div className="flex items-center gap-2">
									<FiUser
										size={16}
										style={{ color: appTheme[theme].accent.primary }}
									/>
									<span className="text-sm">{course.tutor.name}</span>
								</div>
								<span className="font-medium">GHS{course.price}</span>
							</div>
							<div className="flex items-center gap-2">
								<FiClock
									size={16}
									style={{ color: appTheme[theme].accent.primary }}
								/>
								<span className="text-sm">{course.duration} hours</span>
							</div>
						</div>
					</div>
				)}
			</div>

			{/* Form Section */}
			<div className="flex-1 min-h-0 flex flex-col">
				{/* Location Selection */}
				<div className="flex-1 overflow-y-auto pr-2 pb-4">
					<div className="flex items-center gap-2 mb-3">
						<FiMapPin
							size={20}
							style={{ color: appTheme[theme].accent.primary }}
						/>
						<h3 className="text-lg font-semibold">Select Location</h3>
					</div>
					<div className="grid grid-cols-1 gap-2">
						{availableLocations.map((location) => (
							<button
								key={location}
								onClick={() => setSelectedLocation(location)}
								className={`p-3 rounded-lg flex items-center justify-between transition-colors
                  ${
										selectedLocation === location
											? "bg-opacity-20"
											: "hover:bg-opacity-10"
									}`}
								style={{
									backgroundColor:
										selectedLocation === location
											? appTheme[theme].accent.primary + "20"
											: appTheme[theme].surface.secondary,
									border: `1px solid ${appTheme[theme].neutral[200]}`,
								}}
							>
								<span className="text-left">{location}</span>
								{selectedLocation === location && (
									<FiCheck style={{ color: appTheme[theme].accent.primary }} />
								)}
							</button>
						))}
						{selectedLocation == "Other" && (
							<FormInput
								label="Specify Location *"
								name="Location"
								theme={theme}
								placeholder="Type Location here..."
								value={genericLocation}
								onChange={(e) => handleOnGenericChange(e.target.value)}
								type="text"
							/>
						)}
					</div>
				</div>

				{/* Date & Time Section */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					{/* Date Picker */}
					<div className="mb-6">
						<div className="flex items-center gap-2 mb-3">
							<FiCalendar
								size={20}
								style={{ color: appTheme[theme].accent.primary }}
							/>
							<h3 className="text-lg font-semibold">Select Date</h3>
						</div>
						<input
							type="date"
							min={new Date().toISOString().split("T")[0]}
							onChange={(e) => setSelectedDate(e.target.value)}
							className="w-full p-3 rounded-lg"
							style={{
								backgroundColor: appTheme[theme].surface.secondary,
								border: `1px solid ${appTheme[theme].neutral[200]}`,
							}}
						/>
					</div>

					{/* Time Selection */}
					<div className="mb-6">
						<div className="flex items-center gap-2 mb-3">
							<FiClock
								size={20}
								style={{ color: appTheme[theme].accent.primary }}
							/>
							<h3 className="text-lg font-semibold">Select Time</h3>
						</div>
						<div className="grid grid-cols-2 gap-2">
							{timeSlots.map((time) => (
								<button
									key={time}
									onClick={() => setSelectedTime(time)}
									className={`p-3 rounded-lg transition-colors ${
										selectedTime === time
											? "bg-opacity-20"
											: "hover:bg-opacity-10"
									}`}
									style={{
										backgroundColor:
											selectedTime === time
												? appTheme[theme].accent.primary + "20"
												: appTheme[theme].surface.secondary,
										border: `1px solid ${appTheme[theme].neutral[200]}`,
									}}
								>
									{time}
								</button>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* Footer Section */}
			<div
				className="pt-4 border-t"
				style={{ borderColor: appTheme[theme].neutral[200] }}
			>
				<AuthButton
					label="Confirm Booking"
					disabled={!selectedLocation || !selectedDate || !selectedTime}
					type="submit"
					isLoading={isLoading}
					onClick={handleSubmit}
				/>
			</div>
		</div>
	);
};

export default BookLectureDrawer;
