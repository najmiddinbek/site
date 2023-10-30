"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function AddTopic() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [school, setSchool] = useState("");
    const [telNumber, setTelNumber] = useState("");
    const [darsQoldirish, setDarsQoldirish] = useState("");
    const [manzili, setManzili] = useState("");
    const [sinfi, setSinf] = useState("");

    const router = useRouter();
    const options = Array.from({ length: 54 }, (_, index) => index + 1);
    const darsSoati = Array.from({ length: 6 }, (_, index) => index + 1);
    const darsKuni = Array.from({ length: 3, }, (_, index) => index + 1);
    const sinflar = Array.from({ length: 11, }, (_, index) => index + 1);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // if (!title || !description || !school || !telNumber || !darsQoldirish || !manzili) {
        //     alert("Barcha maydonlarni to`ldiring...");
        //     return;
        // }

        try {
            const res = await fetch("http://localhost:3000/api/topics", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ title, description, school, telNumber, darsQoldirish, manzili }),
            });

            if (res.ok) {
                const form = e.target;
                form.reset();
                router.push("/simplePage");
                toast.success('O`quvchi malumotlari muvaffaqiyatli qo`shildi!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } else {
                console.log("User registration failed.");
            }


        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <label className="text-[18px] poppins font-bold " htmlFor="">Maktabni tanlang</label>
                <select onChange={(e) => setSchool(e.target.value)} value={school} className="px-2 py-3 cursor-pointer">
                    <option>Bu yerdan tanlang</option>
                    {options.map((option) => (
                        <option key={option} value={option}>
                            {option}-maktab
                        </option>
                    ))}
                </select>
                <label className="text-[18px] font-bold poppins" htmlFor="">Sinfni tanlang</label>
                <select onChange={(e) => setSinf(e.target.value)} value={sinfi} className="px-2 py-3 cursor-pointer">
                    <option>Bu yerdan tanlang</option>
                    {sinflar.map((sinf) => (
                        <option key={sinf} value={sinf}>
                            {sinf}-sinf
                        </option>
                    ))}
                </select>
                <label className="text-[18px] poppins font-bold " htmlFor="">Familiya,Ismi hamda Otasining ismi</label>
                <input className="w-[900px] py-3 px-2 outline-none border " onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder="FIO" />
                <label className="text-[18px] poppins font-bold " htmlFor="">Telefon raqami</label>
                <input className="w-[900px] py-3 px-2 border outline-none" onChange={(e) => setTelNumber(e.target.value)} value={telNumber} type="number" placeholder="telNumber" />
                <label className="text-[18px] poppins font-bold " htmlFor="">Ota yoki Onasing telefon raqami</label>
                <input className="w-[900px] py-3 px-2 border outline-none" onChange={(e) => setDescription(e.target.value)} value={description} type="text" placeholder="Ota onasi telefon raqami" />

                {/* <input className="w-[900px] py-3 px-2 border outline-none" onChange={(e) => setDarsQoldirish(e.target.value)} value={darsQoldirish} type="number" placeholder="qoldirilgan dars" /> */}

                <label className="text-[18px] poppins font-bold " htmlFor="">Qoldirilgan dars vaqti</label>
                <select className="px-2 py-3 cursor-pointer" onChange={(e) => setDarsQoldirish(e.target.value)} value={darsQoldirish} name="" id="">
                    <option>Soat bo`yicha</option>
                    {darsSoati.map((soat) => (
                        <>
                            <option key={soat} value={soat}>{soat} soat</option>
                        </>
                    ))}
                    <option>Kun bo`yicha</option>
                    {darsKuni.map((kuni) => (
                        <>
                            <option key={kuni} value={kuni}>{kuni} kun</option>
                        </>
                    ))}
                </select>
                <div className="flex justify-end">

                    <button type="submit" className="bg-[#FEAF00] rounded-md font-bold text-white py-3 px-6 w-fit" >
                        Qo`shish
                    </button>
                </div>
            </form>
        </>
    );
}
