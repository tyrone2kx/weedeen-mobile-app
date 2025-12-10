/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { InviteTeamMemberDto } from './InviteTeamMemberDto';

export type InviteTeamMembersResponseDto = {
  success: boolean;
  message: string;
  existingUsers: Array<InviteTeamMemberDto>;
  successfullyCreatedUsers: number;
};
