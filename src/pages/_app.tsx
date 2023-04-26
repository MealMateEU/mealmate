import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { Theme } from "react-daisyui";
import Head from "next/head";
import BottomNavbar from "~/components/BottomNavbar/BottomNavbar";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Mealmate</title>
      </Head>
      <Theme dataTheme="dark">
        <main className="flex h-screen justify-center">
          <div className="h-full w-full overflow-y-scroll md:max-w-2xl">
            <Component {...pageProps} />
          </div>
          <BottomNavbar />
        </main>
      </Theme>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
