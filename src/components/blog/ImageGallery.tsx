"use client";

import React, { useState, useEffect } from "react";
import { Flex } from "@/once-ui/components/Flex";
import { SmartImage } from "@/once-ui/components/SmartImage";
import { Icon } from "@/once-ui/components/Icon";
import { Heading } from "@/once-ui/components/Heading";
import styles from "./ImageGallery.module.scss";
import classNames from "classnames";

interface ImageGalleryProps {
  images: string[];
  initialIndex?: number;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ 
  images, 
  initialIndex = 0 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        setIsOpen(false);
      } else if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      } else if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, images.length]);

  // Prevent body scrolling when gallery is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const openGallery = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeGallery = () => {
    setIsOpen(false);
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <Flex gap="16" wrap="wrap" horizontal="center" className={styles.galleryContainer}>
        <Heading variant="heading-strong-l" className={styles.galleryHeading}>
          Galerie Photo
        </Heading>
        {images.map((src, index) => (
          <Flex 
            key={index} 
            className={styles.galleryItem}
            onClick={() => openGallery(index)}
          >
            <SmartImage
              src={src}
              alt={`Gallery image ${index + 1}`}
              aspectRatio="4 / 3"
              objectFit="cover"
              radius="m"
              enlarge={false}
            />
          </Flex>
        ))}
      </Flex>

      {isOpen && (
        <Flex
          className={styles.modalOverlay}
          horizontal="center"
          vertical="center"
          onClick={closeGallery}
        >
          <Flex
            className={styles.closeButton}
            onClick={closeGallery}
          >
            <Icon name="close" size="m" />
          </Flex>

          <Flex
            className={styles.navigationButton}
            style={{ left: "16px" }}
            onClick={goToPrev}
          >
            <Icon name="chevronLeft" size="m" />
          </Flex>

          <Flex
            className={styles.navigationButton}
            style={{ right: "16px" }}
            onClick={goToNext}
          >
            <Icon name="chevronRight" size="m" />
          </Flex>

          <Flex
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "90vw",
              maxHeight: "90vh",
              position: "relative",
              zIndex: 1001
            }}
          >
            <img
              src={images[currentIndex]}
              alt={`Gallery image ${currentIndex + 1}`}
              style={{
                maxHeight: "90vh",
                width: "auto",
                maxWidth: "90vw",
                objectFit: "contain"
              }}
            />
          </Flex>

          <Flex
            className={styles.indicatorContainer}
            horizontal="center"
            gap="8"
          >
            {images.map((_, index) => (
              <Flex
                key={index}
                className={classNames(
                  styles.indicator,
                  index === currentIndex ? styles.indicatorActive : styles.indicatorInactive
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(index);
                }}
              />
            ))}
          </Flex>
        </Flex>
      )}
    </>
  );
};
