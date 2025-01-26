import { defineAbilityFor } from "@saas/auth";

const ability = defineAbilityFor({ role: "MEMBER", id: "user-id" });
const userCanDeleteOtherUsers = ability.can("delete", "User");

const userCannotDeleteOtherUsers = ability.cannot("delete", "User");

console.log(userCannotDeleteOtherUsers);
console.log(userCanDeleteOtherUsers);
