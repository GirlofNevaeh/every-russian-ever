import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { LocaleProvider } from "@/i18n/provider";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { SiteHeader } from "@/components/site-header";
import appCss from "../styles.css?url";

const APP_NAME = "Every Russian Ever";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      {
        name: "description",
        content: "A history of Russia for young learners, Age 5-12.",
      },
      { name: "theme-color", content: "#143A78" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
    ],
  }),
  component: () => (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <LocaleProvider>
            <div className="min-h-screen bg-paper text-ink">
              <SiteHeader />
              <Outlet />
            </div>
          </LocaleProvider>
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});
