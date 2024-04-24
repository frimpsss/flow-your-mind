export function passwordTest(password: string): {
  score: number;
  lowerCase: boolean;
  uppercase: boolean;
  digit: boolean;
  specialCharacter: boolean;
  lengthRequirement: boolean;
} {
  let score = 0;
  const lowercaseLetter = /(?=.*[a-z])/;
  const uppercaseLetter = /(?=.*[A-Z])/;
  const digit = /(?=.*\d)/;
  const specialCharacter = /[^a-zA-Z0-9]/;
  const lengthRequirement = /^.{8,}$/;

  if (lowercaseLetter.test(password)) {
    score += 1;
  }
  if (uppercaseLetter.test(password)) {
    score += 1;
  }
  if (digit.test(password)) {
    score += 1;
  }
  if (specialCharacter.test(password)) {
    score += 1;
  }
  if (lengthRequirement.test(password)) {
    score += 1;
  }

  return {
    score,
    lowerCase: lowercaseLetter.test(password),
    uppercase: uppercaseLetter.test(password),
    digit: digit.test(password),
    specialCharacter: specialCharacter.test(password),
    lengthRequirement: lengthRequirement.test(password),
  };
}

export const baseURL =
  typeof window !== "undefined"
    ? `${window.location.protocol}//${window.location.host}`
    : "";
export { _ } from "./api";

export function formatDate(date: string) {
  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) {
    return ""
  }
  const dayOfWeek = dateObj.toLocaleDateString("en-US", { weekday: "long" }); // Full weekday name (e.g., Wednesday)
  const day = dateObj.getDate().toString().padStart(2, "0"); // Day of the month (e.g., 04) with leading zero
  const month = dateObj.toLocaleDateString("en-US", { month: "long" }); // Full month name (e.g., April)
  const hours = dateObj.getUTCHours().toString().padStart(2, "0"); // Hours in 24-hour format with leading zero (GMT)
  const minutes = dateObj.getUTCMinutes().toString().padStart(2, "0"); // Minutes with leading zero (GMT)
  const seconds = dateObj.getUTCSeconds().toString().padStart(2, "0"); // Seconds with leading zero (GMT)

  // Format the output string
  return `${dayOfWeek} ${day} ${month} ${hours}:${minutes}:${seconds} GMT`;
}
