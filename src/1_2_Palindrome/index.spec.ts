import { PalindromeChecker } from './index';

describe('palindrome checker', () => {
  let palindromeChecker: PalindromeChecker;

  beforeAll(() => {
    palindromeChecker = new PalindromeChecker();
  });

  test('should be able to tell that "mom" is a palindrome', () => {
    expect(palindromeChecker.isAPalindrome('mom')).toBeTruthy();
  });

  test('should be able to tell that "bill" is not a palindrome', () => {
    expect(palindromeChecker.isAPalindrome('bill')).toBeFalsy();
  });

  test('should still detect a palindrome even if the casing is off', () => {
    expect(palindromeChecker.isAPalindrome('Mom')).toBeTruthy();
  });

  test('should be able to tell that "Was It A Rat I Saw" is a palindrome', () => {
    expect(palindromeChecker.isAPalindrome('Was It A Rat I Saw')).toBeTruthy();
  });

  test('should be able to tell that "Never Odd or Even" is palindrome', () => {
    expect(palindromeChecker.isAPalindrome('Never Odd or Even')).toBeTruthy();
  });
});
