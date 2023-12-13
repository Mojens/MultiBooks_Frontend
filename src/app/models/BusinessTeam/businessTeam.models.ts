export interface BusinessTeamResponse {
  cvrnumber: number;
  vatnumber: string;
  companyName: string;
  address: string;
  city: string;
  zipCode: number;
  country: string;
  phoneNumber: string;
  email: string;
  website: string;
  ownerEmail: string;
  accNumber: string;
  regNumber: number;
  bankName: string;
}

export interface BusinessTeamRequest {
  CVRNumber: number;
  VATNumber: string;
  companyName: string;
  address: string;
  city: string;
  zipCode: number;
  country: string;
  phoneNumber: string;
  email: string;
  website: string;
  ownerEmail: string;
  accNumber: string;
  regNumber: number;
  bankName: string;
}
