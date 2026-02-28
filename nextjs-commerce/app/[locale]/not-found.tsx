import { getTranslations } from "next-intl/server";
import { Heading, Text, Button } from "@/components/atoms";
import { Link } from "@/i18n/navigation";

export default async function NotFoundPage() {
  const t = await getTranslations("NotFoundPage");

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <Heading level="h1">{t("title")}</Heading>
      <Text color="muted" size="lg">
        {t("description")}
      </Text>
      <Button variant="outline" asChild>
        <Link href="/">{t("home")}</Link>
      </Button>
    </div>
  );
}
