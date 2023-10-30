import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";
import Remove from "../../components/RemoveBtn";
import Navbar from "../../components/Navbar";

const getTopics = async () => {
    try {
        const res = await fetch("http://localhost:3000/api/topics", {
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

export default async function TopicsList() {
    const a = await getTopics()
    const topics = a?.topics
    const maktablar = Array.from({ length: 54, }, (_, index) => index + 1);
    return (
        <>
            <Navbar />
            <div className="container">
                <select className="w-full">
                    <option>Qidirish</option>
                    {maktablar.map((maktab, index) => (
                        <>
                            <option key={index}>{maktab}</option>
                        </>
                    ))}
                </select>
                <div className="h-[2px] w-full bg-gray-100 mt-8"></div>
                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="py-4 px-2 opacity-50">№</th>
                            <th className="py-4 px-2 opacity-50">Ism</th>
                            <th className="py-4 px-2 opacity-50">Familiya</th>
                            <th className="py-4 px-2 opacity-50">Maktab</th>
                            <th className="py-4 px-2 opacity-50">Telefon raqam</th>
                            <th className="py-4 px-2 opacity-50">Dars qoldirish</th>
                            <th className="py-4 px-2 opacity-50">Yaratilgan vaqti</th>
                            <th className="py-4 px-2 opacity-50"></th>
                        </tr>
                    </thead>
                    {topics.map((t, index) => (
                        <>
                            <tbody key={t.id} className="text-center">
                                <tr className="bg-transparent h-[6px] shadow-md w-full"></tr>
                                <tr>
                                    <td className="bg-white py-4 px-2">{index + 1}</td>
                                    <td className="bg-white py-4 px-2">{t.title}</td>
                                    <td className="bg-white py-4 px-2">{t.description}</td>
                                    <td className="bg-white py-4 px-2">{t.school}</td>
                                    <td className="bg-white py-4 px-2">{t.telNumber}</td>
                                    <td className="bg-white py-4 px-2">{t.darsQoldirish}</td>
                                    <td className="bg-white py-4 px-2">{new Date(t.createdAt).toLocaleString()}</td>
                                    <td className="bg-white py-4 px-2">
                                        <div className="flex gap-2 justify-center">
                                            <Remove id={t._id} />
                                        </div>
                                    </td>
                                </tr>
                            </tbody >
                        </>
                    ))}
                </table >
            </div>

        </>
    );
}