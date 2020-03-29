import { DonationRequestType } from "./DonationRequestType";

export type OrganizationType = {
  id: number;
  name: string;
  url: string;
  address: string;
  description: string;
  donation_requests: DonationRequestType[];
};
