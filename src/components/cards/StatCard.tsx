import React from 'react'
import { appTheme } from '../../constant/theme';

interface Props {
    icon: React.ReactNode,
    title: string,
    value: number | string,
    theme: "light" | "dark"
}

const StatCard = ({ icon, title, value, theme }: Props) => (
    <div
        className="flex items-center gap-3 p-4 md:p-6 rounded-lg"
        style={{
            backgroundColor: appTheme[theme].surface.primary,
            border: `1px solid ${appTheme[theme].neutral[200]}`,
        }}
    >
        <div
            className="p-2 md:p-3 rounded-full"
            style={{
                backgroundColor: appTheme[theme].accent.primary + "20",
                color: appTheme[theme].accent.primary,
            }}
        >
            {React.cloneElement(icon, { size: 20 })}
        </div>
        <div>
            <p className="text-xs md:text-sm opacity-75">{title}</p>
            <p className="text-lg md:text-2xl font-bold">{value}</p>
        </div>
    </div>
);

export default StatCard