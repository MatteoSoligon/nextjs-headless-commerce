import { Link } from "@/i18n/navigation";
import { FC } from "react";
import { Button, Container } from "../atoms";

const Header: FC = () => {
    return(
        <header className="bg-gray-800 text-white py-6">
            <Container maxWidth="xl" py="lg">
                <h1 className="text-3xl font-bold">My E-commerce Store</h1>
                <div>
                    <Button variant="link" className="mr-4" asChild>
                    <Link href={"/test" as any} >
                        Test Page
                    </Link>
                    </Button>
                    <Button variant="link" className="mr-4" asChild>
                    <Link href={"/product" as any} >
                        Product Page
                    </Link>
                    </Button>
                </div>
            </Container>
        </header>
    )
};

export default Header;