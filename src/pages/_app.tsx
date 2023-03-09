import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { Theme } from "react-daisyui";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Theme dataTheme="valentine">
        <Component {...pageProps} />
      </Theme>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
