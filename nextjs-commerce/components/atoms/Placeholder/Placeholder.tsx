import { FC } from "react";

type PlaceholderProps = {
    height: string;
    width?: string;
};

const Placeholder: FC<PlaceholderProps> = ({ height, width = "100%" }) => {
    return (
        <div style={{ height, width }}></div>
    )
}

export default Placeholder;