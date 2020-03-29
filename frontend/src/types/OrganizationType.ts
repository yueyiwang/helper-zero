import { DonationRequestType } from "./DonationRequestType";

export type OrganizationType = {
  id: number;
  name: string;
  url: string;
  address: string;
  description: string;
  phone: string;
  orgType: string;
  email: string;
  isDropoffOnly: boolean;
  instructions: string;
  zipcode?: string;
  lat?: string;
  lon?: string;
  accessToken: string;
  pickupDateTimes?: Array<Date>;
  dropoffDateTimes?: Array<Date>;
  donation_requests: DonationRequestType[];
}
