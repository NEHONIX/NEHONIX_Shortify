import { supabase } from "@/integrations/supabase/client";

export const getOriginalUrl = async (shortCode: string) => {
  const { data, error } = await supabase
    .from('shortened_links')
    .select('*')
    .eq('short_code', shortCode)
    .single();

  if (error) {
    throw new Error('Lien non trouvé');
  }

  return data;
};