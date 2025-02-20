import React from "react";
import { iconLibrary } from "@/once-ui/icons"; // Importez votre fichier icons ici
import { Flex, Column, Text } from "@/once-ui/components";

type TechnicalSkills = {
    title: string;
    description?: string;
    icons: string[]; // Liste des clés de `iconLibrary`
};

type TechnicalSkillsProps = {
    skills: TechnicalSkills[];
};

const TechnicalSkills: React.FC<TechnicalSkillsProps> = ({ skills }) => {
    return (
        <Column fillWidth gap="l">
            {skills.map((skill, index) => (
                <Column key={`${skill.title}-${index}`} fillWidth gap="4">
                    <Text variant="heading-strong-l">{skill.title}</Text> {/* Titre de la catégorie */}
                    <Text variant="body-default-m" onBackground="neutral-weak">
                        {skill.description || "Aucune description disponible"}
                    </Text>

                    {/* Rendu des icônes associées */}
                    {skill.icons && skill.icons.length > 0 && (
                        <Flex fillWidth paddingTop="m" gap="12" wrap>
                            {skill.icons.map((iconName, iconIndex) => {
                                const IconComponent = iconLibrary[iconName];

                                // Vérifiez si l'icône existe dans la bibliothèque
                                if (!IconComponent) {
                                    console.warn(`Icône non trouvée dans iconLibrary : ${iconName}`);
                                    return null;
                                }

                                return (
                                    <Flex
                                        key={iconIndex}
                                        border="neutral-medium"
                                        radius="m"
                                        align="center"
                                        horizontal="center"
                                        style={{
                                            minWidth: "48px",
                                            height: "48px",
                                        }}
                                        background="neutral-alpha-weak"
                                    >
                                        <IconComponent size={32} color="currentColor" />
                                    </Flex>
                                );
                            })}
                        </Flex>
                    )}
                </Column>
            ))}
        </Column>
    );
};

export default TechnicalSkills;