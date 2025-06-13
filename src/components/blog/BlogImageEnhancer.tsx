"use client";

import React, { useEffect, useState, useRef } from "react";
import { ImageGallery } from "./ImageGallery";
import "./blog-image-styles.css";

interface BlogImageEnhancerProps {
  content: string;
  images?: string[];
}

export const BlogImageEnhancer: React.FC<BlogImageEnhancerProps> = ({ 
  content,
  images = []
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [galleryImages, setGalleryImages] = useState<string[]>(images);
  const [processedContent, setProcessedContent] = useState(content);

  useEffect(() => {
    // If images are provided, use them
    if (images && images.length > 0) {
      setGalleryImages(images);
      return;
    }

    // Otherwise, extract images from content
    if (contentRef.current) {
      const imgElements = contentRef.current.querySelectorAll('img');
      const extractedImages = Array.from(imgElements).map(img => img.src);

      if (extractedImages.length > 0) {
        setGalleryImages(extractedImages);

        // Add click handlers to images
        imgElements.forEach((img, index) => {
          img.style.cursor = 'pointer';
          img.addEventListener('click', (e) => {
            e.preventDefault();
            // We'll use a custom event to open the gallery
            const event = new CustomEvent('openGallery', { 
              detail: { index } 
            });
            document.dispatchEvent(event);
          });
        });
      }
    }
  }, [content, images]);

  // If we have gallery images from metadata, show them at the top
  if (images && images.length > 0) {
    return (
      <>
        <ImageGallery images={galleryImages} />
        <div 
          dangerouslySetInnerHTML={{ __html: content }} 
          ref={contentRef}
          data-blog-content="true"
        />
      </>
    );
  }

  // If we're extracting images from content
  const [showGallery, setShowGallery] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleOpenGallery = (e: Event) => {
      const customEvent = e as CustomEvent;
      setCurrentIndex(customEvent.detail.index);
      setShowGallery(true);
    };

    document.addEventListener('openGallery', handleOpenGallery);
    return () => {
      document.removeEventListener('openGallery', handleOpenGallery);
    };
  }, []);

  return (
    <>
      <div 
        dangerouslySetInnerHTML={{ __html: content }} 
        ref={contentRef}
        data-blog-content="true"
      />
      {showGallery && galleryImages.length > 0 && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999 }}>
          <ImageGallery 
            images={galleryImages} 
            initialIndex={currentIndex} 
          />
        </div>
      )}
    </>
  );
};
