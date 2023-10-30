import Link from "next/link";
import Image from "next/image";
import UserImage from "../public/780-7804962_cartoon-avatar-png-image-transparent-avatar-user-image.png"

const getTopics = async () => {
    try {
        const res = await fetch("http://localhost:3000/api/users", {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch topics");
        }

        return res.json();
    } catch (error) {
        console.log("Error loading topics: ", error);
    }
};


export default async function Navbar() {
    const { topics } = await getTopics();


    return (
        <div className="bg-[#FEAF00] py-4">
            <div className="container mx-auto">
                <nav className="flex justify-between items-center">
                    <Link className="text-white" href={"/simplePage"}>
                        O`quvchi qo`shish
                    </Link>
                    <Link className="text-white" href={"/register"}>
                        Ro`yxatdan o`tish
                    </Link>
                    <Link className="text-white" href={"/"}>
                        Login
                    </Link>
                </nav>
                {/* {topics.map((topic, index) => (
                <h1>{topic.name}</h1>
            ))} */}
            </div>
        </div>
    );
}
