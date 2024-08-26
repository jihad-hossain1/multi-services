import MediaSVG from "@/components/svg/media";
import Link from "next/link";

export default function Home() {
    const services = [
        {
            name: "YouTube Downloader",
            description: "Download videos from YouTube",
            url: "/service/yt-downloader",
            icon: <MediaSVG />,
        },
        {
            name: "Code Share",
            description: "Share code with other users",
            url: "/service/code-share",
            icon: <MediaSVG />,
        },
    ];

    console.log("🚀 ~ Home ~ services:", services);
    return (
        <main className='min-h-[60vh]'>
            <div className='grid grid-cols-2 lg:grid-cols-3 gap-4'>
                {services.map((service) => (
                    <div
                        key={service.name}
                        className='border border-gray-300 p-4 rounded-md shadow-[0px_0px_5px_rgba(0,0,0,0.25)] hover:shadow-[0px_0px_8px_rgba(0,0,0,0.25)] bg-white'
                    >
                        <Link
                            href={service.url}
                            className='flex flex-col gap-1 items-center'
                        >
                            {service?.icon}
                            <h3>{service.name}</h3>
                            <p>{service.description}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </main>
    );
}
