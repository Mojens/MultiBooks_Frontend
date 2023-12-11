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
}
