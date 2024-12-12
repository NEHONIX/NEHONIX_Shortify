import { useToast } from "@/hooks/use-toast";

export  const useCopyToClipboard = () => {
    const { toast } = useToast();
  const copyToClipboard = (shortCode: string) => {
    const shortUrl = `${window.location.origin}/${shortCode}`;
    navigator.clipboard.writeText(shortUrl);
    toast({
      title: "Succès",
      description: "Lien copié dans le presse-papier",
    });
  };
  return { copyToClipboard };
};
    
