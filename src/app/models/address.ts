export type shipping = 'free' | 'priority' | 'nextday';

export const shippingText: { [key: string]: string } = { free: 'Free Shipping', priority: 'Priority Shipping', nextday: 'Next Day Shipping' }

export interface IAddress {
  company?: string;
  firstName: string;
  lastName: string;
  address: string;
  address2?: null,
  city: string;
  state: string;
  postalCode: string;
  shipping: shipping
};
