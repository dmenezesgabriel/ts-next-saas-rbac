import { getProfile } from "@/http/get-profile";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function isAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  return !!token?.value;
}

export async function auth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) {
    redirect("/auth/sign-in");
  }

  try {
    const { user } = await getProfile();

    return { user };
  } catch {}

  redirect("/api/auth/sign-out");
}
