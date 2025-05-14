/* eslint-disable @typescript-eslint/no-explicit-any */

import Logo3d from "../../assets/Logo3d";
import { appTheme } from "../../constant/theme";
import { FiClock, FiUser } from "react-icons/fi";
import { AuthButton } from "../../pages/AuthPages/components/auth-button";

export interface SessionAttributes {
	id?: number;
	user_id: number;
	coursetitle: string;
	subjectitle: string;
	price: number;
	duration: number;
	walletaddress: string;
	created_at?: Date;
	updated_at?: Date;
	tutor: {
		id: string;
		name: string;
		email: string;
		program: string;
	};
}

interface SessionCardProps {
	session: SessionAttributes;
	onBook?: () => void;
	theme: "light" | "dark";
}

const DiscoverCourseCard = ({ session, onBook, theme }: SessionCardProps) => {
	return (
		<div
			className="rounded-xl min-w-[400px] flex flex-col h-full border"
			style={{
				backgroundColor: appTheme[theme].surface.primary,
				borderColor: appTheme[theme].neutral[200],
				boxShadow: appTheme.shadows.md,
				color:
					theme === "light" ? appTheme.text.primary : appTheme.text.inverted,
			}}
		>
			<div className="flex items-center flex-col md:flex-row p-4.5 gap-6 flex-1">
				{/* Logo Section */}
				<div className="flex items-center justify-center md:block md:w-1/3">
					<div className="w-[130px] h-[130px]">
						<Logo3d />
					</div>
				</div>

				{/* Course Details */}
				<div className="flex-1 flex flex-col gap-4">
					<div>
						<h2 className="text-2xl font-bold">{session.coursetitle}</h2>
						<p className="text-lg text-gray-400">{session.subjectitle}</p>
					</div>

					{/* Course Info */}
					<div className="flex items-center gap-4">
						<div className="flex items-center gap-2">
							<FiClock style={{ color: appTheme[theme].accent.primary }} />
							<span>{session.duration} hours</span>
						</div>
						<div className="h-4 w-px bg-gray-300" />
						<div
							className="text-lg font-bold"
							style={{ color: appTheme[theme].accent.primary }}
						>
							GHS {session.price.toFixed(2)}
						</div>
					</div>

					{/* Tutor Section */}
					<div
						className="mt-4 pt-4 border-t"
						style={{ borderColor: appTheme[theme].neutral[200] }}
					>
						<div className="flex items-center gap-3">
							<div
								className="p-2 rounded-full"
								style={{
									backgroundColor: appTheme[theme].accent.primary + "20",
								}}
							>
								<FiUser style={{ color: appTheme[theme].accent.primary }} />
							</div>
							<div>
								<h4 className="font-semibold">{session.tutor.name}</h4>
								<p className="text-sm text-gray-400">{session.tutor.program}</p>
								<p className="text-sm text-gray-400">{session.tutor.email}</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Booking Action */}
			<div
				className="border-t p-4"
				style={{ borderColor: appTheme[theme].neutral[200] }}
			>
				<AuthButton onClick={onBook} label="Book Now" type="button" />
			</div>
		</div>
	);
};

export default DiscoverCourseCard;