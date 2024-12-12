import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface CustomUrlInputProps {
  onShorten: (shortCode: string, originalUrl: string) => void;
}

export const CustomUrlInput = ({ onShorten }: CustomUrlInputProps) => {
  const [url, setUrl] = useState("");
  const [customCode, setCustomCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCustomShorten = async () => {
    if (!url || !customCode) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    setIsLoading(true);
    try {
      // Vérifier si le code personnalisé existe déjà
      const { data: existing } = await supabase
        .from("shortened_links")
        .select("id")
        .eq("short_code", customCode)
        .single();

      if (existing) {
        toast.error("Ce code personnalisé est déjà utilisé");
        return;
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { error } = await supabase.from("shortened_links").insert([
        {
          original_url: url,
          short_code: customCode,
          user_id: user?.id,
        },
      ]);

      if (error) throw error;

      toast.success("URL raccourcie créée avec succès");
      onShorten(customCode, url);
      setUrl("");
      setCustomCode("");
    } catch (error) {
      toast.error("Une erreur est survenue");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Input
          placeholder="Entrez l'URL à raccourcir"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Input
          placeholder="Code personnalisé souhaité"
          value={customCode}
          onChange={(e) => setCustomCode(e.target.value)}
        />
      </div>
      <Button
        onClick={handleCustomShorten}
        disabled={isLoading}
        className="w-full"
      >
        Créer URL personnalisée
      </Button>
    </div>
  );
};
