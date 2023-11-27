export class Validations {
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static isValidCVR(cvr: number): boolean {
    return cvr.toString().length <= 8;
  }

  static isValidVAT(vat: string): boolean {
    const vatRegex = /^DK\d{8}$/;
    return vatRegex.test(vat);
  }

  static isValidPassword(password: string): boolean {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+]{8,}$/;
    return passwordRegex.test(password);
  }
}
