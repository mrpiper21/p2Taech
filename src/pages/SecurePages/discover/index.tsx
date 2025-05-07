import { useQuery } from "@tanstack/react-query";
import useAppStore from "../../../store/useAppStore";
import { appTheme } from "../../../constant/theme";
import { useModal } from "../../../hooks/useModal";
import BookLectureDrawer from "./modals/BookLectureDrawer";
import DiscoverCourseCard, {
	SessionAttributes,
} from "../../../components/cards/discover-course-card";
import axios from "axios";
import { baseUrl } from "../../../apis";
import SkeletonLoader from "../../../components/loader/skeletonloader";
import SlideShowText from "../../../components/atoms/animated-text";

const DiscoverCourses = () => {
	const { theme } = useAppStore(["theme"]);
	const { openDrawer } = useModal();

	// Fetch sessions using TanStack Query
	const {
		data: sessions,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["sessions"],
		queryFn: async () => {
			const response = await axios.get<{
				success: boolean;
				data: SessionAttributes[];
				message: string;
			}>(`${baseUrl}/sessions/all`);

			if (!response.data.success) {
				throw new Error(response.data.message || "Failed to fetch sessions");
			}

			return response.data.data;
		},
		staleTime: 1000 * 60 * 5,
	});

	return (
		<div
			className="p-6"
			style={{
				backgroundColor: appTheme[theme].surface.secondary,
				color: appTheme.text.primary,
			}}
		>
			<div className="flex items-center justify-between">
				<h1 className="text-3xl font-bold mb-8">Discover Courses</h1>
				<SlideShowText theme={theme} />
			</div>

			{/* Search and Filters */}
			{!isLoading && (
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
			)}

			{/* Loading state */}
			{isLoading && <SkeletonLoader theme={theme} cardCount={6} />}

			{/* Error state */}
			{isError && (
				<div
					className="text-center py-8"
					style={{ color: appTheme[theme].status.error }}
				>
					Failed to load courses. Please try again later.
				</div>
			)}

			{/* Success state */}
			{!isLoading && !isError && (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{sessions?.map((session) => (
						<DiscoverCourseCard
							key={session.id}
							session={session}
							theme={theme}
							onBook={() =>
								openDrawer(<BookLectureDrawer course={session} />, {
									containerStyle: { overflowY: "auto" },
								})
							}
						/>
					))}
				</div>
			)}

			{/* Empty state */}
			{!isLoading && !isError && sessions?.length === 0 && (
				<div className="text-center py-8">
					No courses available at the moment.
				</div>
			)}
		</div>
	);
};

export default DiscoverCourses;
