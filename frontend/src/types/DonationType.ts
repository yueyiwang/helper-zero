export type DonationType = {
  org_id: number;
  name: string;
  phone: string;
  email: string;
  city: string;
  status?: string;
  item: string;
  amount: number;
  created_at?: Date;
  pickup_or_dropoff_times: string;
  delivery_type?: string;
  pickup_address?: string;
};
