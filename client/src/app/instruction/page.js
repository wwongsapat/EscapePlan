"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function InstructionPage() {
  const router = useRouter();
  return (
    <div className="relative">
      <button
        className="absolute top-10 left-10 bg-[#2d494b] text-white py-2 px-4 rounded-lg cursor-pointer hover:bg-[#2b8c90] transition-colors duration-300"
        onClick={() => {
          router.push("/");
        }}
      >
        Back
      </button>
      <div className="p-[140px]">
        <Image
          src="/images/instruction.png"
          alt="instruction"
          width={1920}
          height={1080}
        />
      </div>
    </div>
  );
}
