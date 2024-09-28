import React from 'react';
import { ConfirmationModal } from '.';

interface ModalManagerProps {
  type: string;
  props: any;
  closeModal: () => void;
}

export const ModalManager: React.FC<ModalManagerProps> = ({ type, props, closeModal }) => {
    switch (type) {
      case 'confirmation':
        return (
          <ConfirmationModal
            isOpen={true}
            title={props.title || 'Confirm Action'}
            message={props.message || 'Are you sure?'}
            confirmLabel={props.confirmLabel || 'Yes'}
            cancelLabel={props.cancelLabel || 'No'}
            onConfirm={() => {
              props.onConfirm(); // Call the confirm action passed from props
              closeModal(); // Close the modal
            }}
            onCancel={closeModal} // Close the modal on cancel
          />
        );

      // Handle other modals here
      default:
        return null;
    }
  };
