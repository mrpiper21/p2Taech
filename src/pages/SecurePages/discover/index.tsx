import useAppStore from "../../../store/useAppStore";
import { appTheme } from "../../../constant/theme";
import { useModal } from "../../../hooks/useModal";
import BookLectureDrawer from "./modals/BookLectureDrawer";
import DiscoverCourseCard from "../../../components/cards/discover-course-card";

const DiscoverCourses = () => {
	const { theme } = useAppStore(["theme"]);
	const { openDrawer } = useModal();

	// Example course data - replace with actual data from your backend
	const courses = [
		{
			id: 1,
			course: "Introduction to Computer Science",
			topic: "Data Structures and Algorithm",
			tutor: "Sarah Johnson",
			rating: 4.8,
			price: 49.99,
			duration: "6 hours",
			lessons: 24,
			thumbnail: "https://example.com/blockchain-course.jpg",
			tutorAvatar: "https://example.com/tutor-avatar.jpg",
		},
	];

	return (
		<div
			className="p-6"
			style={{
				backgroundColor: appTheme[theme].surface.secondary,
				color: appTheme.text.primary,
			}}
		>
			<h1 className="text-3xl font-bold mb-8">Discover Courses</h1>

			{/* Search and Filters */}
			<div className="mb-8 flex flex-col md:flex-row gap-4">
				<input
					type="text"
					placeholder="Search courses..."
					className="p-3 rounded-lg flex-1"
					style={{
						backgroundColor: appTheme[theme].surface.primary,
						border: `1px solid ${appTheme[theme].neutral[200]}`,
					}}
				/>
				<select
					className="p-3 rounded-lg"
					style={{
						backgroundColor: appTheme[theme].surface.primary,
						border: `1px solid ${appTheme[theme].neutral[200]}`,
					}}
				>
					<option>All Categories</option>
					<option>Blockchain</option>
					<option>Programming</option>
					<option>Mathematics</option>
				</select>
			</div>

			{/* Courses Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{courses.map((course) => (
					<DiscoverCourseCard
						session={course}
						theme={theme}
						onBook={() => openDrawer(<BookLectureDrawer course={course} />)}
					/>
				))}
			</div>
		</div>
	);
};

export default DiscoverCourses;
