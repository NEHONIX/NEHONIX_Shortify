import { supabase } from "@/integrations/supabase/client";
import { CreateShortenData } from "@/integrations/supabase/types";
import { nanoid } from "nanoid";

interface ShortenUrlResponse {
  shortUrl: string;
  error?: string;
}

export class UrlShortenerService {
  async shortenUrl(
    data: CreateShortenData,
    customShortCode: string
  ): Promise<ShortenUrlResponse> {
    try {
      const shortCode = customShortCode || nanoid(8);
      
      // Vérifier si le code personnalisé existe déjà
      if (customShortCode) {
        const { data: existingUrl } = await supabase
          .from("shortened_links")
          .select()
          .eq("short_code", customShortCode)
          .single();

        if (existingUrl) {
          return { 
            shortUrl: "", 
            error: "Ce code personnalisé est déjà utilisé" 
          };
        }
      }

      const { error } = await supabase
        .from("shortened_links")
        .insert([
          {
            ...data,
            short_code: shortCode,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      const baseUrl = window.location.origin;
      return { shortUrl: `${baseUrl}/${shortCode}` };
    } catch (error) {
      console.error("Erreur lors de la création du lien :", error);
      return { shortUrl: "", error: "Impossible de créer le lien court" };
    }
  }
}
