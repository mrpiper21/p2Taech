import { RouterProvider } from 'react-router-dom';
import router from './routes';
import { ToastContainer } from "react-toastify";
import useAppStore from "./store/useAppStore";
import { appTheme } from "./constant/theme";
import { ModalProvider } from "./components/modal-provider";
import AuthInitializer from "./pages/AuthPages/components/auth-initializer";

function App() {
	const { theme } = useAppStore(["theme"]);

	return (
		<AuthInitializer>
			<ModalProvider>
				<RouterProvider router={router} />
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
	);
}

export default App;