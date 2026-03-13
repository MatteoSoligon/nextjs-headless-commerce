import { CatalogItemData } from "@/models/interfaces/catalog";
import { Container } from "../atoms/Container";

const DetailsPage = ({ itemData }: { itemData: CatalogItemData }) => {
  return (
    <Container maxWidth="xl" py="lg">
      Item Page for: {itemData?.title}
    </Container>
  );
};

export default DetailsPage;