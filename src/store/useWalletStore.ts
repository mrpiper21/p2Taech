/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { ethers } from "ethers";

// Define the EIP6963 interfaces
interface EIP6963ProviderInfo {
	uuid: string;
	name: string;
	icon: string;
	rdns: string;
}

interface EIP6963Provider {
	request: (args: { method: string; params?: any[] }) => Promise<any>;
	on: (eventName: string, listener: any) => void;
	removeListener: (eventName: string, listener: any) => void;
}

interface EIP6963ProviderDetail {
	info: EIP6963ProviderInfo;
	provider: EIP6963Provider;
	_listeners?: {
		accountsChanged: (accounts: string[]) => void;
		chainChanged: (chainId: string) => void;
	};
}

interface WalletState {
	provider: EIP6963ProviderDetail | null;
	account: string;
	balance: string;
	chainId: string;
	error: string | null;
	connectWallet: (provider: EIP6963ProviderDetail) => Promise<void>;
	disconnectWallet: () => void;
	updateBalance: () => Promise<void>;
}

export const useWalletStore = create<WalletState>()(
	persist(
		(set, get) => ({
			provider: null,
			account: "",
			balance: "",
			chainId: "",
			error: null,

			connectWallet: async (provider) => {
				try {
					// Disconnect previous provider
					get().disconnectWallet();

					// Request accounts
					const accounts = (await provider.provider.request({
						method: "eth_requestAccounts",
					})) as string[];

					// Get initial balance and chain ID
					const [balance, chainId] = await Promise.all([
						provider.provider.request({
							method: "eth_getBalance",
							params: [accounts[0], "latest"],
						}) as Promise<string>,
						provider.provider.request({
							method: "eth_chainId",
						}) as Promise<string>,
					]);

					// Create listener handlers
					const handleAccountsChanged = (accounts: string[]) => {
						if (accounts.length === 0) get().disconnectWallet();
						else set({ account: accounts[0] });
						get().updateBalance();
					};

					const handleChainChanged = (chainId: string) => {
						set({ chainId: Number(chainId).toString(16) });
						get().updateBalance();
					};

					// Add listeners
					provider.provider.on("accountsChanged", handleAccountsChanged);
					provider.provider.on("chainChanged", handleChainChanged);

					set({
						provider: {
							...provider,
							_listeners: {
								accountsChanged: handleAccountsChanged,
								chainChanged: handleChainChanged,
							},
						},
						account: accounts[0],
						balance: ethers.formatEther(balance),
						chainId: Number(chainId).toString(16),
						error: null,
					});
				} catch (error) {
					set({
						error:
							error instanceof Error
								? error.message
								: "Failed to connect wallet",
					});
				}
			},

			disconnectWallet: () => {
				const { provider } = get();
				if (provider && provider._listeners) {
					provider.provider.removeListener(
						"accountsChanged",
						provider._listeners.accountsChanged
					);
					provider.provider.removeListener(
						"chainChanged",
						provider._listeners.chainChanged
					);
				}
				set({
					provider: null,
					account: "",
					balance: "",
					chainId: "",
					error: null,
				});
			},

			updateBalance: async () => {
				const { provider, account } = get();
				if (!provider || !account) return;

				try {
					const balance = (await provider.provider.request({
						method: "eth_getBalance",
						params: [account, "latest"],
					})) as string;

					set({ balance: ethers.formatEther(balance) });
				} catch (error) {
					set({
						error:
							error instanceof Error
								? error.message
								: "Failed to update balance",
					});
				}
			},
		}),
		{
			name: "wallet-storage",
			storage: createJSONStorage(() => localStorage),
		}
	)
);