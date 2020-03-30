export type DonationRequestType = {
  org_id: number;
  item_type: string;
  item: string;
  amount_requested: number;
  amount_received: number;
};
