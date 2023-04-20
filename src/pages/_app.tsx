import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { Theme } from "react-daisyui";
import AppNavbar from "~/components/common/Navbar";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Theme dataTheme="dark">
        <Component {...pageProps} />
        <AppNavbar />
      </Theme>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
