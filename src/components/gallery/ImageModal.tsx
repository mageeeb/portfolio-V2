"use client";

import React from "react";
import styles from "./Gallery.module.scss";
import { FixedSmartImage } from "./FixedSmartImage";

interface ImageModalProps {
  isOpen: boolean;
  currentImage: {
    src: string;
    alt: string;
    orientation: string;
  } | null;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  currentImage,
  onClose,
  onNext,
  onPrevious,
}) => {
  if (!isOpen || !currentImage) return null;

  // Handle keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrevious();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onNext, onPrevious]);

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <button className={styles.navButton + " " + styles.prevButton} onClick={onPrevious}>
          &lt;
        </button>
        <div className={styles.imageContainer}>
          <img
            src={currentImage.src}
            alt={currentImage.alt}
            className={styles.modalImage}
            style={{
              objectFit: "contain",
              maxWidth: "100%",
              maxHeight: "100%"
            }}
          />
        </div>
        <button className={styles.navButton + " " + styles.nextButton} onClick={onNext}>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default ImageModal;
