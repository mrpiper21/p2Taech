// components/RememberMe.tsx
import { appTheme } from '../../constant/theme';

export const RememberMe = () => (
  <div className="flex items-center">
    <input
      id="remember-me"
      name="remember-me"
      type="checkbox"
      className="h-4 w-4 rounded"
      style={{
        borderColor: appTheme.colors.gray[500],
        backgroundColor: appTheme.colors.dark.primary
      }}
    />
    <label 
      htmlFor="remember-me"
      className="ml-2 block text-sm"
      style={{ color: appTheme.text.secondary }}
    >
      Remember me
    </label>
  </div>
);