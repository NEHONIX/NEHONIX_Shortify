import { Auth } from "@supabase/auth-ui-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Shield, Star } from "lucide-react";

const AuthPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(( session) => {
      if (session) {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* En-tête */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <Shield className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-gradient-from to-primary-gradient-to text-transparent bg-clip-text">
            NEHONIX-Shortify
          </h1>
          <p className="text-gray-600">
            La plateforme professionnelle de raccourcissement de liens
          </p>
        </div>

        {/* Carte d'authentification */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: "#3498db",
                    brandAccent: "#6c5ce7",
                  },
                },
              },
              className: {
                container: "space-y-4",
                button: "w-full px-4 py-2 rounded-lg",
                label: "text-sm font-medium text-gray-700",
                input:
                  "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent",
              },
            }}
            localization={{
              variables: {
                sign_in: {
                  email_label: "Adresse email",
                  password_label: "Mot de passe",
                  button_label: "Se connecter",
                  loading_button_label: "Connexion en cours...",
                  social_provider_text: "Continuer avec {{provider}}",
                  link_text: "Vous avez déjà un compte ? Connectez-vous",
                },
                sign_up: {
                  email_label: "Adresse email",
                  password_label: "Mot de passe",
                  button_label: "S'inscrire",
                  loading_button_label: "Inscription en cours...",
                  social_provider_text: "Continuer avec {{provider}}",
                  link_text: "Vous n'avez pas de compte ? Inscrivez-vous",
                },
              },
            }}
          />
        </div>

        {/* Section Premium */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-primary/10">
          <div className="flex items-center space-x-2 mb-4">
            <Star className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-gray-900">
              Fonctionnalités Premium
            </h2>
          </div>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center">
              <span className="mr-2">•</span>
              Liens personnalisés illimités
            </li>
            <li className="flex items-center">
              <span className="mr-2">•</span>
              Analytiques avancées
            </li>
            <li className="flex items-center">
              <span className="mr-2">•</span>
              Protection par mot de passe
            </li>
            <li className="flex items-center">
              <span className="mr-2">•</span>
              QR codes personnalisés
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
