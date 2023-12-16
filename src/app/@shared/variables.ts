export class Variables {
  static unitOptions = [
    {label: 'Hours', value: 'Hours'},
    {label: 'Piece', value: 'Piece'},
    {label: 'Km', value: 'Km'},
    {label: 'Days', value: 'Days'},
    {label: 'Weeks', value: 'Weeks'},
    {label: 'Months', value: 'Months'},
    {label: 'Kg', value: 'Kg'},
    {label: 'Cubic Meters', value: 'Cubic Meters'},
    {label: 'Set', value: 'Set'},
    {label: 'Liter', value: 'Liter'},
    {label: 'Meter', value: 'Meter'},
    {label: 'Smaller Boxes', value: 'Smaller Boxes'},
    {label: 'Boxes', value: 'Boxes'},
    {label: 'Pallets', value: 'Pallets'},
    {label: 'Cartons', value: 'Cartons'},
    {label: 'Packages', value: 'Packages'},
    {label: 'Sessions', value: 'Sessions'},
    {label: 'Tons', value: 'Tons'},
    {label: 'Square Meters', value: 'Square Meters'},
  ]
  static invoiceStatusOptions = [
    { label: 'Confirmed', value: 2 },
    { label: 'Paid', value: 3 },
    { label: 'Overdue', value: 4 },
    { label: 'Overpaid', value: 5 },
    { label: 'Cancelled', value: 6 },
  ]

  static accountOptions = [
    { label: '1000 - Sale of goods/services with VAT', value: '1000 - Sale of goods/services with VAT' },
    { label: '1050 - Sale of goods/services without VAT', value: '1050 - Sale of goods/services without VAT' },
    { label: '1100 - EU deliveries of goods - Reported (box B goods)', value: '1100 - EU deliveries of goods - Reported (box B goods)' },
    { label: '1150 - EU deliveries of goods - Not reported (box B goods)', value: '1150 - EU deliveries of goods - Not reported (box B goods)' },
    { label: '1200 - EU deliveries of services (box B services)', value: '1200 - EU deliveries of services (box B services)' },
    { label: '1255 - Sale of goods to foreign countries (box C)', value: '1255 - Sale of goods to foreign countries (box C)' },
    { label: '1260 - Sale of services to foreign countries (box C)', value: '1260 - Sale of services to foreign countries (box C)' },
    { label: '1300 - Sale of freight - VAT exempt', value: '1300 - Sale of freight - VAT exempt' },
    { label: '1350 - Sale of freight - taxable', value: '1350 - Sale of freight - taxable' },
    { label: '1400 - Reminder fees, administration fees, etc.', value: '1400 - Reminder fees, administration fees, etc.' },
    { label: '1445 - Exchange rate differences, export', value: '1445 - Exchange rate differences, export' },
    { label: '9000 - Bank interest', value: '9000 - Bank interest' },
    { label: '9010 - Various interest income', value: '9010 - Various interest income' }
  ];

  static paymentMethodOptions = [
    { label: 'The invoice is paid', value:'The invoice is paid' },
    { label:'Current month',value: 'Current month' },
    { label:'Netto (Net)',value: 'Netto (Net)' },
    { label:'Netto cash (Net cash)',value: 'Netto cash (Net cash)' }
  ]

  static holdingOptions= [
    { label: 'Bank', value: 'Bank' },
    { label: 'Cash (register)', value: 'Cash (register)' },
    { label: 'Intermediate account', value: 'Intermediate account' },
    { label: 'Employee expenses', value: 'Employee expenses' },
    { label: 'Tax account', value: 'Tax account' },
  ]
  static boughtFromOptions = [
    { label: 'Denmark', value: 'Denmark' },
    { label: 'EU', value: 'EU' },
    { label: 'World', value: 'World' },
  ]


  static accountOptionsForRecords = [
    {
      label: 'Variable costs',
      value: 'Variable costs',
      items: [
        { label: 'Cost of goods sold', value: 'Cost of goods sold' },
        { label: 'EU acquisitions of goods (Category A goods)', value: 'EU acquisitions of goods (Category A goods)' },
        { label: 'EU acquisitions of services (Category A services)', value: 'EU acquisitions of services (Category A services)' },
        { label: 'Purchase of goods from the world', value: 'Purchase of goods from the world' },
        { label: 'Purchase of services from the world', value: 'Purchase of services from the world' },
        { label: 'Freight with VAT', value: 'Freight with VAT' },
        { label: 'Freight without VAT', value: 'Freight without VAT' },
        { label: 'Freight - EU', value: 'Freight - EU' },
        { label: 'Exchange rate differences, import', value: 'Exchange rate differences, import' },
        { label: 'Inventory regulation', value: 'Inventory regulation' },
        { label: 'Foreign labor', value: 'Foreign labor' },
      ]
    },
    {
      label: 'Labor costs',
      value: 'Labor costs',
      items: [
        { label: 'AM income', value: 'AM income' },
        { label: 'Employer ATP', value: 'Employer ATP' },
        { label: 'Employee ATP', value: 'Employee ATP' },
        { label: 'Sick pay, etc.', value: 'Sick pay, etc.' },
        { label: 'Employee benefits, including free phone', value: 'Employee benefits, including free phone' },
        { label: 'B-fee', value: 'B-fee' },
        { label: 'Maternity leave', value: 'Maternity leave' },
        { label: 'Holiday pay and special holidays', value: 'Holiday pay and special holidays' },
        { label: 'Pension', value: 'Pension' },
        { label: 'Dietary allowances/travel expenses', value: 'Dietary allowances/travel expenses' },
        { label: 'Use of own car (kilometer allowance)', value: 'Use of own car (kilometer allowance)' },
        { label: 'AER/AES/ATP financing contributions', value: 'AER/AES/ATP financing contributions' },
        { label: 'Work clothing', value: 'Work clothing' },
        { label: 'Employee insurance', value: 'Employee insurance' },
        { label: 'Meals during courses/meetings, fully deductible', value: 'Meals during courses/meetings, fully deductible' },
        { label: 'Gifts to employees, fully deductible', value: 'Gifts to employees, fully deductible' },
        { label: 'Training expenses', value: 'Training expenses' },
        { label: 'Miscellaneous regarding employees with VAT', value: 'Miscellaneous regarding employees with VAT' },
        { label: 'Miscellaneous regarding employees without VAT', value: 'Miscellaneous regarding employees without VAT' },
        { label: 'Regulation of holiday pay', value: 'Regulation of holiday pay' },
        { label: 'Lunch scheme for employees', value: 'Lunch scheme for employees' },
      ]
    },
    {
      label: 'Sales expenses',
      value: 'Sales expenses',
      items: [
        { label: 'Advertisements and advertising', value: 'Advertisements and advertising' },
        { label: 'Decoration in connection with events', value: 'Decoration in connection with events' },
        { label: 'Hotel, personnel, fully deductible', value: 'Hotel, personnel, fully deductible' },
        { label: 'Hotel, business contacts, partially deductible', value: 'Hotel, business contacts, partially deductible' },
        { label: 'Conferences', value: 'Conferences' },
        { label: 'Trade fairs', value: 'Trade fairs' },
        { label: 'Entertainment, restaurant, personnel, fully deductible', value: 'Entertainment, restaurant, personnel, fully deductible' },
        { label: 'Entertainment, restaurant, business contacts, partially deductible', value: 'Entertainment, restaurant, business contacts, partially deductible' },
        { label: 'Meals in the company for business contacts, partially deductible', value: 'Meals in the company for business contacts, partially deductible' },
        { label: 'Entertainment, gifts, and flowers, partially deductible', value: 'Entertainment, gifts, and flowers, partially deductible' },
        { label: 'Other deductible entertainment with VAT', value: 'Other deductible entertainment with VAT' },
        { label: 'Entertainment, miscellaneous', value: 'Entertainment, miscellaneous' },
        { label: 'Other personnel costs', value: 'Other personnel costs' },
        { label: 'Non-deductible portion', value: 'Non-deductible portion' },
        { label: 'Travel expenses', value: 'Travel expenses' },
      ]
    },
    {
      label: 'Local expenses',
      value: 'Local expenses',
      items: [
        { label: 'Rent', value: 'Rent' },
        { label: 'Rent without VAT', value: 'Rent without VAT' },
        { label: 'Electricity', value: 'Electricity' },
        { label: 'Water', value: 'Water' },
        { label: 'Heat', value: 'Heat' },
        { label: 'Electricity tax', value: 'Electricity tax' },
        { label: 'Cleaning and decoration', value: 'Cleaning and decoration' },
        { label: 'Repair and maintenance', value: 'Repair and maintenance' },
        { label: 'Property tax', value: 'Property tax' },
        { label: 'Property insurance', value: 'Property insurance' },
        { label: 'Meeting rooms', value: 'Meeting rooms' },
        { label: 'Decoration', value: 'Decoration' },
      ]
    },
    {
      label: 'Driving and travel',
      value: 'Driving and travel',
      items: [
        { label: 'Car rental (commercial vehicle)', value: 'Car rental (commercial vehicle)' },
        { label: 'Fuel (commercial vehicle)', value: 'Fuel (commercial vehicle)' },
        { label: 'Car maintenance (commercial vehicle)', value: 'Car maintenance (commercial vehicle)' },
        { label: 'Vehicle tax and insurance', value: 'Vehicle tax and insurance' },
        { label: 'Parking (commercial vehicle)', value: 'Parking (commercial vehicle)' },
        { label: 'Parking without VAT', value: 'Parking without VAT' },
        { label: 'Bridge toll', value: 'Bridge toll' },
        { label: 'Taxi', value: 'Taxi' },
        { label: 'Train', value: 'Train' },
        { label: 'Flight', value: 'Flight' },
        { label: 'Bus', value: 'Bus' },
        { label: 'Ferry', value: 'Ferry' },
        { label: 'Other transportation expenses without VAT', value: 'Other transportation expenses without VAT' },
      ]
    },
    {
      label: 'Administrative expenses',
      value: 'Administrative expenses',
      items: [
        { label: 'Audit', value: 'Audit' },
        { label: 'Legal', value: 'Legal' },
        { label: 'Bookkeeping assistance', value: 'Bookkeeping assistance' },
        { label: 'Consultant assistance', value: 'Consultant assistance' },
        { label: 'Memberships including VAT', value: 'Memberships including VAT' },
        { label: 'Memberships excluding VAT', value: 'Memberships excluding VAT' },
        { label: 'Newspapers', value: 'Newspapers' },
        { label: 'Professional literature', value: 'Professional literature' },
        { label: 'Other literature', value: 'Other literature' },
        { label: 'Business insurance', value: 'Business insurance' },
        { label: 'Freight and transportation', value: 'Freight and transportation' },
        { label: 'Car expenses according to state rates', value: 'Car expenses according to state rates' },
        { label: 'Tax-free travel and transportation allowance', value: 'Tax-free travel and transportation allowance' },
        { label: 'Office supplies and printed materials', value: 'Office supplies and printed materials' },
        { label: 'Postage and fees', value: 'Postage and fees' },
        { label: 'Telephony', value: 'Telephony' },
        { label: 'Taxation of free telephony', value: 'Taxation of free telephony' },
        { label: 'Accounting software', value: 'Accounting software' },
        { label: 'Internet and web hosting', value: 'Internet and web hosting' },
        { label: 'Purchase of software', value: 'Purchase of software' },
        { label: 'Public fines and fees', value: 'Public fines and fees' },
        { label: 'Registered cash differences', value: 'Registered cash differences' },
        { label: 'Payment solution', value: 'Payment solution' },
        { label: 'Issuers', value: 'Issuers' },
        { label: 'License', value: 'License' },
        { label: 'Miscellaneous including VAT', value: 'Miscellaneous including VAT' },
        { label: 'Miscellaneous excluding VAT', value: 'Miscellaneous excluding VAT' },
        { label: 'General meetings, board meetings outside the city, fully deductible', value: 'General meetings, board meetings outside the city, fully deductible' },
        { label: "General meetings in the company's premises", value: "General meetings in the company's premises" },
        { label: "Board meetings in the company's premises", value: "Board meetings in the company's premises" },
        { label: 'Board meetings outside the city', value: 'Board meetings outside the city' },
      ]
    },
    {
      label: 'Depreciation',
      value: 'Depreciation',
      items: [
        { label: 'Small acquisitions (immediate write-off)', value: 'Small acquisitions (immediate write-off)' },
        { label: 'Small acquisitions with reverse charge', value: 'Small acquisitions with reverse charge' },
      ]
    },
    {
      label: 'Interest expenses',
      value: 'Interest expenses',
      items: [
        { label: 'Bank interest', value: 'Bank interest' },
        { label: 'Suppliers, etc.', value: 'Suppliers, etc.' },
        { label: 'Non-deductible interest', value: 'Non-deductible interest' },
      ]
    },
  ];

  static getCountryCode(countryName: string): string {
    switch (countryName) {
      case 'Denmark':
        return 'dk';
      case 'EU':
        return 'eu';
      case 'World':
        return 'un';
      default:
        return '';
    }
  }




}
