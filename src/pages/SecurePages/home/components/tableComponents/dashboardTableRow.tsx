import { ReactNode } from "react";
import { appTheme } from "../../../../../constant/theme";
import useAppStore from "../../../../../store/useAppStore";

const DashboardTableRow = ({ children }: {children: ReactNode}) => {
    const {theme} = useAppStore(['theme'])
    return (
        <tr
        className="hover:opacity-90 transition-opacity"
        style={{
            backgroundColor: appTheme[theme].surface.primary,
            borderBottom: `1px solid ${appTheme[theme].neutral[200]}`,
        }}
    >
        {children}
    </tr>
    )
};

export default DashboardTableRow