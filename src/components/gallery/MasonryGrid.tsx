"use client";

import { useState } from "react";
import Masonry from "react-masonry-css";
import styles from "./Gallery.module.scss";
import { gallery } from "@/app/resources/content";
import ImageModal from "./ImageModal";
import { FixedSmartImage } from "./FixedSmartImage";

export default function MasonryGrid() {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const breakpointColumnsObj = {
    default: 4,
    1440: 3,
    1024: 2,
    560: 1,
  };

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === gallery.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? gallery.images.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={styles.masonryGrid}
        columnClassName={styles.masonryGridColumn}
      >
        {gallery.images.map((image, index) => (
          <div key={index} onClick={() => handleImageClick(index)}>
            <FixedSmartImage
              priority={index < 10}
              sizes="(max-width: 560px) 100vw, (max-width: 1024px) 50vw, (max-width: 1440px) 33vw, 25vw"
              radius="m"
              aspectRatio={image.orientation === "horizontal" ? "16 / 9" : "9 / 16"}
              src={image.src}
              alt={image.alt}
              className={styles.gridItem}
            />
          </div>
        ))}
      </Masonry>

      <ImageModal
        isOpen={modalOpen}
        currentImage={modalOpen ? gallery.images[currentImageIndex] : null}
        onClose={handleCloseModal}
        onNext={handleNextImage}
        onPrevious={handlePreviousImage}
      />
    </>
  );
}
