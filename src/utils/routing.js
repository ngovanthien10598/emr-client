export function getRedirectPath(role) {
  if (!role) return "/login";

  switch (role.id) {
    case 1:
      return "/admin";
    case 2:
      return "/physician";
    case 3:
      return "/receitionist";
    case 4:
      return "/patient";
    default:
      return "";
  }
}