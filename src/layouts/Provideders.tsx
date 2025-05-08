import React, { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ModalProvider } from '../components/modal-provider';
import AuthInitializer from '../pages/AuthPages/components/auth-initializer';
import useAppStore from '../store/useAppStore';
import { ToastContainer } from 'react-toastify';
import { appTheme } from '../constant/theme';

const Providers = ({children}: {children: ReactNode}) => {
    const { theme } = useAppStore(["theme"]);
	const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
			<AuthInitializer>
				<ModalProvider>
                    {children}
					<ToastContainer
						position="bottom-right"
						toastStyle={{
							backgroundColor: appTheme[theme].surface.primary,
							color: appTheme.text.primary,
							border: `1px solid ${appTheme[theme].neutral[200]}`,
							boxShadow: appTheme.shadows.md,
						}}
					/>
				</ModalProvider>
			</AuthInitializer>
		</QueryClientProvider>
  )
}

export default Providers