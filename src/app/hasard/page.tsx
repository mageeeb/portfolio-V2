"use client";

import React, { useState, useEffect, useMemo, useCallback, memo } from "react";
import { Heading, Flex, Text, Button, Column, RevealFx } from "@/once-ui/components";
import { baseURL } from "@/app/resources";
import { person } from "@/app/resources/content";
import { createRandomGroups } from "@/app/utils/hasardUtils";

// Memoized components for better performance
const StudentInput = memo(({ index, value, onChange }) => (
  <Flex 
    key={index} 
    flex={1} 
    minWidth="200px"
    padding="s"
  >
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(index, e.target.value)}
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
));

// Define keyframe animations
const animationStyles = `
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes shake {
    0% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    50% { transform: translateX(5px); }
    75% { transform: translateX(-5px); }
    100% { transform: translateX(0); }
  }

  @keyframes confetti {
    0% { 
      transform: translateY(0) rotate(0deg); 
      opacity: 1;
    }
    100% { 
      transform: translateY(100vh) rotate(720deg); 
      opacity: 0;
    }
  }

  @keyframes scaleIn {
    0% {
      transform: scale(0);
      opacity: 0;
    }
    80% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes loading {
    0% {
      left: -30%;
      width: 30%;
    }
    50% {
      width: 50%;
    }
    100% {
      left: 100%;
      width: 30%;
    }
  }
`;

export default function Hasard() {
  // State to track if the page has loaded
  const [isLoaded, setIsLoaded] = useState(false);

  // State for number of students (between 6 and 9)
  const [studentCount, setStudentCount] = useState(() => {
    // Check if we're in the browser environment
    if (typeof window !== 'undefined') {
      const savedCount = localStorage.getItem('hasardStudentCount');
      return savedCount ? parseInt(savedCount, 10) : 6;
    }
    return 6;
  });

  // State for student names
  const [students, setStudents] = useState(() => {
    // Check if we're in the browser environment
    if (typeof window !== 'undefined') {
      const savedStudents = localStorage.getItem('hasardStudents');
      return savedStudents ? JSON.parse(savedStudents) : Array(studentCount).fill("");
    }
    return Array(studentCount).fill("");
  });

  // State for groups
  const [groups, setGroups] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);
  const [shuffledStudents, setShuffledStudents] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);

  // Set isLoaded to true after initial render
  useEffect(() => {
    // Use requestIdleCallback if available, otherwise setTimeout
    if (typeof window !== 'undefined') {
      if ('requestIdleCallback' in window) {
        // @ts-ignore
        window.requestIdleCallback(() => {
          setIsLoaded(true);
        });
      } else {
        setTimeout(() => {
          setIsLoaded(true);
        }, 200);
      }
    }
  }, []);

