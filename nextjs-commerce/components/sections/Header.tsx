import { Link } from "@/i18n/navigation";
import { FC } from "react";
import { Button, Container } from "../atoms";

const Header: FC = () => {
    return(
        <header className="bg-gray-800 text-white py-6">
            <Container maxWidth="xl" py="lg">
                <Link href={"/"} >
                    <h1 className="text-3xl font-bold">My E-commerce Store</h1>
                </Link>
                <div>
                    <Button variant="link" className="mr-4" asChild>
                    <Link href={"/test" as any} >
                        Editorial cms Page
                    </Link>
                    </Button>
                    <Button variant="link" className="mr-4" asChild>
                    <Link href={"/items/1" as any} >
                        Listing page for category 1
                    </Link>
                    </Button>
                </div>
            </Container>
        </header>
    )
};

export default Header;