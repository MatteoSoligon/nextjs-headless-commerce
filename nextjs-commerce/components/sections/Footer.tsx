import { FC } from "react";
import { Container } from "../atoms";
import { Link } from "@/i18n/navigation";

const Footer: FC = () => {
    return (
        <footer className="bg-gray-800 text-white py-6 mt-10">
            <Container maxWidth="xl" py="lg">
                <p>&copy; {new Date().getFullYear()} My E-commerce Store. All rights reserved.</p>
                <div>
                    <Link href={"/contact" as any} className="mr-4">
                        Contacts
                    </Link>
                    
                </div>
            </Container>
        </footer>
    );
};

export default Footer;