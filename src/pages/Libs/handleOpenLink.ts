interface paramType {
  type: "shortenUrl" | null;
  url?: string;
  code?: string;
  redirectType?: "SameWindow" | "default";
}

export function handleOpenLink(params: paramType) {
  const baseUrl = window.location.origin;

  function redirectT(t: "SameWindow" | "default", url: string) {
    if (!(t === "SameWindow")) {
      window.open(url, "_blank");
    } else {
      window.location.href = url;
    }
  }

  if (params.type === "shortenUrl") {
    redirectT(params.redirectType, `${baseUrl}/${params.code}`);
    return;
  }

  redirectT(params.redirectType, params.url);
}
