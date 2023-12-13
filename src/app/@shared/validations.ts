type Translation = {
  [key: string]: string;
};

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

  static formatCurrency(amount: number): string {
    const formattedAmount = new Intl.NumberFormat('de-DE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);

    return formattedAmount;
  }

   static translateTerms(value: string): string {
    const danishTranslations: Translation = {
      'The invoice is paid': 'Fakturaen er betalt',
      'Current month': 'Nuværende måned',
      'Netto (Net)': 'Netto (Net)',
      'Netto cash (Net cash)': 'Netto kontant (Netto kontant)'
    };
    if (danishTranslations.hasOwnProperty(value)) {
      return danishTranslations[value];
    }
    return value;
  }

}
