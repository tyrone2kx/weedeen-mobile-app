export enum FirebaseEventEnum {
  SCREEN_VIEW = 'screen_view',
  BUTTON_CLICK = 'button_click',
  NEW_SUBSCRIPTION = 'new_subscription',
  USER_LOGOUT = 'user_logout',
  ACCOUNT_VERIFICATION_COMPLETE = 'account_verification',
  ACCOUNT_REGISTRATION_COMPLETE = 'account_registration',
  PROFILE_UPDATE_COMPLETE = 'profile_update',
  USER_LOGIN = 'user_login',
  USER_SIGNUP = 'user_signup',
  USER_PASSWORD_RESET = 'user_password_reset',
  USER_PROFILE_UPDATE = 'user_profile_update',
  INITIALIZED_PAYMENT = 'initialized_payment',
  PAYMENT_SUCCESS = 'payment_success',
  PAYMENT_FAILURE = 'payment_failure',
  PAYMENT_CANCELLED = 'payment_cancelled',

  REDEEM_VOUCHER = 'redeem_voucher',
  RENEW_SUBSCRIPTION = 'renew_subscription',
  SUBSCRIBE_PROGRAM = 'subscribe_program',
  NEW_INCOMING_NOTIFICATION = 'new_incoming_notification',
}

export type FirebaseParamMap = {
  [FirebaseEventEnum.SCREEN_VIEW]: {
    screen_name: string;
  };
  [FirebaseEventEnum.BUTTON_CLICK]: {
    button_name: string;
  };
  [FirebaseEventEnum.USER_LOGOUT]: Record<string, unknown>;
  [FirebaseEventEnum.ACCOUNT_VERIFICATION_COMPLETE]: Record<string, unknown>;
  [FirebaseEventEnum.ACCOUNT_REGISTRATION_COMPLETE]: Record<string, unknown>;
  [FirebaseEventEnum.PROFILE_UPDATE_COMPLETE]: {
    userId: string;
  };
  [FirebaseEventEnum.NEW_SUBSCRIPTION]: {
    userSubscriptionId: string;
    planName: string;
  };
  [FirebaseEventEnum.USER_LOGIN]: {
    email?: string;
    phone?: string;
  };
  [FirebaseEventEnum.USER_SIGNUP]: {
    email?: string;
    phone?: string;
  };
  [FirebaseEventEnum.USER_PROFILE_UPDATE]: Record<string, unknown>;
  [FirebaseEventEnum.INITIALIZED_PAYMENT]: {
    method: 'paystack' | 'flutterwave' | 'card';
  };
  [FirebaseEventEnum.PAYMENT_SUCCESS]: {
    method: 'paystack' | 'flutterwave' | 'card';
  };
  [FirebaseEventEnum.PAYMENT_FAILURE]: {
    method: 'paystack' | 'flutterwave' | 'card';
  };
  [FirebaseEventEnum.PAYMENT_CANCELLED]: {
    method: 'paystack' | 'flutterwave' | 'card';
  };
  [FirebaseEventEnum.NEW_INCOMING_NOTIFICATION]: Record<string, unknown>;
  [FirebaseEventEnum.REDEEM_VOUCHER]: Record<string, unknown>;
  [FirebaseEventEnum.RENEW_SUBSCRIPTION]: {
    programId: string;
    planId: string;
  };
};
