import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { groupByCountry, groupByBrowser } from "@/utils/analytics";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

import { BarChart, PieChart } from "recharts";
import { formatDate } from "@/utils/formatDate";

interface DetailedStatsProps {
  linkId: string;
}

interface AnalyticsData {
  id: string;
  created_at: string;
  country: string;
  city: string;
  browser: string;
  os: string;
}

export const DetailedStats = ({ linkId }: DetailedStatsProps) => {
  const { data: analytics = [] } = useQuery<AnalyticsData[]>({
    queryKey: ["linkDetailedStats", linkId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("link_analytics")
        .select("id, created_at, browser, country, city")
        .eq("link_id", linkId);

      if (error) throw error;
      return (data || []) as unknown as AnalyticsData[];
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Statistiques détaillées</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-2">Par Pays</h3>
            <BarChart data={groupByCountry(analytics)} />
          </div>

          <div>
            <h3 className="font-medium mb-2">Par Navigateur</h3>
            <PieChart data={groupByBrowser(analytics)} />
          </div>

          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Pays</TableHead>
                  <TableHead>Ville</TableHead>
                  <TableHead>Navigateur</TableHead>
                  <TableHead>OS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {analytics?.map((click) => (
                  <TableRow key={click.id}>
                    <TableCell>{formatDate(click.created_at)}</TableCell>
                    <TableCell>{click.country}</TableCell>
                    <TableCell>{click.city}</TableCell>
                    <TableCell>{click.browser}</TableCell>
                    <TableCell>{click.os}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
