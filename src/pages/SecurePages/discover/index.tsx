import { FiClock } from "react-icons/fi";
import useAppStore from "../../../store/useAppStore";
import { appTheme } from "../../../constant/theme";
import { useModal } from "../../../hooks/useModal";
import BookLectureDrawer from "./modals/BookLectureDrawer";

const DiscoverCourses = () => {
  const { theme } = useAppStore(['theme']);
  const {openDrawer } = useModal();
  
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
            border: `1px solid ${appTheme[theme].neutral[200]}`
          }}
        />
        <select
          className="p-3 rounded-lg"
          style={{
            backgroundColor: appTheme[theme].surface.primary,
            border: `1px solid ${appTheme[theme].neutral[200]}`
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
          <div
            key={course.id}
            className="rounded-xl overflow-hidden transition-transform"
            style={{
              backgroundColor: appTheme[theme].surface.primary,
              boxShadow: appTheme.shadows.md,
              color:
                theme === "light" ? appTheme.text.primary : appTheme.text.inverted,
            }}
          >
            {/* Course Thumbnail */}
            <div className="relative h-48 bg-gray-200">
              <img 
                src={course.thumbnail} 
                alt={course.course}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Course Content */}
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Course: {course.course}</h3>
              <h3 className="mb-2">Topic: {course.topic}</h3>
              
              {/* Tutor Info */}
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src={course.tutorAvatar} 
                  alt={course.tutor}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="text-sm" style={{ color: appTheme[theme].neutral[500] }}>
                    Peer
                  </p>
                  <p>{course.tutor}</p>
                </div>
              </div>

              {/* Course Stats */}
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <FiClock style={{ color: appTheme[theme].accent.primary }} />
                  <span>{course.duration}</span>
                </div>
              </div>

              {/* Pricing Section */}
              <div className="flex justify-between items-center">
              <span className="text-gray-400 font-medium text-lg">
                        GHS{course.price}
                      </span>
                <button
                onClick={() => openDrawer(<BookLectureDrawer course={course} />, {
                    containerStyle: { width: '45dvw', overflowY: 'auto', height: '100vh', }
                  })}
                  className="px-4 hover:cursor-pointer py-2 rounded-lg font-medium transition-colors"
                  style={{
                    backgroundColor: appTheme[theme].accent.primary,
                    color: appTheme.text.inverted,
                    // hover: {
                    //   backgroundColor: appTheme[theme].accent.secondary
                    // }
                  }}
                >
                  BOOK
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscoverCourses;