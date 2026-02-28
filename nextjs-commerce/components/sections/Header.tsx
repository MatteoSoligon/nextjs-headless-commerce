import { Link } from "@/i18n/navigation";
import { FC } from "react";

const Header: FC = () => {
    return(
        <header className="bg-gray-800 text-white py-6">
            <div className="container mx-auto text-center">
                <h1 className="text-3xl font-bold">My E-commerce Store</h1>
                <div>
                    <Link href={"/test" as any} >
                        Test Page
                    </Link>
                    <Link href={"/product" as any} >
                        Product Page
                    </Link>
                </div>
            </div>
        </header>
    )
};

export default Header;