import { routing } from "@/i18n/routing";
import { getMessages, setRequestLocale } from "next-intl/server";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { Roboto } from "next/font/google";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import getMetadata from "@/lib/meta";
import { Provider } from "jotai";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return getMetadata("", locale);
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <body className={`${roboto.variable} antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Provider>
            <Header />
            <main>{children}</main>
            <Footer />
          </Provider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
