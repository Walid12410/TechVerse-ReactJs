import { Minus } from "lucide-react";

const TitleSection = ({ title }) => {
    return (
        <h1
            className="text-xl sm:text-2xl font-bold text-white flex items-center justify-center space-x-2"
            style={{ fontFamily: "CelabRegular, sans-serif" }}
        >
            <Minus className="w-5 h-5" />
            <span>{title}</span>
            <Minus className="w-5 h-5 font-bold" />
        </h1>
    );
}

export default TitleSection;