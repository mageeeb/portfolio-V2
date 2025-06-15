"use client";

import React, { useState, useEffect } from "react";
import { Heading, Flex, Text, Button, Column, RevealFx } from "@/once-ui/components";
import { baseURL } from "@/app/resources";
import { person } from "@/app/resources/content";
import { createRandomGroups } from "@/app/utils/hasardUtils";

export default function Hasard() {
  // State for student names
  const [students, setStudents] = useState(() => {
    // Check if we're in the browser environment
    if (typeof window !== 'undefined') {
      const savedStudents = localStorage.getItem('hasardStudents');
      return savedStudents ? JSON.parse(savedStudents) : Array(6).fill("");
    }
    return Array(6).fill("");
  });

  // State for groups
  const [groups, setGroups] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Save students to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('hasardStudents', JSON.stringify(students));
    }
  }, [students]);

  // Handle input change for student names
  const handleStudentChange = (index, value) => {
    const newStudents = [...students];
    newStudents[index] = value;
    setStudents(newStudents);
  };

  // Generate random groups
  const generateGroups = () => {
    // Validate that all student names are filled
    if (students.some(student => !student.trim())) {
      alert("Veuillez entrer les noms de tous les élèves.");
      return;
    }

    setIsAnimating(true);
    setShowResults(false);

    setTimeout(() => {
      try {
        // Use the utility function to create random groups
        const randomGroups = createRandomGroups(students);
        setGroups(randomGroups);
        setShowResults(true);
      } catch (error) {
        alert(error.message);
      } finally {
        setIsAnimating(false);
      }
    }, 800);
  };

  return (
    <Column maxWidth="m" gap="xl" horizontal="center">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Hasard",
            description: "Application pour sélectionner aléatoirement des groupes d'élèves",
            url: `https://${baseURL}/hasard`,
            publisher: {
              "@type": "Person",
              name: person.name,
              image: {
                "@type": "ImageObject",
                url: `${baseURL}${person.avatar}`,
              },
            },
          }),
        }}
      />

      {/* Header Section */}
      <Column fillWidth paddingY="l" gap="m">
        <RevealFx translateY="4" fillWidth horizontal="center" paddingBottom="m">
          <Heading wrap="balance" variant="display-strong-l" align="center">
            Générateur de Groupes Aléatoires
          </Heading>
        </RevealFx>
        <RevealFx translateY="8" delay={0.2} fillWidth horizontal="center" paddingBottom="l">
          <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl" align="center">
            Cette application choisit au hasard 2 groupes de trois élèves sur une classe de 6
          </Text>
        </RevealFx>
      </Column>

      {/* Student Input Form */}
      <RevealFx translateY="16" delay={0.3}>
        <Column 
          fillWidth 
          gap="m" 
          padding="xl" 
          background="surface" 
          border="neutral-medium" 
          radius="l"
          style={{
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
            marginBottom: "24px",
            borderWidth: "2px",
            borderStyle: "solid",
            borderImage: "linear-gradient(45deg, var(--color-brand-border-medium), var(--color-accent-border-medium)) 1"
          }}
        >
          <Heading 
            variant="heading-strong-l" 
            align="center"
            style={{
              marginBottom: "16px",
              background: "linear-gradient(45deg, var(--color-brand-on-background-strong), var(--color-accent-on-background-strong))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              padding: "8px 0"
            }}
          >
            Entrez les noms des élèves
          </Heading>

          <Flex fillWidth wrap gap="m" paddingBottom="l">
            {students.map((student, index) => (
              <Flex 
                key={index} 
                flex={1} 
                minWidth="200px"
                padding="s"
              >
                <input
                  type="text"
                  value={student}
                  onChange={(e) => handleStudentChange(index, e.target.value)}
                  placeholder={`Élève ${index + 1}`}
                  style={{
                    padding: "12px 16px",
                    borderRadius: "8px",
                    border: "2px solid var(--color-brand-border-medium)",
                    background: "var(--color-surface-background)",
                    color: "var(--color-neutral-on-background)",
                    width: "100%",
                    fontSize: "16px",
                    transition: "all 0.2s ease-in-out",
                    outline: "none",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)"
                  }}
                />
              </Flex>
            ))}
          </Flex>

          <Flex horizontal="center" paddingTop="m">
            <Button 
              variant="primary" 
              onClick={generateGroups}
              style={{
                padding: "12px 32px",
                fontSize: "16px",
                borderRadius: "8px",
                transition: "all 0.2s ease-in-out",
                transform: "scale(1)",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
              }}
            >
              Générer les groupes
            </Button>
          </Flex>
        </Column>
      </RevealFx>

      {/* Results Section */}
      {showResults && (
        <RevealFx translateY="16" delay={0.4}>
          <Column 
            fillWidth 
            gap="m" 
            padding="xl" 
            background="surface" 
            border="neutral-medium" 
            radius="l"
            style={{
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
              marginTop: "24px",
              borderWidth: "2px",
              borderStyle: "solid",
              borderImage: "linear-gradient(45deg, var(--color-accent-border-medium), var(--color-brand-border-medium)) 1"
            }}
          >
            <Heading 
              variant="heading-strong-l" 
              align="center"
              style={{
                marginBottom: "16px",
                background: "linear-gradient(45deg, var(--color-accent-on-background-strong), var(--color-brand-on-background-strong))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                padding: "8px 0"
              }}
            >
              Résultats
            </Heading>

            <Flex fillWidth gap="xl" mobileDirection="column">
              {groups.map((group, groupIndex) => (
                <Column 
                  key={groupIndex} 
                  flex={1} 
                  padding="l" 
                  background={groupIndex === 0 ? "brand-background-weak" : "accent-background-weak"} 
                  border="neutral-medium" 
                  radius="l"
                  style={{
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Heading 
                    variant="heading-strong-m" 
                    align="center"
                    style={{
                      marginBottom: "16px",
                      color: groupIndex === 0 ? "var(--color-brand-on-background-strong)" : "var(--color-accent-on-background-strong)"
                    }}
                  >
                    Groupe {groupIndex + 1}
                  </Heading>

                  {group.map((student, studentIndex) => (
                    <Flex 
                      key={studentIndex} 
                      fillWidth 
                      padding="m" 
                      margin="xs"
                      background="surface" 
                      border="neutral-medium" 
                      radius="m"
                      style={{
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <Text 
                        variant="body-strong-m"
                        style={{
                          fontSize: "18px"
                        }}
                      >
                        {student}
                      </Text>
                    </Flex>
                  ))}
                </Column>
              ))}
            </Flex>
          </Column>
        </RevealFx>
      )}
    </Column>
  );
}
