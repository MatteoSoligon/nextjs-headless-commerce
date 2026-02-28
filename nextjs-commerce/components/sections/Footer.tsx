import { FC } from "react";
import { Container } from "../atoms";

const Footer: FC = () => {
    return (
        <footer className="bg-gray-800 text-white py-6 mt-10">
            <Container maxWidth="xl" py="lg">
                <p>&copy; {new Date().getFullYear()} My E-commerce Store. All rights reserved.</p>
            </Container>
        </footer>
    );
};

export default Footer;