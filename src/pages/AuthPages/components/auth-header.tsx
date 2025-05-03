// components/AuthHeader.tsx

import { appTheme } from "../../../constant/theme";

interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

export const AuthHeader = ({ title, subtitle }: AuthHeaderProps) => (
  <div className="text-center">
    <h2 className="text-2xl font-bold" style={{ color: appTheme.text.primary }}>
      {title}
    </h2>
    <p className="mt-2 text-sm" style={{ color: appTheme.text.secondary }}>
      {subtitle}
    </p>
  </div>
);