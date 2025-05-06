/* eslint-disable @typescript-eslint/no-explicit-any */

import { appTheme } from '../../constant/theme';
import { FiClock } from 'react-icons/fi';

interface SessionAttributes {
    id?: number;
    user_id: number;
    coursetitle: string;
    subjectitle: string;
    price: number;
    duration: number;
    created_at?: Date;
    updated_at?: Date;
}

interface SessionCardProps {
    session: SessionAttributes;
    onBook?: () => void;
    theme: "light" | "dark"
  }

const DiscoverCourseCard = ({ session, onBook, theme }: SessionCardProps) => {
  return (
    <div
      className="rounded-xl overflow-hidden transition-transform p-6"
      style={{
        backgroundColor: appTheme[theme].surface.primary,
        boxShadow: appTheme.shadows.md,
        color: theme === "light" ? appTheme.text.primary : appTheme.text.inverted,
      }}
    >
      {/* Session Content */}
      <div className="flex flex-col h-full">
        <div className="flex-grow">
          <h3 className="text-xl font-semibold mb-2">
            Course: {session.coursetitle}
          </h3>
          <h3 className="mb-4">Subject: {session.subjectitle}</h3>
          
          {/* Session Stats */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2">
              <FiClock style={{ color: appTheme[theme].accent.primary }} />
              <span>{session.duration} minutes</span>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="flex justify-between items-center mt-auto">
          <span className="text-gray-400 font-medium text-lg">
            GHS{session.price}
          </span>
          <button
            onClick={onBook}
            className="px-4 py-2 rounded-lg font-medium transition-colors hover:opacity-90"
            style={{
              backgroundColor: appTheme[theme].accent.primary,
              color: appTheme.text.inverted,
            }}
          >
            BOOK
          </button>
        </div>
      </div>
    </div>
  )
}

export default DiscoverCourseCard