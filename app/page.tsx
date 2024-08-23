import Certificate from "@/components/test/Certificate";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-[60vh] flex flex-col justify-center items-center">
      {/* <div className="text-center">
        <h4 className="text-3xl font-bold my-3">Welcome To Multi Service</h4>
        <Link
          href={"/service"}
          className="text-violet-50  bg-violet-800 px-4 rounded-md shadow hover:shadow-lg py-1"
        >
          Services
        </Link>
      </div> */}
      <Certificate />
    </div>
  );
}
