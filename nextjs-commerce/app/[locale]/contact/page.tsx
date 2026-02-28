import TestForm from "@/components/sections/TestForm";

type Props = {
  params: {
    locale: string;
  };
};

export default async function Contact({ }: Props) {

  return <div><TestForm /></div>;
}
