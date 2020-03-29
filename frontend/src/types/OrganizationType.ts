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
  is_dropoff_only: boolean;
  instructions: string;
  zipcode?: string;
  lat?: string;
  lon?: string;
  auth_user_id: string;
  pickup_date_times?: Array<Date>;
  dropoff_date_times?: Array<Date>;
  donation_requests: DonationRequestType[];
  donations: DonationType[];
}
