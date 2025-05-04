/* eslint-disable @typescript-eslint/no-explicit-any */
// components/dashboard/table/DashboardTable.tsx

import { appTheme } from "../../../../../constant/theme";
import DashboardTableHeader from "./dashboardTableHeader";


export const DashboardTable = ({
  columns,
  children,
  theme,
}: {
  columns: any[];
  children: React.ReactNode;
  theme: "light" | "dark";
}) => (
  <div>
    <table className="w-full min-w-[600px] md:min-w-0">
      <thead style={{ backgroundColor: appTheme[theme].surface.primary }}>
        <tr>
          {columns.map((col, index) => (
            <DashboardTableHeader
              key={index}
              theme={theme}
              className={col.className}
            >
              {col.header}
            </DashboardTableHeader>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  </div>
);