// Memoized confetti component for better performance
const Confetti = memo(() => {
  // Generate confetti particles only once using useMemo
  const confettiElements = useMemo(() => {
    // Reduce confetti count for better performance
    const confettiCount = 50; // Further reduced for better performance
    const elements = [];

    // Pre-calculate random values to avoid doing it in the render loop
    const randomValues = Array(confettiCount).fill(0).map(() => ({
      left: Math.random() * 100,
      duration: 2 + Math.random() * 1.5,
      size: 4 + Math.random() * 8,
      hue: Math.floor(Math.random() * 360),
      saturation: 70 + Math.floor(Math.random() * 30),
      lightness: 60 + Math.floor(Math.random() * 20),
      isCircle: Math.random() > 0.5,
      rotation: Math.random() * 360,
      delay: Math.random() * 0.3
    }));

    // Create confetti elements using the pre-calculated values
    for (let i = 0; i < confettiCount; i++) {
      const rv = randomValues[i];
      elements.push(
        <div
          key={i}
          style={{
            position: "fixed",
            left: `${rv.left}%`,
            top: "-20px",
            width: `${rv.size}px`,
            height: `${rv.size}px`,
            backgroundColor: `hsl(${rv.hue}, ${rv.saturation}%, ${rv.lightness}%)`,
            borderRadius: rv.isCircle ? "50%" : "0",
            animation: `confetti ${rv.duration}s ease-in-out forwards`,
            animationDelay: `${rv.delay}s`,
            zIndex: 100,
            transform: `rotate(${rv.rotation}deg)`,
            opacity: 0.8,
            willChange: "transform" // Hint to browser to optimize animations
          }}
        />
      );
    }

    return elements;
  }, []); // Empty dependency array means this runs only once

  return <>{confettiElements}</>;
});

  // Save students and studentCount to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('hasardStudents', JSON.stringify(students));
    }
  }, [students]);

  // Save studentCount to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('hasardStudentCount', studentCount.toString());
    }
  }, [studentCount]);

  // Update students array when studentCount changes
  useEffect(() => {
    // If studentCount increases, add empty strings to the array
    if (studentCount > students.length) {
      setStudents(prev => [...prev, ...Array(studentCount - prev.length).fill("")]);
    } 
    // If studentCount decreases, remove elements from the end
    else if (studentCount < students.length) {
      setStudents(prev => prev.slice(0, studentCount));
    }
  }, [studentCount, students.length]);

  // Handle input change for student names - optimized with useCallback
  const handleStudentChange = useCallback((index, value) => {
    setStudents(prev => {
      const newStudents = [...prev];
      newStudents[index] = value;
      return newStudents;
    });
  }, []);

  // Handle changing the number of students - optimized with useCallback
  const handleStudentCountChange = useCallback((increment) => {
    setStudentCount(prev => {
      const newCount = prev + increment;
      // Ensure the count stays between 6 and 9
      return newCount >= 6 && newCount <= 9 ? newCount : prev;
    });
  }, []);

  // Generate random groups - optimized for performance with useCallback
  const generateGroups = useCallback(() => {
    // Validate that all student names are filled
    if (students.some(student => !student.trim())) {
      alert("Veuillez entrer les noms de tous les élèves.");
      return;
    }

    // Reset animation state
    setIsAnimating(true);
    setShowResults(false);
    setAnimationStep(0);
    setShuffledStudents([]);

    // Pre-calculate shuffled arrays to reduce state updates
    const preCalculatedShuffles = [];
    let currentShuffle = [...students];

    // Create 5 pre-calculated shuffles
    for (let i = 0; i < 5; i++) {
      const newShuffle = [...currentShuffle];
      for (let j = 0; j < newShuffle.length; j++) {
        const randomIndex = Math.floor(Math.random() * newShuffle.length);
        [newShuffle[j], newShuffle[randomIndex]] = [newShuffle[randomIndex], newShuffle[j]];
      }
      preCalculatedShuffles.push([...newShuffle]);
      currentShuffle = newShuffle;
    }

    // Pre-calculate the final groups
    const finalGroups = createRandomGroups(students);

    // Animation sequence with reduced state updates
    const runAnimationSequence = async () => {
      try {
        // Step 1: Show original list
        setAnimationStep(1);
        await new Promise(resolve => setTimeout(resolve, 600)); // Slightly faster

        // Step 2: Shuffle the students with animation
        setAnimationStep(2);
        setShuffledStudents(students);

        // Visual shuffling effect with pre-calculated shuffles
        for (let i = 0; i < preCalculatedShuffles.length; i++) {
          await new Promise(resolve => setTimeout(resolve, 180)); // Slightly faster
          setShuffledStudents(preCalculatedShuffles[i]);
        }

        await new Promise(resolve => setTimeout(resolve, 400)); // Slightly faster

        // Step 3: Form groups
        setAnimationStep(3);
        setGroups(finalGroups);
        await new Promise(resolve => setTimeout(resolve, 600)); // Slightly faster

        // Step 4: Show final results
        setAnimationStep(4);
        setShowResults(true);

        // Trigger confetti effect
        setShowConfetti(true);

        // Remove confetti after animation completes
        setTimeout(() => {
          setShowConfetti(false);
        }, 3000); // Shorter confetti duration
      } catch (error) {
        alert(error.message);
      } finally {
        setIsAnimating(false);
      }
    };

    // Use requestAnimationFrame to ensure animations run smoothly
    requestAnimationFrame(() => {
      runAnimationSequence();
    });
  }, [students]); // Only re-create when students array changes

  return (
    <Column maxWidth="m" gap="xl" horizontal="center">
      {/* Inject animation keyframes */}
      <style dangerouslySetInnerHTML={{ __html: animationStyles }} />

      {/* Render confetti when page is loaded and showConfetti is true - using memoized component */}
      {isLoaded && showConfetti && <Confetti />}
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
            Cette application choisit au hasard 2 groupes d'élèves (6 à 9 élèves)
          </Text>
        </RevealFx>

        {/* Loading indicator - shown only when page is not fully loaded */}
        {!isLoaded && (
          <Flex fillWidth horizontal="center" paddingY="l">
            <Column 
              gap="m" 
              padding="l" 
              background="surface" 
              border="neutral-medium" 
              radius="m"
              style={{
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                maxWidth: "400px",
                textAlign: "center"
              }}
            >
              <Text variant="body-strong-m" align="center">
                Chargement de l'application...
              </Text>
              <Flex 
                horizontal="center" 
                paddingY="m"
                style={{
                  position: "relative",
                  height: "4px",
                  width: "200px",
                  backgroundColor: "var(--color-neutral-background-weak)",
                  borderRadius: "2px",
                  overflow: "hidden"
                }}
              >
                <div 
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: "100%",
                    width: "30%",
                    backgroundColor: "var(--color-brand-background-strong)",
                    borderRadius: "2px",
                    animation: "loading 1.5s infinite ease-in-out"
                  }}
                />
              </Flex>
            </Column>
          </Flex>
        )}
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

          {/* Student count controls */}
          <Flex 
            fillWidth 
            horizontal="center" 
            gap="m" 
            paddingBottom="l"
            style={{
              marginBottom: "16px"
            }}
          >
            <Text variant="body-strong-m">Nombre d'élèves:</Text>
            <Flex 
              gap="s" 
              vertical="center"
              style={{
                borderRadius: "8px",
                border: "2px solid var(--color-brand-border-medium)",
                padding: "4px 8px",
                background: "var(--color-surface-background)"
              }}
            >
              <Button 
                variant="secondary" 
                size="s"
                onClick={() => handleStudentCountChange(-1)}
                style={{
                  minWidth: "40px",
                  padding: "4px 12px",
                  opacity: studentCount <= 6 ? 0.5 : 1,
                  cursor: studentCount <= 6 ? "not-allowed" : "pointer"
                }}
                disabled={studentCount <= 6}
              >
                -
              </Button>
              <Text 
                variant="body-strong-l"
                style={{
                  minWidth: "30px",
                  textAlign: "center",
                  color: "var(--color-brand-on-background-strong)"
                }}
              >
                {studentCount}
              </Text>
              <Button 
                variant="secondary" 
                size="s"
                onClick={() => handleStudentCountChange(1)}
                style={{
                  minWidth: "40px",
                  padding: "4px 12px",
                  opacity: studentCount >= 9 ? 0.5 : 1,
                  cursor: studentCount >= 9 ? "not-allowed" : "pointer"
                }}
                disabled={studentCount >= 9}
              >
                +
              </Button>
            </Flex>
          </Flex>

          <Flex fillWidth wrap gap="m" paddingBottom="l">
            {/* Use memoized StudentInput components for better performance */}
            {students.map((student, index) => (
              <StudentInput 
                key={index}
                index={index}
                value={student}
                onChange={handleStudentChange}
              />
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

      {/* Animation Section - only render when page is loaded */}
      {isLoaded && isAnimating && (
        <RevealFx translateY="16" delay={0.1}>
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
              borderImage: "linear-gradient(45deg, var(--color-brand-border-medium), var(--color-accent-border-medium)) 1",
              overflow: "hidden"
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
              {animationStep === 1 && "Préparation des élèves..."}
              {animationStep === 2 && "Mélange aléatoire..."}
              {animationStep === 3 && "Formation des groupes..."}
              {animationStep === 4 && "Groupes formés!"}
            </Heading>

            {/* Step 1: Original list */}
            {animationStep >= 1 && (
              <Flex 
                fillWidth 
                wrap 
                gap="m" 
                horizontal="center"
                style={{
                  opacity: animationStep === 1 ? 1 : 0,
                  transition: "opacity 0.5s ease-in-out",
                  height: animationStep === 1 ? "auto" : "0",
                  overflow: "hidden"
                }}
              >
                {students.map((student, index) => (
                  <Flex 
                    key={index} 
                    padding="m" 
                    background="brand-background-weak" 
                    border="neutral-medium" 
                    radius="m"
                    style={{
                      minWidth: "150px",
                      justifyContent: "center",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      transform: "scale(1)",
                      transition: "all 0.3s ease-in-out"
                    }}
                  >
                    <Text variant="body-strong-m">{student}</Text>
                  </Flex>
                ))}
              </Flex>
            )}

            {/* Step 2: Shuffling animation */}
            {animationStep >= 2 && (
              <Flex 
                fillWidth 
                wrap 
                gap="m" 
                horizontal="center"
                style={{
                  opacity: animationStep === 2 ? 1 : 0,
                  transition: "opacity 0.5s ease-in-out",
                  height: animationStep === 2 ? "auto" : "0",
                  overflow: "hidden"
                }}
              >
                {shuffledStudents.map((student, index) => (
                  <Flex 
                    key={index} 
                    padding="m" 
                    background="accent-background-weak" 
                    border="neutral-medium" 
                    radius="m"
                    style={{
                      minWidth: "150px",
                      justifyContent: "center",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      transform: `scale(${1 + Math.random() * 0.1}) rotate(${Math.random() * 6 - 3}deg)`,
                      transition: "all 0.3s ease-in-out",
                      animation: `${index % 2 === 0 ? 'pulse' : 'shake'} ${0.5 + Math.random() * 0.5}s ease-in-out infinite`
                    }}
                  >
                    <Text 
                      variant="body-strong-m"
                      style={{
                        color: `hsl(${Math.random() * 60 + 200}, 70%, 60%)`,
                        textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)"
                      }}
                    >
                      {student}
                    </Text>
                  </Flex>
                ))}
              </Flex>
            )}

            {/* Step 3: Group formation animation */}
            {animationStep >= 3 && (
              <Flex 
                fillWidth 
                gap="xl" 
                mobileDirection="column"
                style={{
                  opacity: animationStep === 3 ? 1 : 0,
                  transition: "opacity 0.5s ease-in-out",
                  height: animationStep === 3 ? "auto" : "0",
                  overflow: "hidden"
                }}
              >
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
                      animation: "slideIn 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
                      animationDelay: `${groupIndex * 0.5}s`,
                      opacity: 0,
                      transform: "translateY(20px)",
                      position: "relative",
                      overflow: "hidden"
                    }}
                  >
                    {/* Decorative background elements */}
                    <div 
                      style={{
                        position: "absolute",
                        top: "-20px",
                        right: "-20px",
                        width: "100px",
                        height: "100px",
                        borderRadius: "50%",
                        background: groupIndex === 0 
                          ? "radial-gradient(circle, rgba(0,128,255,0.2) 0%, rgba(0,128,255,0) 70%)" 
                          : "radial-gradient(circle, rgba(255,128,0,0.2) 0%, rgba(255,128,0,0) 70%)",
                        zIndex: 0
                      }}
                    />

                    <Heading 
                      variant="heading-strong-m" 
                      align="center"
                      style={{
                        marginBottom: "16px",
                        color: groupIndex === 0 ? "var(--color-brand-on-background-strong)" : "var(--color-accent-on-background-strong)",
                        textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
                        animation: "fadeIn 1s ease-in-out forwards",
                        animationDelay: `${groupIndex * 0.5 + 0.3}s`,
                        opacity: 0,
                        position: "relative",
                        zIndex: 1
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
                          animation: `fadeIn 0.8s ease-in-out forwards, slideIn 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`,
                          animationDelay: `${groupIndex * 0.5 + 0.5 + studentIndex * 0.3}s`,
                          opacity: 0,
                          transform: "translateY(20px)",
                          position: "relative",
                          zIndex: 1,
                          transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                          ":hover": {
                            transform: "translateY(-2px)",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)"
                          }
                        }}
                      >
                        <Text 
                          variant="body-strong-m"
                          style={{
                            fontSize: "18px",
                            background: groupIndex === 0 
                              ? "linear-gradient(45deg, var(--color-brand-on-background-strong), #4a90e2)" 
                              : "linear-gradient(45deg, var(--color-accent-on-background-strong), #e27c4a)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            textShadow: "0 1px 2px rgba(0, 0, 0, 0.05)"
                          }}
                        >
                          {student}
                        </Text>
                      </Flex>
                    ))}
                  </Column>
                ))}
              </Flex>
            )}

            {/* Animation progress indicator */}
            <Flex fillWidth horizontal="center" paddingTop="l">
              <Flex gap="m">
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    style={{
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      backgroundColor: animationStep >= step 
                        ? step === 4 
                          ? "var(--color-accent-background-strong)" 
                          : "var(--color-brand-background-strong)"
                        : "var(--color-neutral-background-weak)",
                      transition: "background-color 0.3s ease-in-out"
                    }}
                  />
                ))}
              </Flex>
            </Flex>

            {/* Celebratory message */}
            {animationStep === 4 && (
              <Flex 
                fillWidth 
                horizontal="center" 
                paddingTop="l"
                style={{
                  animation: "scaleIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards",
                  opacity: 0
                }}
              >
                <Flex 
                  padding="l" 
                  background="accent-background-weak" 
                  border="accent-medium" 
                  radius="l"
                  style={{
                    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
                    position: "relative",
                    overflow: "hidden"
                  }}
                >
                  <Text 
                    variant="heading-strong-m"
                    style={{
                      color: "var(--color-accent-on-background-strong)",
                      textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
                      fontSize: "24px"
                    }}
                  >
                    🎉 Groupes formés avec succès! 🎉
                  </Text>
                </Flex>
              </Flex>
            )}
          </Column>
        </RevealFx>
      )}

      {/* Results Section - only render when page is loaded */}
      {isLoaded && showResults && (
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
