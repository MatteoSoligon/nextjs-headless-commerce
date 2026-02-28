"use client";
import { Heading, Text, Button } from "@/components/atoms";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  const t = useTranslations("ErrorPage");

  useEffect(() => {
    console.error("An error occurred:", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <Heading level="h1">{t("title")}</Heading>
      <Text color="muted" size="lg">
        {t("description")}
      </Text>
      <div className="flex gap-3">
        <Button variant="primary" onClick={reset}>
          {t("retry")}
        </Button>
        <Button variant="outline" asChild>
          <Link href={"/"}>{t("home")}</Link>
        </Button>
      </div>
    </div>
  );
}
