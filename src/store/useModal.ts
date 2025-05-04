// store/modalStore.ts
import { create } from 'zustand';
import { ReactNode } from 'react';

type ModalType = 'modal' | 'bottom-sheet' | 'drawer';

type ModalOptions = {
  overlayStyle?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
  animationDuration?: number;
  disableBackdropClose?: boolean;
  onClose?: () => void;
};

type ModalState = {
  isOpen: boolean;
  content: ReactNode | null;
  type: ModalType;
  options: ModalOptions;
  openModal: (content: ReactNode, type?: ModalType, options?: ModalOptions) => void;
  closeModal: () => void;
};

const defaultOptions: ModalOptions = {
  animationDuration: 300,
  disableBackdropClose: false,
};

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  content: null,
  type: 'modal',
  options: defaultOptions,
  openModal: (content, type = 'modal', options = {}) => set({
    isOpen: true,
    content,
    type,
    options: { ...defaultOptions, ...options }
  }),
  closeModal: () => set({ isOpen: false }),
}));