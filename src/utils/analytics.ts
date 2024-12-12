interface AnalyticsData {
  id: string;
  created_at: string;
  country: string;
  browser: string;
  os: string;
  city: string;
}

export const groupByCountry = (data: AnalyticsData[] = []) => {
  const grouped = data.reduce((acc, item) => {
    acc[item.country] = (acc[item.country] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(grouped).map(([name, value]) => ({ name, value }));
};

export const groupByBrowser = (data: AnalyticsData[] = []) => {
  const grouped = data.reduce((acc, item) => {
    acc[item.browser] = (acc[item.browser] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(grouped).map(([name, value]) => ({ name, value }));
}; 