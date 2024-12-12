import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Link2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useCopyToClipboard } from "./Utils/CopyToClipBoard";
import { ShortenedUrlDisplay } from "./ShortenedUrlDisplay";
import "./Style/UrlShortener.css";
import { UrlShortenerService } from "@/services/urlShortenerService";
import { Label } from "./ui/label";
import { CreateShortenData } from "@/integrations/supabase/types";
// Instancier le service
const urlShortenerService = new UrlShortenerService();

interface UrlShortenerProps {
  isPremium: boolean;
}

export const UrlShortener = ({ isPremium }: UrlShortenerProps) => {
  const [url, setUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const { toast } = useToast();
  const { copyToClipboard } = useCopyToClipboard();
  const [customShortCode, setCustomShortCode] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      toast({
        title: "Erreur",
        description: "Vous devez être connecté pour raccourcir des URLs",
        variant: "destructive",
      });
      return;
    }

    //Créeons les données à stocker dans la base de donnée
    const createData: CreateShortenData = {
      original_url: url,
      user_id: user.id,
      password,
      is_premium: false,
    };
    
    const { shortUrl, error } = await urlShortenerService.shortenUrl(
      createData,
      customShortCode
    );

    if (error) {
      toast({
        title: "Erreur",
        description: error,
        variant: "destructive",
      });
      return;
    }

    setShortenedUrl(shortUrl);
    setUrl("");
    toast({
      title: "URL raccourcie avec succès !",
      description: "Votre URL raccourcie est prête à être copiée.",
    });
  };

  return (
    <Card className="w-full max-w-2xl p-6 space-y-6 animate-fade-up">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="shorten_container flex flex-col sm:flex-row gap-3">
          <Input
            type="url"
            placeholder="Entrez votre URL longue ici..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="shorten_input flex-1"
            required
          />
          <Button
            type="submit"
            className="bg-gradient-to-r from-primary-gradient-from to-primary-gradient-to text-white"
          >
            <Link2 className="mr-2 h-4 w-4" />
            Raccourcir l'URL
          </Button>
        </div>

        {isPremium && (
          <>
            <div className="space-y-2">
              <Label>URL personnalisée (Premium)</Label>
              <Input
                placeholder="mon-url-personnalisee"
                value={customShortCode}
                onChange={(e) => setCustomShortCode(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Protection par mot de passe (Premium)</Label>
              <Input
                type="password"
                placeholder="Définir un mot de passe (optionnel)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </>
        )}
      </form>

      {shortenedUrl && (
        <ShortenedUrlDisplay
          shortenedUrl={shortenedUrl}
          onCopy={copyToClipboard}
        />
      )}
    </Card>
  );
};
