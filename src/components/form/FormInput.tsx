// components/FormInput.tsx
import { ChangeEvent } from 'react';
import { appTheme } from '../../constant/theme';

interface FormInputProps {
  type: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  error?: string;
  placeholder?: string;
}

export const FormInput = ({
  type,
  name,
  value,
  onChange,
  label,
  error,
  placeholder = ''
}: FormInputProps) => (
  <div>
    <label 
      className="block text-sm font-medium mb-2"
      style={{ color: appTheme.text.primary }}
    >
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full p-3 rounded border"
      style={{
        borderColor: error 
          ? appTheme.colors.status.error 
          : appTheme.colors.gray[500],
        backgroundColor: appTheme.colors.dark.primary,
        color: appTheme.text.primary
      }}
    />
    {error && (
      <span 
        className="text-xs mt-1 block"
        style={{ color: appTheme.colors.status.error }}
      >
        {error}
      </span>
    )}
  </div>
);