import "server-only";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getAdminContext() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { data: membership, error: membershipError } = await supabase
    .from("restaurant_admins")
    .select("restaurant_id")
    .eq("user_id", user.id)
    .limit(1)
    .maybeSingle();

  if (membershipError) {
    throw new Error(`Could not load admin membership: ${membershipError.message}`);
  }

  if (!membership) {
    return {
      supabase,
      user,
      restaurant: null
    };
  }

  const { data: restaurant, error: restaurantError } = await supabase
    .from("restaurants")
    .select("*")
    .eq("id", membership.restaurant_id)
    .single();

  if (restaurantError) {
    throw new Error(`Could not load admin restaurant: ${restaurantError.message}`);
  }

  return {
    supabase,
    user,
    restaurant
  };
}
