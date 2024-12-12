import { Button } from "@/components/ui/button";
import { Crown } from "lucide-react";

interface NavbarProps {
  isPremium: boolean;
  onLogout: () => void;
}

const Navbar = ({ isPremium, onLogout }: NavbarProps) => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold bg-gradient-to-r from-primary-gradient-from to-primary-gradient-to text-transparent bg-clip-text">
          NEHONIX-Shortify
        </h1>
        <div className="flex items-center gap-4">
          {isPremium && (
            <div className="flex items-center gap-2 text-yellow-600">
              <Crown className="h-5 w-5" />
              <span className="text-sm font-medium">Premium</span>
            </div>
          )}
          <Button variant="outline" onClick={onLogout}>
            Se déconnecter
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 