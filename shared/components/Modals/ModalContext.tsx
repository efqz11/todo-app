import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ModalManager } from './ModalManager';

interface ModalContextProps {
  openModal: (modalType: string, props?: any) => void;
  closeModal: () => void;
  modalType: string | null;
  modalProps: any;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [modalType, setModalType] = useState<string | null>(null);
  const [modalProps, setModalProps] = useState<any>(null);

  const openModal = (type: string, props: any = {}) => {
    setModalType(type);
    setModalProps(props);
  };

  const closeModal = () => {
    setModalType(null);
    setModalProps(null);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal, modalType, modalProps }}>
      {children}
      {modalType && <ModalManager type={modalType} props={modalProps} closeModal={closeModal} />}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};