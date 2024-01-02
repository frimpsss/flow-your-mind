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
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://flow-your-mind-test.vercel.app";

export { _ } from "./api";
