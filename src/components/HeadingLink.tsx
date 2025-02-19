"use client";

import React from "react"; // Assurez-vous que React est importé !
import { Heading, Flex, IconButton, useToast } from "@/once-ui/components";

import styles from "@/components/HeadingLink.module.scss";

interface HeadingLinkProps {
  id: string; // Identifiant pour l'ancre
  level: 1 | 2 | 3 | 4 | 5 | 6; // Niveau du heading
  children: React.ReactNode; // Enfants contenus à l'intérieur du heading
  style?: React.CSSProperties; // Style inline optionnel
}

// Composant React principal
export const HeadingLink: React.FC<HeadingLinkProps> = ({ id, level, children, style }) => {
  const { addToast } = useToast(); // Hook personnalisé pour afficher des notifications

  // Fonction pour copier l'URL dans le presse-papiers
  const copyURL = (id: string): void => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    navigator.clipboard.writeText(url).then(
        () => {
          addToast({
            variant: "success",
            message: "Link copied to clipboard.", // Message de succès
          });
        },
        () => {
          addToast({
            variant: "danger",
            message: "Failed to copy link.", // Message d'erreur
          });
        },
    );
  };

  // Gestion des variantes de styles en fonction du niveau
  const variantMap = {
    1: "display-strong-xs",
    2: "heading-strong-xl",
    3: "heading-strong-l",
    4: "heading-strong-m",
    5: "heading-strong-s",
    6: "heading-strong-xs",
  } as const;

  const variant = variantMap[level]; // Déduit la variante à utiliser
  const asTag = `h${level}` as React.ElementType; // Définit le tag comme une balise (h1, h2, etc.)

  return (
      <Flex
          style={style} // Applique les styles passés comme props
          onClick={() => copyURL(id)} // Lorsque l'élément est cliqué
          className={styles.control} // Classe CSS personnalisée
          vertical="center"
          gap="4"
      >
        {/* Utilisation d'un heading personnalisé */}
        <Heading className={styles.text} id={id} variant={variant} as={asTag}>
          {children}
        </Heading>

        {/* Bouton pour copier l'ancre */}
        <IconButton
            className={styles.visibility}
            size="s"
            icon="openLink"
            variant="ghost"
            tooltip="Copy"
            tooltipPosition="right"
        />
      </Flex>
  );
};