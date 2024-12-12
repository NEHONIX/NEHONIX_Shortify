import { UrlShortener } from "@/components/UrlShortener";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DetailedStats } from "@/components/DetailedStats";
import PremiumMessage from "./Libs/PremiumMessage";
import Features from "@/components/Features";
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import { handleOpenLink } from "./Libs/handleOpenLink";
import { DayPickerProvider } from 'react-day-picker';

const Index = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const { data: profile } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return null;

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        // If no profile exists, create one
        if (error.code === "PGRST116") {
          const { data: newProfile, error: createError } = await supabase
            .from("profiles")
            .insert([{ id: user.id, subscription_type: "free" }])
            .select()
            .single();

          if (createError) {
            toast.error("Erreur lors de la création du profil");
            return null;
          }
          return newProfile;
        }

        toast.error("Erreur lors du chargement du profil");
        return null;
      }

      return profile;
    },
  });

  const { data: stats, isLoading } = useQuery({
    queryKey: ["linkStats"],
    queryFn: async () => {
      const { data: links, error } = await supabase
        .from("shortened_links")
        .select(
          `
          id,
          short_code,
          original_url,
          link_analytics (count)
        `
        )
        .eq("user_id", (await supabase.auth.getUser()).data.user?.id);

      if (error) throw error;
      return links.map((link) => ({
        id: link.id,
        shortCode: link.short_code,
        clicks: link.link_analytics.length,
        url: link.original_url,
      }));
    },
  });

  const isPremium = profile?.subscription_type === "premium";

  return (
    <DayPickerProvider initialProps={{}}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Navbar isPremium={isPremium} onLogout={handleLogout} />

        <div className="container px-4 py-16 mx-auto">
          <Header
            title="Raccourcissez vos URLs"
            description="Transformez vos liens longs en URLs courts et mémorables, parfaits pour le partage"
          />

          <div className="flex justify-center mb-16">
            <UrlShortener isPremium={isPremium} />
          </div>

          {!isPremium && <PremiumMessage />}

          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Statistiques de vos liens</CardTitle>
                <CardDescription>
                  Visualisez les clics sur vos liens raccourcis
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                {isLoading ? (
                  <div className="h-full flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : stats && stats.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stats}>
                      <XAxis dataKey="shortCode" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="clicks" fill="#8B5CF6" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-500">
                    Aucune donnée disponible
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Liens les plus populaires</CardTitle>
                <CardDescription>Vos liens les plus cliqués</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="h-[300px] flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : stats && stats.length > 0 ? (
                  <div className="space-y-4">
                    {stats
                      .sort((a, b) => b.clicks - a.clicks)
                      .slice(0, 5)
                      .map((link) => (
                        <div
                          key={link.shortCode}
                          className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                        >
                          <div className="truncate flex-1 mr-4">
                            <p className="font-medium">{link.shortCode}</p>
                            <p
                              onClick={() =>
                                handleOpenLink({
                                  type: "shortenUrl",
                                  code: link.shortCode,
                                })
                              }
                              className="text-sm text-gray-500 truncate"
                            >
                              {link.url}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">
                              {link.clicks}
                            </span>
                            <span className="text-sm text-gray-500">clics</span>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="h-[300px] flex items-center justify-center text-gray-500">
                    Aucun lien créé
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <Features />

          {isPremium && stats && stats.length > 0 && (
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Statistiques détaillées</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue={stats[0].shortCode}>
                  <TabsList>
                    {stats.map((link) => (
                      <TabsTrigger value={link.shortCode}>
                        {link.shortCode}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {stats.map((link) => (
                    <TabsContent value={link.shortCode}>
                      <DetailedStats linkId={link.id} />
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DayPickerProvider>
  );
};

export default Index;
