export const Roles = {
   CUSTOMER: 'customer',
   ADMIN: 'admin',
   MANAGER: 'manager',
} as const;
export type RoleType = (typeof Roles)[keyof typeof Roles];
