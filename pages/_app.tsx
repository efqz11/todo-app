import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import { Session } from "next-auth";
import { ModalProvider } from "@/shared/components";

interface MyAppProps extends AppProps {
    session?: Session;
}

function MyApp({ Component, pageProps: { session, ...pageProps } }: MyAppProps) {
    return (
        <ModalProvider>
            <SessionProvider session={session}>
                <Component {...pageProps} />
            </SessionProvider>
        </ModalProvider>
    );
}

export default MyApp;