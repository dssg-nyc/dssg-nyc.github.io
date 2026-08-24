import { useEffect } from 'react';
import './DonateModal.css';

const GIVEBUTTER_EMBED_URL = 'https://givebutter.com/embed/c/aiforgood';

const DonateModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="donate-modal-backdrop" onClick={onClose}>
      <div
        className="donate-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Donate to NYC x DSSG"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="donate-modal-close" onClick={onClose} aria-label="Close donate dialog">
          &times;
        </button>
        <iframe
          className="donate-modal-iframe"
          src={GIVEBUTTER_EMBED_URL}
          title="Donate to NYC x DSSG via Givebutter"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default DonateModal;
