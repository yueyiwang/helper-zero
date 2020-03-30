import { DonationType } from './types/DonationType';
import { DonationRequestType } from './types/DonationRequestType';
import { OrganizationType } from './types/OrganizationType';


const convertDonations = (donations): DonationType[] => {
  const ret: DonationType[] = [];
  donations.forEach((d) => {
    const donation: DonationType = {
      org: d.org,
      name: d.name,
      phone: d.phone,
      email: d.email,
      status: d.status,
      item: d.item,
      amount: d.amount,
      created_at: d.created_at,
      city: d.city,
      pickup_address: d.pickup_address,
      delivery_type: d.delivery_type,
      pickup_or_dropoff_times: d.pickup_or_dropoff_times
    }
    ret.push(donation);
  })
  return ret;
}

const convertDonationRequests = (donationRequests): DonationRequestType[] => {
  const ret: DonationRequestType[] = [];
  donationRequests.forEach((dr) => {
    const donationRequest: DonationRequestType = {
      org_id: dr.org,
      item_type: dr.item_type,
      item: dr.item,
      amount_requested: dr.amount_requested,
      amount_received: dr.amount_received,
    }
    ret.push(donationRequest)
  })
  return ret;
}

export const convertDataToOrg = (data): OrganizationType => {
  const org: OrganizationType = {
    id: data.id,
    name: data.name,
    url: data.url,
    address: data.address,
    description: data.description,
    phone: data.phone,
    org_type: data.org_type,
    email: data.email,
    is_dropoff: data.is_dropoff,
    is_pickup: data.is_pickup,
    is_mail: data.is_mail,
    pickup_instructions: data.pickup_instructions,
    dropoff_instructions: data.dropoff_instructions,
    mail_instructions: data.mail_instructions,
    auth_user_id: data.auth_user_id,
  }
  if (data.donation_requests != undefined) {
    org.donation_requests = convertDonationRequests(data.donation_requests)
  }
  if (data.donations != undefined) {
    org.donations = convertDonations(data.donations)
  }
  return org;
}