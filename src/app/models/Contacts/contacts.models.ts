export interface ContactsResponse {
  attentionPerson: string,
  companyName: string,
  cvrnumber: number,
  email: string,
  id: number,
  paymentTermsDays: number,
  paymentTermsMethod: string,
  phoneNumber: string,
  website: string,
}

export interface ContactsRequest {
  attentionPerson: string,
  companyName: string,
  cvrnumber: number,
  email: string,
  paymentTermsDays: number,
  paymentTermsMethod: string,
  phoneNumber: string,
  website: string,
  businessTeamCVRNumber: number,
}

export interface UpdateContactsRequest{
  attentionPerson: string,
  companyName: string,
  cvrnumber: number,
  email: string,
  id: number,
  paymentTermsDays: number,
  paymentTermsMethod: string,
  phoneNumber: string,
  website: string,
  businessTeamCVRNumber: number,
}
