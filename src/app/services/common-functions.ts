import { IAddress } from "../models/address";

export const getKey = (address: IAddress): string => `${address.firstName} ${address.lastName}`.replace(' ', '_').toLowerCase();
