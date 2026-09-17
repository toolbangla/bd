export const ADMIN_EMAIL = "neway995@gmail.com";

export function isAdminEmail(email: string | undefined | null) {
  return email?.trim().toLowerCase() === ADMIN_EMAIL;
}
