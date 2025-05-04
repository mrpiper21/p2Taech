interface ThemeVariant {
	base: {
		primary: string;
		secondary: string;
		tertiary: string;
	};
	surface: {
		primary: string;
		secondary: string;
		elevated: string;
	};
	neutral: {
		100: string;
		200: string;
		300: string;
		400: string;
		500: string;
		600: string;
		700: string;
	};
	accent: {
		primary: string;
		secondary: string;
		tertiary: string;
	};
	status: {
		success: string;
		warning: string;
		error: string;
		info: string;
	};
}

interface AppTheme {
	light: ThemeVariant;
	dark: ThemeVariant;
	text: {
		primary: string;
		secondary: string;
		inverted: string;
		accent: string;
	};
	shadows: {
		sm: string;
		md: string;
		lg: string;
		xl: string;
		inner: string;
	};
	effects: {
		hover: string;
		active: string;
		transition: string;
	};
	radii: {
		sm: string;
		md: string;
		lg: string;
		full: string;
	};
}

export const appTheme: AppTheme = {
	light: {
		base: {
			primary: "#F8FAFC",
			secondary: "#F1F5F9",
			tertiary: "#E2E8F0",
		},
		surface: {
			primary: "#FFFFFF",
			secondary: "#F8FAFC",
			elevated: "#F1F5F9",
		},
		neutral: {
			100: "#F8FAFC",
			200: "#E2E8F0",
			300: "#CBD5E1",
			400: "#94A3B8",
			500: "#64748B",
			600: "#475569",
			700: "#334155",
		},
		accent: {
			primary: "#3B82F6",
			secondary: "#6366F1",
			tertiary: "#8B5CF6",
		},
		status: {
			success: "#10B981",
			warning: "#F59E0B",
			error: "#EF4444",
			info: "#3B82F6",
		},
	},
	dark: {
		base: {
			primary: "#0F172A", // Dark blue-gray (background)
			secondary: "#1E293B", // Slightly lighter background
			tertiary: "#334155", // Borders and accents
		},
		surface: {
			primary: "#1E293B", // Card backgrounds
			secondary: "#0F172A", // Secondary surfaces
			elevated: "#334155", // Elevated components
		},
		neutral: {
			100: "#0F172A",
			200: "#334155",
			300: "#475569",
			400: "#64748B",
			500: "#94A3B8",
			600: "#CBD5E1",
			700: "#E2E8F0", // Lightest gray (for text)
		},
		accent: {
			primary: "#60A5FA", // Brighter blue for better visibility
			secondary: "#818CF8", // Brighter indigo
			tertiary: "#A78BFA", // Brighter purple
		},
		status: {
			success: "#34D399", // Brighter green
			warning: "#FBBF24", // Brighter amber
			error: "#F87171", // Brighter red
			info: "#60A5FA", // Matches primary accent
		},
	},
	text: {
		primary: "#1E293B", // Dark slate (light mode)
		secondary: "#475569", // Secondary text
		inverted: "#FFFFFF", // Text on colored backgrounds
		accent: "#3B82F6", // Accent text
	},
	shadows: {
		sm: "0 1px 2px rgba(30, 41, 59, 0.05)",
		md: "0 4px 6px rgba(30, 41, 59, 0.1)",
		lg: "0 10px 15px rgba(30, 41, 59, 0.1)",
		xl: "0 20px 25px rgba(30, 41, 59, 0.1)",
		inner: "inset 0 2px 4px rgba(30, 41, 59, 0.05)",
	},
	effects: {
		hover: "brightness(0.97)",
		active: "brightness(0.95)",
		transition: "all 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
	},
	radii: {
		sm: "4px",
		md: "8px",
		lg: "12px",
		full: "9999px",
	},
};
