// components/AuthFooter.tsx
import { Link } from 'react-router-dom';
import { appTheme } from '../../../constant/theme';

interface AuthFooterProps {
  promptText: string;
  linkText: string;
  linkPath: string;
}

export const AuthFooter = ({ promptText, linkText, linkPath }: AuthFooterProps) => (
  <div className="text-center text-sm" style={{ color: appTheme.text.secondary }}>
    {promptText}{' '}
    <Link
      to={linkPath}
      className="font-medium hover:underline"
      style={{ color: appTheme.colors.accent.primary }}
    >
      {linkText}
    </Link>
  </div>
);