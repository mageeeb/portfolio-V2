/**
 * Utility functions for the Hasard application
 * These functions handle the random selection of groups from a list of students
 */

/**
 * Shuffles an array using the Fisher-Yates algorithm
 * @param array The array to shuffle
 * @returns A new shuffled array
 */
export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

/**
 * Divides an array into groups of specified size
 * @param array The array to divide
 * @param groupSize The size of each group
 * @returns An array of groups
 */
export function divideIntoGroups<T>(array: T[], groupSize: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += groupSize) {
    result.push(array.slice(i, i + groupSize));
  }
  return result;
}

/**
 * Creates random groups from a list of students
 * @param students Array of student names
 * @returns Array of exactly 2 groups, each containing student names
 */
export function createRandomGroups(students: string[]): string[][] {
  // Validate input
  if (!students || students.length === 0) {
    throw new Error("Student list cannot be empty");
  }

  if (students.some(student => !student.trim())) {
    throw new Error("All student names must be filled");
  }

  // Shuffle the students array
  const shuffledStudents = shuffleArray(students);

  // Always create exactly 2 groups
  const midpoint = Math.ceil(shuffledStudents.length / 2);
  const group1 = shuffledStudents.slice(0, midpoint);
  const group2 = shuffledStudents.slice(midpoint);

  return [group1, group2];
}
