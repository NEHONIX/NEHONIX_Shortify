import { Button } from "@/components/ui/button";
import { Copy, ExternalLink } from "lucide-react";

interface ShortenedUrlDisplayProps {
  shortenedUrl: string;
  onCopy: (url: string) => void;
}

export const ShortenedUrlDisplay = ({ shortenedUrl, onCopy }: ShortenedUrlDisplayProps) => {
  return (
    <div className="p-4 bg-gray-50 rounded-lg space-y-3">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-medium truncate">{shortenedUrl}</p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onCopy(shortenedUrl.split("/").pop() || "")}
          >
            <Copy className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a href={shortenedUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}; 