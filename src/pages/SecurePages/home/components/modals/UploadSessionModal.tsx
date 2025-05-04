import useAppStore from "../../../../../store/useAppStore";
import { FiClock, FiBook } from "react-icons/fi";
import { appTheme } from "../../../../../constant/theme";
import { useState } from "react";

const UploadSessionModal = () => {
  const { theme } = useAppStore(['theme']);
  const [durationUnit, setDurationUnit] = useState('hours');
  
  // Add state management for form fields
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    amount: '',
    duration: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <div 
      className="p-6 rounded-lg w-full max-w-md"
      style={{
        backgroundColor: appTheme[theme].surface.primary,
        color:
                theme === "light" ? appTheme.text.primary : appTheme.text.inverted,
      }}
    >
      <div className="flex justify-center items-center mb-6">
        <h2 className="text-xl font-semibold">Create New Session</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Course Title */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Course Title *
          </label>
          <div className="relative">
            <FiBook 
              size={18} 
              className="absolute left-3 top-1/2 -translate-y-1/2" 
              style={{ color: appTheme[theme].neutral[400] }}
            />
            <input
              type="text"
              required
              className="w-full pl-10 pr-4 py-3 rounded-lg"
              style={{
                backgroundColor: appTheme[theme].surface.secondary,
                border: `1px solid ${appTheme[theme].neutral[200]}`,
              }}
              placeholder="Introduction to Computer Science"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>
        </div>

        {/* Subject */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Subject *
          </label>
          <div className="relative">
            <input
              type="text"
              required
              className="w-full px-4 py-3 rounded-lg"
              style={{
                backgroundColor: appTheme[theme].surface.secondary,
                border: `1px solid ${appTheme[theme].neutral[200]}`,
              }}
              placeholder="Data Structures & Algorithms"
              value={formData.subject}
              onChange={(e) => setFormData({...formData, subject: e.target.value})}
            />
          </div>
        </div>

        {/* Price and Duration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Amount */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Price *
            </label>
            <div className="relative">
              {/* <span>GHS </span> */}
              <input
                type="number"
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg"
                style={{    
                  backgroundColor: appTheme[theme].surface.secondary,
                  border: `1px solid ${appTheme[theme].neutral[200]}`,
                }}
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
              />
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Duration *
            </label>
            <div className="relative">
              <FiClock 
                size={18} 
                className="absolute left-3 top-1/2 -translate-y-1/2" 
              />
              <div className="flex gap-2">
                <input
                  type="number"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-lg"
                  style={{
                    backgroundColor: appTheme[theme].surface.secondary,
                    border: `1px solid ${appTheme[theme].neutral[200]}`,
                  }}
                  placeholder="6"
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: e.target.value})}
                />
                <select
                  className="rounded-lg px-3"
                  style={{
                    backgroundColor: appTheme[theme].surface.secondary,
                    border: `1px solid ${appTheme[theme].neutral[200]}`,
                  }}
                  value={durationUnit}
                  onChange={(e) => setDurationUnit(e.target.value)}
                >
                  <option value="hours">Hours</option>
                  <option value="days">Days</option>
                  <option value="weeks">Weeks</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 py-3 rounded-lg font-semibold"
            style={{
              backgroundColor: appTheme[theme].accent.primary,
            }}
          >
            Create Session
          </button>
          <button
            type="button"
            className="flex-1 py-3 rounded-lg font-semibold"
            style={{
              backgroundColor: appTheme[theme].surface.secondary,
              border: `1px solid ${appTheme[theme].neutral[200]}`
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadSessionModal;