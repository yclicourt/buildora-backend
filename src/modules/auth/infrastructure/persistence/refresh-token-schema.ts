export interface AuthPayload {
  jti: string;
  userId: string;
  familyId: string;
  tokenHash: string;
  expiresAt: Date;
  revokedAt: Date;
  createdAt: Date;
}
