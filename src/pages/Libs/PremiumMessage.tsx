import { Loader2, Crown } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "react-day-picker";

function PremiumMessage() {
  return (
    <div className="mb-16">
      <Card className="bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="h-6 w-6 text-yellow-600" />
            <span>Passez à Premium</span>
          </CardTitle>
          <CardDescription>
            Débloquez toutes les fonctionnalités avancées pour vos liens courts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h3 className="font-medium">URLs personnalisées</h3>
              <p className="text-sm text-gray-600">
                Créez des liens courts avec vos propres mots-clés
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Statistiques détaillées</h3>
              <p className="text-sm text-gray-600">
                Analysez en détail qui clique sur vos liens
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Protection par mot de passe</h3>
              <p className="text-sm text-gray-600">
                Sécurisez l'accès à vos liens importants
              </p>
            </div>
          </div>
          <Button
            onClick={() =>
              (window.location.href =
                "https://pay.lygosapp.com/link/6eee0a0b-3546-4a99-a63b-723d047d965b")
            }
            className="mt-6 bg-yellow-600 hover:bg-yellow-700"
          >
            Passer à Premium
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default PremiumMessage;
