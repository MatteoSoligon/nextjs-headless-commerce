import TestForm from "@/components/sections/TestForm";

const getPageData = async (locale: string) => {
  const res = await fetch(
    `http://localhost:3000/pages/contact.json?locale=${locale}`,
  );
  if (!res.ok) {
    throw new Error("Failed to fetch contact page data");
  }
  return res.json();
};

type Props = {
  params: {
    locale: string;
  };
};

export default async function Contact({ params }: Props) {
  const { locale } = await params;

  const pageData = await getPageData(locale); // You can replace "en" with the desired locale or make it dynamic based on the current locale

  return <div><TestForm /></div>;
}
