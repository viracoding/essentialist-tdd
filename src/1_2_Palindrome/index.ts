export class PalindromeChecker {
  private removeSpacing(word: string): string {
    return word.replaceAll(' ', '');
  }

  private reverseWord(word: string): string {
    return word.split('').reverse().join('');
  }

  isAPalindrome(word: string): boolean {
    return (
      this.removeSpacing(word).toLowerCase() ===
      this.removeSpacing(this.reverseWord(word)).toLowerCase()
    );
  }
}
