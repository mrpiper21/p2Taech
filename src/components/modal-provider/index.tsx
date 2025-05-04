// components/ModalProvider.tsx
import ReactDOM from 'react-dom';
import React, { useEffect, useRef } from 'react';
import { FiX } from 'react-icons/fi';
import { useModalStore } from '../../store/useModal';
import { appTheme } from '../../constant/theme';
import useAppStore from '../../store/useAppStore';

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const {theme} = useAppStore(['theme'])
  const { isOpen, content, type, options, closeModal } = useModalStore();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, closeModal]);


  const getPositionStyles = (): React.CSSProperties => {
    switch (type) {
      case 'bottom-sheet':
        return {
          bottom: 0,
          left: 0,
          right: 0,
          top: 'auto',
          transform: 'translateY(0)',
        };
      case 'drawer':
        return {
          top: 0,
          right: 0,
          bottom: 0,
          left: 'auto',
          transform: 'translateX(0)',
        };
      default: // modal
        return {
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        };
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (options.disableBackdropClose) return;
    if (e.target === e.currentTarget) closeModal();
  };

  return (
    <>
      {children}
      {isOpen && ReactDOM.createPortal(
        <div
          className="fixed inset-0 bg-black/45 bg-opacity-50 z-50"
          style={{
            ...options.overlayStyle,
            transition: `opacity ${options.animationDuration}ms ease-in-out`,
            color:
                theme === "light" ? appTheme.text.primary : appTheme.text.inverted,
          }}
          onClick={handleBackdropClick}
        >
          <div
            ref={modalRef}
            className={`absolute rounded-lg shadow-xl ${
              type === 'bottom-sheet' ? 'rounded-b-none' : ''
            } ${type === 'drawer' ? 'rounded-none' : ''}`}
            style={{
              ...getPositionStyles(),
              ...options.containerStyle,
              transition: `transform ${options.animationDuration}ms ease-in-out`,
              backgroundColor: appTheme[theme].surface.primary
            }}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
            >
              <FiX size={20} />
            </button>
            <div className="p-6">{content}</div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
};