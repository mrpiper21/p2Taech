
import { FiPlus } from "react-icons/fi";
import useAppStore from "../../../../store/useAppStore";
import { appTheme } from "../../../../constant/theme";
import { useModal } from "../../../../hooks/useModal";
import UploadSessionModal from "./modals/UploadSessionModal";

export const DashboardHeader = () => {
  const { theme } = useAppStore(["theme"]);
  const {openModal} = useModal()

  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-0 justify-between items-start md:items-center">
      <h1 className="text-xl md:text-2xl font-bold">Tutor Dashboard</h1>
      <button
        onClick={()=> openModal(<UploadSessionModal />)}
        className="hover:cursor-pointer flex items-center gap-1 md:gap-2 px-3 md:px-4 py-2 text-sm md:text-base rounded-lg font-semibold"
        style={{
          backgroundColor: appTheme[theme].accent.primary,
          color: appTheme.text.inverted,
        }}
      >
        <FiPlus size={18} className="md:mr-1" />
        <span className="hidden md:inline">Upload New Course</span>
      </button>
    </div>
  );
};