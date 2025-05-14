/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from "react";
import { useSyncProviders } from "../hooks/useSyncProviders";
import { appTheme } from "../constant/theme";
import { FiPocket, FiChevronDown } from "react-icons/fi";
import { useWalletStore } from "../store/useWalletStore";
import useAppStore from "../store/useAppStore";
import { useDebounce } from "../hooks/useDebounce";

const Wallet = () => {
	const providers = useSyncProviders();
	const { provider, account, connectWallet, disconnectWallet, updateBalance } =
		useWalletStore();
	const { theme } = useAppStore(["theme"]);
	const [isOpen, setIsOpen] = React.useState(false);
	const wrapperRef = useRef<HTMLDivElement>(null);
	const debouncedUpdateBalance = useDebounce(updateBalance, 1000);

	// Click outside handler
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				wrapperRef.current &&
				!wrapperRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	// Balance polling
	useEffect(() => {
		const interval = setInterval(debouncedUpdateBalance, 5000);
		return () => clearInterval(interval);
	}, [debouncedUpdateBalance]);

	// Cleanup on unmount
	useEffect(() => () => disconnectWallet(), [disconnectWallet]);

	return (
		<div ref={wrapperRef} className="relative wallet-container">
			{providers.length > 0 ? (
				<>
					<button
						onClick={() => (account ? disconnectWallet() : setIsOpen(!isOpen))}
						className="flex items-center gap-2 py-2 px-4 rounded-full transition-all"
						style={{
							backgroundColor: appTheme[theme].surface.secondary,
							opacity: isOpen ? 0.9 : 1,
						}}
					>
						{account ? (
							<div className="flex items-center gap-2">
								<img
									className="h-6 w-6 rounded-full"
									src={provider?.info.icon}
									alt={provider?.info.name}
								/>
								<div className="flex flex-col items-start">
									<span
										className="text-sm font-medium"
										style={{ color: appTheme[theme].neutral[500] }}
									>
										{`${account.slice(0, 6)}...${account.slice(-4)}`}
									</span>
									{/* <span
                    className="text-xs"
                    style={{ color: appTheme[theme].neutral[400] }}
                  >
                    {parseFloat(balance || '0').toFixed(4)} ETH
                  </span> */}
								</div>
							</div>
						) : (
							<>
								<FiPocket color={appTheme[theme].accent.secondary} size={24} />
								<span
									className="text-sm"
									style={{ color: appTheme[theme].neutral[500] }}
								>
									Connect Wallet
								</span>
							</>
						)}
						<FiChevronDown
							color={appTheme[theme].neutral[500]}
							className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
						/>
					</button>

					{isOpen && (
						<div
							className="absolute mt-2 w-full min-w-[200px] rounded-lg shadow-lg py-2 z-50"
							style={{
								backgroundColor: appTheme[theme].surface.primary,
								border: `1px solid ${appTheme[theme].neutral[100]}`,
							}}
						>
							<div className="flex flex-col gap-2">
								{providers.map((provider) => (
									<button
										key={provider.info.uuid}
										onClick={() => {
											connectWallet(provider as any);
											setIsOpen(false);
										}}
										className="flex items-center gap-3 px-4 py-2 hover:bg-opacity-10 transition-colors"
										style={{
											color: appTheme[theme].neutral[500],
										}}
									>
										<img
											className="h-6 w-6"
											src={provider.info.icon}
											alt={provider.info.name}
										/>
										<span className="text-sm">{provider.info.name}</span>
									</button>
								))}
							</div>
						</div>
					)}
				</>
			) : (
				<div
					className="flex items-center gap-2 py-2 px-4 rounded-full"
					style={{
						backgroundColor: appTheme[theme].surface.secondary,
					}}
				>
					<FiPocket color={appTheme[theme].accent.secondary} size={24} />
					<span
						style={{ color: appTheme[theme].neutral[500] }}
						className="text-sm"
					>
						No Wallet Detected
					</span>
				</div>
			)}
		</div>
	);
};

export default Wallet;
