'use server'
import { cookies } from "next/headers"
import { createClient } from "@/utils/supabase/server"
import { fetchUser } from "./user";

async function fetchUserNumOffers(): Promise<number> {
  const supabase = createClient(cookies());
  const user = await fetchUser(supabase);
  if (user === null) return 0;

  const { data: userPaymentData } = await supabase
    .from('user_payments_managment')
    .select()
    .eq("user_id", user.id);

  // if user record is not created just give him one credit 
  if (userPaymentData?.length === 0) {
    await addUserOffer(user.id, 1);
  }

  return userPaymentData![0]?.n_offers as number ?? 0;
}

async function addUserOffer(user_id: string, baseValue: number = 5): Promise<void> {
  const supabase = createClient(cookies());

  try {
    const { data: userData } = await supabase
      .from('user_payments_managment')
      .select('n_offers')
      .eq("user_id", user_id);

    // calculate the new value for nOffers, starting with a base value
    const nOffers: number = baseValue + (userData?.[0]?.n_offers ?? 0);

    await supabase
      .from('user_payments_managment')
      .upsert({ user_id, n_offers: nOffers }, { onConflict: 'user_id' })
      .eq('user_id', user_id);

  } catch (error) {
    console.error('addUserOffer error:', error);
    return Promise.reject(error);
  }
}

async function removeUserOffer(): Promise<boolean> {
  const supabase = createClient(cookies());

  try {
    const user = await fetchUser(supabase);
    if (user === null)
      throw new Error("user is null");

    const { data: userData } = await supabase
      .from('user_payments_managment')
      .select()
      .eq("user_id", user.id);

    // Ensure user data is available and n_offers is a valid number
    let nOffers = userData![0]?.n_offers as number ?? 0;
    if (nOffers <= 0)
      throw new Error("Invalid number of offers");

    nOffers -= 1;

    await supabase
      .from('user_payments_managment')
      .update({ n_offers: nOffers })
      .eq('user_id', user.id);
    return true;
  } catch (error) {
    console.error('removeUserOffer error:', error);
    return false;
  }
}

export {
  fetchUserNumOffers,
  addUserOffer,
  removeUserOffer,
};