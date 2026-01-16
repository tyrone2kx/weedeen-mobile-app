/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { User } from './User';
export type Document = {
  id: string;
  title?: string;
  tenant?: string;
  userId?: string;
  createdById?: string;
  url: string;
  urlList: Array<string>;
  status?:
    | 'awaiting_templating'
    | 'awaiting_processing'
    | 'processing_complete'
    | 'pending'
    | 'approved'
    | 'rejected'
    | 'completed';
  slug?:
    | 'profile_pic'
    | 'store_logo'
    | 'store_images'
    | 'product_images'
    | 'sos_alerts'
    | 'post_images'
    | 'post_videos'
    | 'estate_logo'
    | 'estate_images'
    | 'estate_documents'
    | 'estate_videos'
    | 'plot_images'
    | 'plot_videos'
    | 'plot_documents'
    | 'customer_profile_pic'
    | 'customer_id_card_images';
  isSystemGenerated?: string;
  creator?: User;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};
