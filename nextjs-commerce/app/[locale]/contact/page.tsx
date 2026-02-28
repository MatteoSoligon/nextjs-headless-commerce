import { Container } from "@/components/atoms";
import TestForm from "@/components/sections/TestForm";

type Props = {
  params: {
    locale: string;
  };
};

export default async function Contact({ }: Props) {

  return <Container maxWidth="xl" py="lg"><TestForm /></Container>;
}
