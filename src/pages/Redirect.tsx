import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { handleOpenLink } from "./Libs/handleOpenLink";

const Redirect = () => {
  const { shortCode } = useParams();
  const navigate = useNavigate();
  const [needsPassword, setNeedsPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const redirectToOriginalUrl = async (userPassword?: string) => {
    try {
      const { data: link, error } = await supabase
        .from("shortened_links")
        .select("original_url, id, password")
        .eq("short_code", shortCode)
        .single();

      if (error || !link) {
        navigate("/404");
        return;
      }

      // Vérifier si un mot de passe est requis
      if (link.password && !userPassword) {
        setNeedsPassword(true);
        return;
      }

      // Vérifier si le mot de passe est correct
      if (link.password && userPassword !== link.password) {
        setError("Mot de passe incorrect");
        return;
      }

      // Enregistrer l'analytique du clic
      await supabase.from("link_analytics").insert([
        {
          link_id: link.id,
          clicked_at: new Date().toISOString(),
        },
      ]);

      // Rediriger vers l'URL original
      window.location.href = link.original_url;
    } catch (error) {
      navigate("/404");
    }
  };

  useEffect(() => {
    redirectToOriginalUrl();
  }, [shortCode, navigate]);

  if (needsPassword) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <Card className="w-full max-w-md p-6">
          <h2 className="text-xl mb-4 text-center">
            Ce lien est protégé par mot de passe
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              redirectToOriginalUrl(password);
            }}
            className="space-y-4"
          >
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Entrez le mot de passe"
              className="w-full"
            />
            {error && <p className="text-red-500 text-center">{error}</p>}
            <Button type="submit" className="w-full">
              Accéder au lien
            </Button>
          </form>
        </Card>

        <div className="text-center">
          <p className="text-gray-600 mb-2">
            Vous aussi, vous souhaitez raccourcir vos liens ?
          </p>
          <a
            href="/"
            className="text-primary hover:underline font-medium"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
          >
            Cliquez ici pour créer votre lien court !
          </a>
        </div>

        <small
          className="text-blue-600 mt-4"
          onClick={() =>
            handleOpenLink({
              type: null,
              url: "https://nehonix.space",
            })
          }
        >
          Powered By NEHONIX
        </small>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <div className="flex items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p>Redirection en cours...</p>
      </div>

      <div className="text-center">
        <p className="text-gray-600 mb-2">
          Vous aussi, vous souhaitez raccourcir vos liens ?
        </p>
        <a
          href="/"
          className="text-primary hover:underline font-medium"
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
        >
          Cliquez ici pour créer votre lien court !
        </a>
      </div>

      <small className="text-blue-600 mt-4">Powered By NEHONIX</small>
    </div>
  );
};

export default Redirect;
