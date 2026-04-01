export type Role = 'admin' | 'viewer';

export const ROLE_MAP: Record<string, Role> = {
  'admin@demo.com': 'admin',
};

export const DEFAULT_ROLE: Role = 'viewer';

export function getRoleForEmail(email: string): Role {
  return ROLE_MAP[email] ?? DEFAULT_ROLE;
}
