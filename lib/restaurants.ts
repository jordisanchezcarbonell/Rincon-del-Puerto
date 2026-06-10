import 'server-only';
import { RESTAURANT_SLUG } from '@/lib/config/site';
import { createSupabaseServiceClient } from '@/lib/supabase/service';

export async function getPilotRestaurant() {
  const supabase = createSupabaseServiceClient();
  const { data, error } = await supabase
    .from('restaurants')
    .select('*')
    .eq('slug', RESTAURANT_SLUG)
    .single();

  if (error) {
    throw new Error(`Could not load pilot restaurant: ${error.message}`);
  }

  return data;
}
