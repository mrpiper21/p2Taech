import useAppStore from "../../../store/useAppStore";
import { FiBook, FiDollarSign, FiStar, FiUsers } from "react-icons/fi";
import { appTheme } from "../../../constant/theme";
import StatCard from "../../../components/cards/StatCard";
import { DashboardHeader } from "./components/dashboardHeader";
import { CoursesSection } from "./components/courseSection";
import { TransactionsSection } from "./components/transactionSection";

const HomePage = () => {
	const { theme } = useAppStore(["theme"]);

	const stats = { bookings: 24, earnings: 2540.5, rating: 4.8, students: 58 };

	const courses = [
		{
			course: "Introduction to Computer Science",
			topic: "Data Structures and Algorithm",
			price: 49.99,
			duration: "6 hours",
			lessons: 24,
			rating: 4.8,
			status: "Active",
		},
		// More courses...
	];

	const transactions = [
		{ date: "2024-03-15", amount: 299.97, status: "Completed" },
		{ date: "2024-03-15", amount: 299.97, status: "Completed" },
	];

	return (
		<div
			className="p-4 md:p-6 space-y-6 md:space-y-8"
			style={{
				backgroundColor: appTheme[theme].surface.secondary,
				color:
					theme === "light" ? appTheme.text.primary : appTheme.text.inverted,
			}}
		>
			<DashboardHeader />
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
				<StatCard
					icon={<FiUsers />}
					title="Peers Tutored"
					value={stats.students}
					theme={theme}
				/>
				<StatCard
					icon={<FiBook />}
					title="Bookings"
					value={stats.bookings}
					theme={theme}
				/>
				<StatCard
					icon={<FiDollarSign />}
					title="Earnings"
					value={`GHS ${stats.earnings.toFixed(2)}`}
					theme={theme}
				/>
				<StatCard
					icon={<FiStar />}
					title="Rating"
					value={stats.rating}
					theme={theme}
				/>
			</div>

			<CoursesSection courses={courses} theme={theme} />
			<TransactionsSection transactions={transactions} theme={theme} />
		</div>
	);
};

export default HomePage;
