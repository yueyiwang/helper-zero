import { DonationRequestType } from "./DonationRequestType";
import { DonationType } from "./DonationType";

export type OrganizationType = {
  id: number;
  name: string;
  url: string;
  address: string;
  description: string;
  phone: string;
  org_type: string;
  email: string;
  is_dropoff: boolean;
  is_pickup: boolean;
  is_mail: boolean;
  instructions: string;
  zipcode?: string;
  lat?: string;
  lon?: string;
  auth_user_id: string;
  pickup_times?: string;
  dropoff_times?: string;
  donation_requests: DonationRequestType[];
  donations: DonationType[];
}
