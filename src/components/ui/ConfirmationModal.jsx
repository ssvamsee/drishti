import React from 'react';
import * as Icons from 'lucide-react';
import { Modal, ModalFooter } from './Modal';
import { Button } from './Button';

const ConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  confirmText = 'Confirm', 
  cancelText = 'Cancel',
  variant = 'default', // 'default', 'destructive', 'warning'
  isLoading = false 
}) => {
  const getIcon = () => {
    switch (variant) {
      case 'destructive':
        return <Icons.AlertTriangle className="h-6 w-6 text-red-500" />;
      case 'warning':
        return <Icons.AlertCircle className="h-6 w-6 text-yellow-500" />;
      default:
        return <Icons.HelpCircle className="h-6 w-6 text-blue-500" />;
    }
  };

  const getButtonVariant = () => {
    switch (variant) {
      case 'destructive':
        return 'destructive';
      case 'warning':
        return 'outline';
      default:
        return 'default';
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
        <div className="flex-1">
          <p className="text-sm text-muted-foreground">
            {message}
          </p>
        </div>
      </div>

      <ModalFooter>
        <Button
          variant="outline"
          onClick={onClose}
          disabled={isLoading}
        >
          {cancelText}
        </Button>
        <Button
          variant={getButtonVariant()}
          onClick={onConfirm}
          disabled={isLoading}
          className="min-w-[100px]"
        >
          {isLoading ? (
            <>
              <Icons.Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            confirmText
          )}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ConfirmationModal; 