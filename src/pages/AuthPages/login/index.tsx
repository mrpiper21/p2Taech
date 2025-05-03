/* eslint-disable @typescript-eslint/no-explicit-any */
// pages/Login.tsx
import { useState } from 'react';
import { TValidationError } from '../../../@types/oauth.type';
import { AuthHeader } from '../components/auth-header';
import { FormInput } from '../../../components/form/FormInput';
import { RememberMe } from '../../../components/atoms/RememberMe';
import { AuthButton } from '../components/auth-button';
import { AuthFooter } from '../components/auth-footer';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<TValidationError>({email: "", password: ""});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: TValidationError = {email: "", password: ""};
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Validation result:", validate());
    // if (!validate()) return;
  
    setIsSubmitting(true);
    
    try {
      const response = await axios.post(
        "http://localhost:3001/api/user/auth/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
  
      if (!response?.data?.success) {
        toast.error(response.data.message);
        return;
      }
  
      toast.success(response.data.message);
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(
        error.response?.data?.message ||
        error.message ||
        "Login failed. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof TValidationError]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="space-y-6">
      <AuthHeader 
        title="Welcome back" 
        subtitle="Please enter your credentials to login" 
      />

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          label="Email address"
          error={errors.email}
          placeholder="Enter your email"
        />

        <FormInput
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          label="Password"
          error={errors.password}
          placeholder="Enter your password"
        />

        <div className="flex items-center justify-between">
          <RememberMe />
          {/* <ForgotPasswordLink /> */}
        </div>

        <AuthButton
          type="submit"
          disabled={isSubmitting}
          isLoading={isSubmitting}
          label="Sign in"
        />
      </form>

      <AuthFooter 
        promptText="Don't have an account?"
        linkText="Sign up"
        linkPath="/auth/register"
      />
    </div>
  );
};

export default Login