"use client";

import React, { useState, useEffect, useMemo, useCallback, memo, Suspense, lazy } from "react";
import { Heading, Flex, Text, Button, Column, RevealFx } from "@/once-ui/components";
import { baseURL } from "@/app/resources";
import { person } from "@/app/resources/content";

// Loading indicator component
const LoadingIndicator = () => (
  <Flex 
    fillWidth 
    horizontal="center" 
    paddingY="l"
    style={{
      minHeight: "200px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}
  >
    <Column 
      gap="m" 
      padding="l" 
      background="surface" 
      border="neutral-medium" 
      radius="m"
      style={{
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        maxWidth: "400px",
        // Use CSS text-align property instead of textAlign
        // This avoids React warnings about unrecognized DOM props
        "text-align": "center"
      }}
    >
      <Text variant="body-strong-m" align="center">
        Chargement du calendrier...
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
);

// Define keyframe animations
const animationStyles = `
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


// Helper function to get days in month
const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

// Helper function to get day of week for first day of month
const getFirstDayOfMonth = (year, month) => {
  return new Date(year, month, 1).getDay();
};

// Memoized calendar day component for better performance
const CalendarDay = memo(({ 
  day, 
  dateString, 
  hasAppointments, 
  isSelected, 
  isToday, 
  appointmentCount, 
  onClick 
}) => (
  <Flex 
    key={day} 
    flex={1} 
    padding="m" 
    horizontal="center" 
    vertical="center"
    onClick={onClick}
    background={isSelected ? "brand-background-weak" : "surface"}
    border={isToday ? "accent-strong" : "neutral-medium"}
    radius="m"
    style={{ 
      cursor: "pointer", 
      minHeight: "70px",
      position: "relative",
      transition: "all 0.2s ease-in-out",
      transform: isSelected ? "scale(1.05)" : "scale(1)",
      boxShadow: isSelected ? "0 4px 8px rgba(0, 0, 0, 0.2)" : "none",
      backgroundColor: hasAppointments 
        ? "rgba(255, 0, 0, 0.1)" 
        : isSelected 
          ? "var(--color-brand-background-weak)" 
          : "var(--color-surface-background)",
      borderWidth: isToday ? "2px" : "1px",
      overflow: "hidden"
    }}
  >
    {/* Day number */}
    <Text 
      variant="body-strong-m" 
      style={{
        position: "relative",
        zIndex: 2
      }}
    >
      {day}
    </Text>

    {/* Appointment indicator */}
    {hasAppointments && (
      <Flex 
        style={{
          position: "absolute",
          top: "8px",
          right: "8px",
          backgroundColor: "red",
          color: "white",
          borderRadius: "50%",
          width: "20px",
          height: "20px",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "12px",
          fontWeight: "bold",
          zIndex: 2
        }}
      >
        {appointmentCount}
      </Flex>
    )}

    {/* Today indicator - circle behind the number */}
    {isToday && (
      <div 
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          backgroundColor: "var(--color-accent-background-weak)",
          zIndex: 1
        }}
      />
    )}
  </Flex>
));

// Memoized appointment item component
const AppointmentItem = memo(({ 
  appointment, 
  isSelected, 
  onClick 
}) => (
  <Flex 
    flex={1}
    minWidth="250px"
    padding="l" 
    margin="s"
    background="brand-background-weak" 
    border="neutral-medium" 
    radius="l"
    style={{
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      transition: "all 0.3s ease-in-out",
      cursor: "pointer",
      transform: isSelected ? "translateY(-4px) scale(1.02)" : "translateY(0) scale(1)",
      boxShadow: isSelected ? "0 8px 16px rgba(0, 0, 0, 0.15)" : "0 4px 12px rgba(0, 0, 0, 0.1)",
      position: "relative",
      overflow: "hidden"
    }}
    onClick={onClick}
  >
    {/* Decorative element */}
    <div 
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "6px",
        height: "100%",
        background: "linear-gradient(to bottom, var(--color-accent-background-strong), var(--color-brand-background-strong))"
      }}
    />

    <Column gap="m" paddingLeft="m">
      <Text 
        variant="body-strong-l" 
        style={{ 
          color: "var(--color-accent-on-background-strong)",
          fontSize: "24px",
          fontWeight: "bold"
        }}
      >
        {appointment.time}
      </Text>

      <Text 
        variant="heading-strong-s" 
        style={{ 
          marginTop: "8px",
          fontSize: "18px"
        }}
      >
        {appointment.title}
      </Text>

      {appointment.description && (
        <Text 
          variant="body-default-s" 
          style={{ 
            color: "var(--color-neutral-on-background-weak)",
            display: "-webkit-box",
            WebkitLineClamp: "2",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}
        >
          {appointment.description}
        </Text>
      )}

      <Text 
        variant="body-default-xs" 
        style={{ 
          color: "var(--color-brand-on-background-weak)",
          marginTop: "auto",
          fontStyle: "italic"
        }}
      >
        Cliquez pour voir les détails
      </Text>
    </Column>
  </Flex>
));

export default function Calendar() {
  // Add loading state
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [appointments, setAppointments] = useState(() => {
    // Check if we're in the browser environment
    if (typeof window !== 'undefined') {
      const savedAppointments = localStorage.getItem('calendarAppointments');
      return savedAppointments ? JSON.parse(savedAppointments) : {};
    }
    return {};
  });
  const [selectedDate, setSelectedDate] = useState(null);
  const [appointmentTitle, setAppointmentTitle] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [appointmentDescription, setAppointmentDescription] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

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

  // Save appointments to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('calendarAppointments', JSON.stringify(appointments));
    }
  }, [appointments]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Memoize expensive calculations
  const daysInMonth = useMemo(() => getDaysInMonth(year, month), [year, month]);
  const firstDayOfMonth = useMemo(() => getFirstDayOfMonth(year, month), [year, month]);

  // Memoize static data
  const monthNames = useMemo(() => [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ], []);

  const dayNames = useMemo(() => ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"], []);

  // Optimize event handlers with useCallback
  const prevMonth = useCallback(() => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
      setSelectedDate(null);
      setIsAnimating(false);
    }, 300);
  }, []);

  const nextMonth = useCallback(() => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
      setSelectedDate(null);
      setIsAnimating(false);
    }, 300);
  }, []);

  const goToToday = useCallback(() => {
    setIsAnimating(true);
    setTimeout(() => {
      const today = new Date();
      setCurrentDate(today);
      const dateString = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
      setSelectedDate(dateString);
      setIsAnimating(false);
    }, 300);
  }, []);

  const handleDateClick = useCallback((day) => {
    const dateString = `${year}-${month + 1}-${day}`;
    setSelectedDate(dateString);
    setSelectedAppointment(null); // Reset selected appointment when changing date
  }, [year, month]);

  const handleAppointmentClick = useCallback((appointment) => {
    setSelectedAppointment(appointment);
  }, []);

  const addAppointment = useCallback(() => {
    if (selectedDate && appointmentTitle && appointmentTime) {
      setAppointments(prev => ({
        ...prev,
        [selectedDate]: [
          ...(prev[selectedDate] || []),
          { 
            title: appointmentTitle, 
            time: appointmentTime,
            description: appointmentDescription 
          }
        ]
      }));
      setAppointmentTitle("");
      setAppointmentTime("");
      setAppointmentDescription("");
    }
  }, [selectedDate, appointmentTitle, appointmentTime, appointmentDescription]);

  // Memoize calendar days generation
  const calendarDays = useMemo(() => {
    // Don't generate calendar if not loaded yet
    if (!isLoaded) return [];

    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<Flex key={`empty-${i}`} flex={1} padding="m" />);
    }

    // Get today's date for highlighting
    const today = new Date();
    const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year;
    const currentDay = today.getDate();

    // Generate days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${year}-${month + 1}-${day}`;
      const hasAppointments = appointments[dateString] && appointments[dateString].length > 0;
      const isSelected = selectedDate === dateString;
      const isToday = isCurrentMonth && day === currentDay;
      const appointmentCount = hasAppointments ? appointments[dateString].length : 0;

      days.push(
        <CalendarDay
          key={day}
          day={day}
          dateString={dateString}
          hasAppointments={hasAppointments}
          isSelected={isSelected}
          isToday={isToday}
          appointmentCount={appointmentCount}
          onClick={() => handleDateClick(day)}
        />
      );
    }

    return days;
  }, [isLoaded, firstDayOfMonth, daysInMonth, year, month, appointments, selectedDate, handleDateClick]);

  // Memoize the appointment list component
  const AppointmentsList = memo(({ selectedDate, appointments, handleAppointmentClick, selectedAppointment, isAnimating }) => {
    if (!selectedDate || !appointments[selectedDate]) return null;

    return (
      <RevealFx translateY="16" delay={0.2}>
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
            marginBottom: "24px",
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
            Rendez-vous planifiés
          </Heading>

          <Text 
            variant="body-strong-m" 
            align="center"
            style={{
              marginBottom: "24px",
              backgroundColor: "var(--color-accent-background-weak)",
              padding: "8px 16px",
              borderRadius: "4px",
              display: "inline-block",
              margin: "0 auto 24px auto"
            }}
          >
            {selectedDate}
          </Text>

          <Flex 
            fillWidth 
            gap="m" 
            wrap
            style={{
              opacity: isAnimating ? 0.5 : 1,
              transition: "opacity 0.3s ease-in-out"
            }}
          >
            {appointments[selectedDate].map((appointment, index) => (
              <AppointmentItem
                key={index}
                appointment={appointment}
                isSelected={selectedAppointment === appointment}
                onClick={() => handleAppointmentClick(appointment)}
              />
            ))}
          </Flex>
        </Column>
      </RevealFx>
    );
  });

  // Memoize the appointment form component
  const AppointmentForm = memo(({ 
    selectedDate, 
    appointmentTitle, 
    setAppointmentTitle, 
    appointmentTime, 
    setAppointmentTime, 
    appointmentDescription, 
    setAppointmentDescription, 
    addAppointment 
  }) => {
    if (!selectedDate) return null;

    return (
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
            marginTop: "24px",
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
            Ajouter un rendez-vous
          </Heading>

          <Text 
            variant="body-strong-m" 
            align="center"
            style={{
              marginBottom: "24px",
              backgroundColor: "var(--color-brand-background-weak)",
              padding: "8px 16px",
              borderRadius: "4px",
              display: "inline-block",
              margin: "0 auto 24px auto"
            }}
          >
            {selectedDate}
          </Text>

          <Flex fillWidth gap="l" mobileDirection="column" paddingBottom="m">
            <Column flex={1} gap="m">
              <Text variant="body-strong-s">Titre du rendez-vous</Text>
              <input
                type="text"
                value={appointmentTitle}
                onChange={(e) => setAppointmentTitle(e.target.value)}
                placeholder="Ex: Réunion d'équipe"
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
            </Column>
            <Column flex={1} gap="m">
              <Text variant="body-strong-s">Heure du rendez-vous</Text>
              <input
                type="time"
                value={appointmentTime}
                onChange={(e) => setAppointmentTime(e.target.value)}
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
            </Column>
          </Flex>

          <Column gap="m" paddingBottom="m">
            <Text variant="body-strong-s">Description (optionnel)</Text>
            <textarea
              value={appointmentDescription}
              onChange={(e) => setAppointmentDescription(e.target.value)}
              placeholder="Ajoutez des détails sur votre rendez-vous..."
              rows={4}
              style={{
                padding: "12px 16px",
                borderRadius: "8px",
                border: "2px solid var(--color-brand-border-medium)",
                background: "var(--color-surface-background)",
                color: "var(--color-neutral-on-background)",
                width: "100%",
                fontSize: "16px",
                resize: "vertical",
                transition: "all 0.2s ease-in-out",
                outline: "none",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)"
              }}
            />
          </Column>

          <Flex horizontal="center" paddingTop="m">
            <Button 
              variant="primary" 
              onClick={addAppointment}
              style={{
                padding: "12px 32px",
                fontSize: "16px",
                borderRadius: "8px",
                transition: "all 0.2s ease-in-out",
                transform: "scale(1)",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
              }}
            >
              Ajouter le rendez-vous
            </Button>
          </Flex>
        </Column>
      </RevealFx>
    );
  });

  // Memoize the appointment details modal component
  const AppointmentDetailsModal = memo(({ selectedAppointment, selectedDate, setSelectedAppointment }) => {
    if (!selectedAppointment) return null;

    return (
      <RevealFx translateY="16" delay={0.1}>
        <Column 
          fillWidth 
          gap="m" 
          padding="xl" 
          margin="l"
          background="surface" 
          border="neutral-medium" 
          radius="l"
          style={{
            boxShadow: "0 16px 32px rgba(0, 0, 0, 0.25)",
            position: "relative",
            borderWidth: "2px",
            borderStyle: "solid",
            borderImage: "linear-gradient(135deg, var(--color-brand-border-strong), var(--color-accent-border-strong)) 1",
            maxWidth: "800px",
            margin: "32px auto"
          }}
        >
          {/* Close button with hover effect */}
          <Button 
            variant="secondary" 
            size="s"
            onClick={() => setSelectedAppointment(null)}
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s ease-in-out",
              transform: "scale(1)",
              zIndex: 10,
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)"
            }}
          >
            ✕
          </Button>

          {/* Header with gradient background */}
          <Flex 
            fillWidth 
            padding="l" 
            radius="l" 
            style={{
              background: "linear-gradient(135deg, var(--color-brand-background-strong), var(--color-accent-background-strong))",
              marginBottom: "24px",
              borderTopLeftRadius: "12px",
              borderTopRightRadius: "12px",
              marginTop: "-24px",
              marginLeft: "-24px",
              marginRight: "-24px",
              width: "calc(100% + 48px)",
              position: "relative"
            }}
          >
            <Column fillWidth gap="s">
              <Heading 
                variant="heading-strong-l" 
                align="center"
                style={{
                  color: "white",
                  textShadow: "0 2px 4px rgba(0, 0, 0, 0.2)"
                }}
              >
                Détails du rendez-vous
              </Heading>
              <Text 
                variant="body-strong-m" 
                align="center"
                style={{
                  color: "rgba(255, 255, 255, 0.9)"
                }}
              >
                {selectedDate}
              </Text>
            </Column>
          </Flex>

          {/* Appointment details card */}
          <Flex fillWidth horizontal="center" padding="m">
            <Column 
              gap="xl" 
              padding="xl" 
              background="surface" 
              border="neutral-medium" 
              radius="l" 
              style={{ 
                width: "100%", 
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
                position: "relative",
                overflow: "hidden"
              }}
            >
              {/* Time badge */}
              <Flex 
                horizontal="center" 
                vertical="center"
                style={{
                  position: "absolute",
                  top: "24px",
                  right: "24px",
                  backgroundColor: "var(--color-accent-background-strong)",
                  color: "white",
                  borderRadius: "8px",
                  padding: "8px 16px",
                  fontWeight: "bold",
                  fontSize: "18px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)"
                }}
              >
                {selectedAppointment.time}
              </Flex>

              {/* Title with icon */}
              <Flex gap="m" vertical="center">
                <div 
                  style={{
                    backgroundColor: "var(--color-brand-background-weak)",
                    borderRadius: "50%",
                    width: "48px",
                    height: "48px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "24px"
                  }}
                >
                  📅
                </div>
                <Heading 
                  variant="heading-strong-l"
                  style={{
                    fontSize: "28px",
                    marginBottom: "8px"
                  }}
                >
                  {selectedAppointment.title}
                </Heading>
              </Flex>

              {/* Description section */}
              <Column gap="m" style={{ marginTop: "16px" }}>
                <Heading variant="heading-strong-s">Description</Heading>
                <Text 
                  variant="body-default-m"
                  style={{
                    padding: "16px",
                    backgroundColor: "var(--color-brand-background-weak)",
                    borderRadius: "8px",
                    lineHeight: "1.6",
                    minHeight: "100px"
                  }}
                >
                  {selectedAppointment.description || "Aucune description disponible pour ce rendez-vous."}
                </Text>
              </Column>

              {/* Status and actions */}
              <Flex 
                fillWidth 
                horizontal="between" 
                vertical="center"
                padding="m"
                background="brand-background-weak"
                radius="m"
                style={{
                  marginTop: "16px",
                  borderTop: "1px solid var(--color-neutral-border-medium)"
                }}
              >
                <Flex gap="s" vertical="center">
                  <div 
                    style={{
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      backgroundColor: "green",
                      marginRight: "8px"
                    }}
                  />
                  <Text 
                    variant="body-strong-m" 
                    style={{ 
                      color: "green"
                    }}
                  >
                    Confirmé
                  </Text>
                </Flex>

                <Button 
                  variant="primary" 
                  size="s"
                  style={{
                    transition: "all 0.2s ease-in-out",
                    transform: "scale(1)"
                  }}
                >
                  Modifier
                </Button>
              </Flex>
            </Column>
          </Flex>
        </Column>
      </RevealFx>
    );
  });

  // Memoize the calendar header component
  const CalendarHeader = memo(({ 
    monthNames, 
    month, 
    year, 
    prevMonth, 
    nextMonth, 
    goToToday, 
    isAnimating 
  }) => (
    <Flex 
      fillWidth 
      horizontal="center" 
      gap="l" 
      paddingBottom="m"
      style={{
        opacity: isAnimating ? 0.5 : 1,
        transition: "opacity 0.3s ease-in-out"
      }}
    >
      <Button 
        variant="secondary" 
        onClick={prevMonth}
        style={{
          transition: "transform 0.2s ease-in-out",
          transform: "scale(1)"
        }}
      >
        <Flex gap="s" vertical="center">
          <span style={{ fontSize: "1.2em" }}>←</span>
          <span>Mois précédent</span>
        </Flex>
      </Button>

      <Button 
        variant="primary" 
        onClick={goToToday}
        style={{
          transition: "transform 0.2s ease-in-out, background-color 0.2s ease-in-out",
          transform: "scale(1)"
        }}
      >
        Aujourd'hui
      </Button>

      <Heading 
        variant="heading-strong-l"
        style={{
          padding: "0 16px",
          borderRadius: "8px",
          backgroundColor: "var(--color-brand-background-weak)",
          color: "var(--color-brand-on-background-strong)",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          minWidth: "200px",
          // Use CSS text-align property instead of textAlign
          // This avoids React warnings about unrecognized DOM props
          "text-align": "center"
        }}
      >
        {monthNames[month]} {year}
      </Heading>

      <Button 
        variant="secondary" 
        onClick={nextMonth}
        style={{
          transition: "transform 0.2s ease-in-out",
          transform: "scale(1)"
        }}
      >
        <Flex gap="s" vertical="center">
          <span>Mois suivant</span>
          <span style={{ fontSize: "1.2em" }}>→</span>
        </Flex>
      </Button>
    </Flex>
  ));

  // Memoize the calendar days header component
  const CalendarDaysHeader = memo(({ 
    dayNames, 
    isAnimating 
  }) => (
    <Flex 
      fillWidth 
      paddingBottom="m"
      background="brand-background-weak"
      radius="m"
      border="neutral-medium"
      margin="s"
      style={{
        opacity: isAnimating ? 0.5 : 1,
        transition: "opacity 0.3s ease-in-out"
      }}
    >
      {dayNames.map(day => (
        <Flex 
          key={day} 
          flex={1} 
          horizontal="center" 
          paddingY="m"
        >
          <Text 
            variant="body-strong-m" 
            style={{
              color: day === "Dim" || day === "Sam" 
                ? "var(--color-accent-on-background-strong)" 
                : "var(--color-brand-on-background-strong)"
            }}
          >
            {day}
          </Text>
        </Flex>
      ))}
    </Flex>
  ));

  return (
    <Column maxWidth="m" gap="xl" horizontal="center">
      {/* Inject animation styles */}
      <style dangerouslySetInnerHTML={{ __html: animationStyles }} />

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Calendrier",
            description: "Application de gestion de rendez-vous avec interface intuitive",
            url: `https://${baseURL}/calendar`,
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

      {/* Show loading indicator if not loaded yet */}
      {!isLoaded ? (
        <LoadingIndicator />
      ) : (
        <>
          {/* Header Section */}
          <Column fillWidth paddingY="l" gap="m">
            <RevealFx translateY="4" fillWidth horizontal="center" paddingBottom="m">
              <Heading wrap="balance" variant="display-strong-l" align="center">
                Calendrier
              </Heading>
            </RevealFx>
            <RevealFx translateY="8" delay={0.2} fillWidth horizontal="center" paddingBottom="l">
              <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl" align="center">
                Planifiez et organisez vos rendez-vous avec cette application de calendrier
              </Text>
            </RevealFx>
          </Column>

          {/* Calendar Navigation */}
          <CalendarHeader
            monthNames={monthNames}
            month={month}
            year={year}
            prevMonth={prevMonth}
            nextMonth={nextMonth}
            goToToday={goToToday}
            isAnimating={isAnimating}
          />

          {/* Calendar Days Header */}
          <CalendarDaysHeader dayNames={dayNames} isAnimating={isAnimating} />

          {/* Calendar Grid */}
          <Flex fillWidth wrap gap="s" paddingBottom="l">
            {calendarDays}
          </Flex>

          {/* Appointment Form - Conditionally rendered */}
          <Suspense fallback={<LoadingIndicator />}>
            <AppointmentForm
              selectedDate={selectedDate}
              appointmentTitle={appointmentTitle}
              setAppointmentTitle={setAppointmentTitle}
              appointmentTime={appointmentTime}
              setAppointmentTime={setAppointmentTime}
              appointmentDescription={appointmentDescription}
              setAppointmentDescription={setAppointmentDescription}
              addAppointment={addAppointment}
            />
          </Suspense>

          {/* Appointments List - Conditionally rendered */}
          <Suspense fallback={<LoadingIndicator />}>
            <AppointmentsList
              selectedDate={selectedDate}
              appointments={appointments}
              handleAppointmentClick={handleAppointmentClick}
              selectedAppointment={selectedAppointment}
              isAnimating={isAnimating}
            />
          </Suspense>

          {/* Appointment Details Modal - Conditionally rendered */}
          <Suspense fallback={<LoadingIndicator />}>
            <AppointmentDetailsModal
              selectedAppointment={selectedAppointment}
              selectedDate={selectedDate}
              setSelectedAppointment={setSelectedAppointment}
            />
          </Suspense>
        </>
      )}
    </Column>
  );
}
