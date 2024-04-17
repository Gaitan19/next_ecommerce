import { v4 } from 'uuid';

export const tableHeaders = [
  'remove',
  'image',
  'food',
  'price',
  'quantity',
  'total',
];

export const billingsInformation = [
  {
    id: v4(),
    text: 'First name*',
    type: 'text',
  },
  {
    id: v4(),
    text: 'Last name*',
    type: 'text',
  },
  {
    id: v4(),
    text: 'Email address',
    type: 'email',
  },
  {
    id: v4(),
    text: 'Mobile number',
    type: 'tel',
  },
];

export const checkoutSelectors = [
  ['khulna', 'New York', 'Barisal', 'Nator', 'Joybangla'],
  ['State', 'New York', 'Barisal', 'Nator', 'Joybangla'],
  ['Country', 'New York', 'Barisal', 'Nator', 'Joybangla'],
];

export const paymentMethods = [
  'Payment by card',
  'Paypal',
  'Payponeer',
  'Cash on delivery',
];

export const orderDetails = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'yourmail@domain.com',
};

export const costumersInformation = [
  {
    id: v4(),
    text: 'First name',
    value: orderDetails.firstName,
  },
  {
    id: v4(),
    text: 'Last name',
    value: orderDetails.lastName,
  },

  {
    id: v4(),
    text: 'Email address',
    value: orderDetails.email,
  },

  {
    id: v4(),
    text: 'Address',
    value: '1901 Thornridge Cir. Shiloh, Hawaii 81063',
  },
  {
    id: v4(),
    text: 'City',
    value: 'Thornridge',
  },
  {
    id: v4(),
    text: 'State',
    value: 'Hawaii',
  },

  {
    id: v4(),
    text: 'Postal code',
    value: '81063',
  },

  {
    id: v4(),
    text: 'Country',
    value: 'USA',
  },
];

export const ordersInformation = [
  {
    id: v4(),
    text: 'Order ID',
    value: '#MN3293KH',
  },
  {
    id: v4(),
    text: 'Order date',
    value: '10/06/2023',
  },
  {
    id: v4(),
    text: 'Payment method',
    value: 'Bank transfer',
  },
  {
    id: v4(),
    text: 'Order status',
    value: true,
  },
];
