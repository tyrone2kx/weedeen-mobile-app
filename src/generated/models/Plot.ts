/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Estate } from './Estate';
import type { User } from './User';
export type Plot = {
  id: string;
  tenant: string;
  name: string;
  size: string;
  price: number;
  plotNo: string;
  plotPrefix?: string;
  plotCount: string;
  block: string;
  street: string;
  phase: string;
  section: string;
  lotNumber: string;
  plotType: string;
  status: 'available' | 'reserved' | 'sold';
  location: string;
  images: Array<string>;
  documents: Array<string>;
  videos: Array<string>;
  estateId: string;
  estate: Estate;
  createdById: string;
  createdBy: User;
  longitude?: number;
  latitude?: number;
  updatedById?: string;
  updatedBy: User;
  description: string;
  isPurchased: boolean;
  metadata: Record<string, any>;
  deletedById?: string;
  deletedBy: User;
  updatedAt: string;
  deletedAt: string;
  createdAt: string;
};
