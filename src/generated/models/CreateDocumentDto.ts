/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreateDocumentDto = {
  slug:
    | 'profile_pic'
    | 'store_logo'
    | 'store_images'
    | 'product_images'
    | 'sos_alerts'
    | 'post_images'
    | 'post_videos';
  bucket:
    | 'profile-pics'
    | 'stores'
    | 'documents'
    | 'product-images'
    | 'emergencies'
    | 'posts';
  getMappings: boolean;
};
