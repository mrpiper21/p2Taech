import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { appTheme } from '../../constant/theme';

export default function RegistrationPage() {
//   const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    course: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const courses = [
    'Computer Science',
    'Mathematics',
    'Physics',
    'Engineering',
    'Business',
    'Biology',
    'Chemistry'
  ];

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.course) newErrors.course = 'Course is required';
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handlePrevStep = () => {
    setStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;
    
    setIsSubmitting(true);
    
    try {
      await axios.post('/api/auth/register', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        course: formData.course,
        password: formData.password
      });
    //   navigate('/login');
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      setErrors({
        ...errors,
        api: axiosError.response?.data?.message || 'Registration failed. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  return (
    <div 
      className="w-full min-w-md rounded-xl p-8"
      style={{ 
        backgroundColor: appTheme.colors.dark.secondary,
      }}
    >
      <h2 
        className="text-center text-2xl font-bold mb-6"
        style={{ color: appTheme.text.primary }}
      >
        Create Your Account {step === 1 ? '(Step 1 of 2)' : '(Step 2 of 2)'}
      </h2>

      {errors.api && (
        <div 
          className="mb-4 p-3 text-center rounded"
          style={{ 
            backgroundColor: 'rgba(244, 67, 54, 0.1)',
            color: appTheme.colors.status.error
          }}
        >
          {errors.api}
        </div>
      )}

      {step === 1 ? (
        <form onSubmit={handleNextStep} className="space-y-4">
          <div className="gap-4">
            <div className="flex-1">
              <label 
                className="block text-sm font-medium mb-2"
                style={{ color: appTheme.text.primary }}
              >
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full p-3 rounded border"
                style={{
                  borderColor: errors.firstName 
                    ? appTheme.colors.status.error 
                    : appTheme.colors.gray[500],
                  backgroundColor: appTheme.colors.dark.primary,
                  color: appTheme.text.primary
                }}
              />
              {errors.firstName && (
                <span 
                  className="text-xs mt-1 block"
                  style={{ color: appTheme.colors.status.error }}
                >
                  {errors.firstName}
                </span>
              )}
            </div>

            <div className="flex-1">
              <label 
                className="block text-sm font-medium mb-2"
                style={{ color: appTheme.text.primary }}
              >
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full p-3 rounded border"
                style={{
                  borderColor: errors.lastName 
                    ? appTheme.colors.status.error 
                    : appTheme.colors.gray[500],
                  backgroundColor: appTheme.colors.dark.primary,
                  color: appTheme.text.primary
                }}
              />
              {errors.lastName && (
                <span 
                  className="text-xs mt-1 block"
                  style={{ color: appTheme.colors.status.error }}
                >
                  {errors.lastName}
                </span>
              )}
            </div>
          </div>

          <div>
            <label 
              className="block text-sm font-medium mb-2"
              style={{ color: appTheme.text.primary }}
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded border"
              style={{
                borderColor: errors.email 
                  ? appTheme.colors.status.error 
                  : appTheme.colors.gray[500],
                backgroundColor: appTheme.colors.dark.primary,
                color: appTheme.text.primary
              }}
            />
            {errors.email && (
              <span 
                className="text-xs mt-1 block"
                style={{ color: appTheme.colors.status.error }}
              >
                {errors.email}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full hover:cursor-pointer p-3 rounded font-bold transition-opacity"
            style={{
              backgroundColor: appTheme.colors.accent.primary,
              color: appTheme.colors.dark.primary
            }}
          >
            Continue
          </button>

          <p 
            className="text-center mt-4 text-sm"
            style={{ color: appTheme.text.secondary }}
          >
            Already have an account?{' '}
            <a
              href="/auth/login"
              className="font-medium hover:underline"
              style={{ color: appTheme.colors.accent.primary }}
            >
              Log in
            </a>
          </p>
        </form>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label 
              className="block text-sm font-medium mb-2"
              style={{ color: appTheme.text.primary }}
            >
              Course of Study
            </label>
            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
              className="w-full p-3 rounded border appearance-none"
              style={{
                borderColor: errors.course 
                  ? appTheme.colors.status.error 
                  : appTheme.colors.gray[500],
                backgroundColor: appTheme.colors.dark.primary,
                color: appTheme.text.primary,
                backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='${appTheme.colors.gray[500].replace('#', '%23')}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 1rem center',
                backgroundSize: '1rem'
              }}
            >
              <option value="">Select your course</option>
              {courses.map(course => (
                <option key={course} value={course}>{course}</option>
              ))}
            </select>
            {errors.course && (
              <span 
                className="text-xs mt-1 block"
                style={{ color: appTheme.colors.status.error }}
              >
                {errors.course}
              </span>
            )}
          </div>

          <div>
            <label 
              className="block text-sm font-medium mb-2"
              style={{ color: appTheme.text.primary }}
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 rounded border"
              style={{
                borderColor: errors.password 
                  ? appTheme.colors.status.error 
                  : appTheme.colors.gray[500],
                backgroundColor: appTheme.colors.dark.primary,
                color: appTheme.text.primary
              }}
            />
            {errors.password && (
              <span 
                className="text-xs mt-1 block"
                style={{ color: appTheme.colors.status.error }}
              >
                {errors.password}
              </span>
            )}
          </div>

          <div>
            <label 
              className="block text-sm font-medium mb-2"
              style={{ color: appTheme.text.primary }}
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-3 rounded border"
              style={{
                borderColor: errors.confirmPassword 
                  ? appTheme.colors.status.error 
                  : appTheme.colors.gray[500],
                backgroundColor: appTheme.colors.dark.primary,
                color: appTheme.text.primary
              }}
            />
            {errors.confirmPassword && (
              <span 
                className="text-xs mt-1 block"
                style={{ color: appTheme.colors.status.error }}
              >
                {errors.confirmPassword}
              </span>
            )}
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={handlePrevStep}
              className="w-1/3 p-3 rounded font-medium transition-opacity"
              style={{
                backgroundColor: 'transparent',
                color: appTheme.text.primary,
                border: `1px solid ${appTheme.colors.gray[500]}`
              }}
            >
              Back
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-2/3 p-3 rounded font-bold transition-opacity disabled:opacity-70 disabled:cursor-not-allowed"
              style={{
                backgroundColor: appTheme.colors.accent.primary,
                color: appTheme.colors.dark.primary
              }}
            >
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>
        </form>
      )}
      
      {/* Progress Indicator */}
      <div className="flex items-center justify-center mt-8">
        <div 
          className="w-3 h-3 rounded-full mr-2"
          style={{ 
            backgroundColor: step === 1 
              ? appTheme.colors.accent.primary 
              : appTheme.colors.gray[500] 
          }}
        ></div>
        <div 
          className="w-3 h-3 rounded-full"
          style={{ 
            backgroundColor: step === 2 
              ? appTheme.colors.accent.primary 
              : appTheme.colors.gray[500] 
          }}
        ></div>
      </div>
    </div>
  );
}