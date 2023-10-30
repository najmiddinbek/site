'use client'

import Link from "next/link";
import { useState, useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import LoginImage from "../public/5790719 1.jpg";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  useEffect(() => {
    Aos.init({ duration: 3000 });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "admin" && password === "12345") {
      router.replace("/adminPanel");
      return;
    }

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        toast.error('Login bilan kirishda xatolik.', {
          position: "top-center",
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }

      router.replace("dashboard");
      router.push("/simplePage");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center h-[100vh]">
        <div data-aos="fade-down" className="w-[50%] border-r-2 mr-10 pr-">
          {/* Saqlangan matnni o'qib olish */}
          <h1 className="text-[45px]  text-[#293273] font-[700] leading-[80px] tracking-[2%]">
            Hurmatli foydalanuvchi Login parolingizni Kiriting.
          </h1>
          <div className="flex justify-center">
            <Image src={LoginImage} width={350} height={200} alt="Image" />
          </div>
        </div>
        <form
          data-aos="fade-up"
          onSubmit={handleSubmit}
          className="flex flex-col rounded-[20px] w-[50%]"
        >
          <h1 className="text-3xl  text-[#293273] font-[700] leading-[80px] tracking-[2%]">
            LOGIN PAROL BILAN KIRISH
          </h1>
          <p className="my-3 text-[15px] text-[#293273] font-[600]">
            Web saytga qaytib kelganingizdan hursandmiz.Iltimos o`z login
            parolingiz bilan tizimga kiring.
          </p>
          <label className="my-3" htmlFor="">
            Elektron pochtangiz
          </label>
          <input
            className="border-2 rounded-md outline-none py-4 px-3"
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Elektron pochtangizni kiriting"
          />
          <label className="my-3" htmlFor="">
            Qo`yilgan kodingiz
          </label>
          <input
            className="border-2 rounded-md outline-none py-4 px-3"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Qo`yilgan kodni kiriting"
          />
          <button className="bg-[#FEAF00] my-4 rounded-md text-white font-bold cursor-pointer px-6 py-4">
            Login
          </button>
          <button className="bg-white border-2 rounded-md text-[#344054] font-bold cursor-pointer px-6 py-4 flex justify-center items-center gap-2">
            <FcGoogle size={24} />
            Google Akkaunt bilan kirish
          </button>
          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {toast}
            </div>
          )}

          <Link className="text-sm mt-3 text-center" href={"/register"}>
            Akkauntingiz tizimda yo`qmi?{" "}
            <span className="underline">Ro`yxatdan o`tish</span>
          </Link>
        </form>
      </div>
    </div>
  );
}

