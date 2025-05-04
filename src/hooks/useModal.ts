// hooks/useModal.ts

import { useModalStore } from "../store/useModal";


export const useModal = () => {
  const { openModal, closeModal } = useModalStore();

  return {
    openModal: (content: React.ReactNode, options?: Parameters<typeof openModal>[2]) => 
      openModal(content, 'modal', options),
    openBottomSheet: (content: React.ReactNode, options?: Parameters<typeof openModal>[2]) => 
      openModal(content, 'bottom-sheet', options),
    openDrawer: (content: React.ReactNode, options?: Parameters<typeof openModal>[2]) => 
      openModal(content, 'drawer', options),
    closeModal,
  };
};