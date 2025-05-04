/* eslint-disable @typescript-eslint/no-explicit-any */
// components/dashboard/sections/CoursesSection.tsx
import { FiStar } from "react-icons/fi";
import StatusBadge from "./tableComponents/StatusBadge";
import { DashboardTable } from "./tableComponents/dashboardTable";

export const CoursesSection = ({ courses, theme }: any) => (
  <div className="space-y-3 md:space-y-4">
    <h2 className="text-lg md:text-xl font-semibold">Your Courses</h2>
    <DashboardTable
      columns={[
        { header: "Course", className: "" },
        { header: "Topic", className: "hidden md:table-cell" },
        { header: "Price", className: "" },
        { header: "Duration", className: "hidden sm:table-cell" },
        { header: "Lessons", className: "hidden lg:table-cell" },
        { header: "Rating", className: "" },
        { header: "Status", className: "" },
      ]}
      theme={theme}
    >
      {courses.map((course: any, index: number) => (
        <tr key={index}>
          <td>{course.course}</td>
          <td className="hidden md:table-cell">{course.topic}</td>
          <td>${course.price}</td>
          <td className="hidden sm:table-cell">{course.duration}</td>
          <td className="hidden lg:table-cell">{course.lessons}</td>
          <td>
            <div className="flex items-center gap-1">
              <FiStar size={14} />
              {course.rating}
            </div>
          </td>
          <td>
            <StatusBadge status={course.status} theme={theme} />
          </td>
        </tr>
      ))}
    </DashboardTable>
  </div>
);