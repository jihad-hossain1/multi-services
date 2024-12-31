import { clsx } from 'clsx';
import type { SvgIconType } from './type';

const DetailsSvg = ({ className, size = 15, strokeWidth = 2, strokeColor = '#464455' }: SvgIconType) => {
    return (

        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlSpace="preserve"
            id="Layer_4"
            width={size} height={size} className={clsx(className)} strokeWidth={strokeWidth}
            version="1.1"
            viewBox="0 0 48 48"
        >
            <g stroke={strokeColor}>
                <path d="m22.164 24.263 1.485-1.484-2.693-2.694-1.484 1.486a9.5 9.5 0 0 0-2.858-1.267v-2.22h-4.781v2.22a9.5 9.5 0 0 0-2.917 1.302l-1.425-1.425-2.693 2.692 1.449 1.449a9.4 9.4 0 0 0-1.23 2.8H2.796v4.776h2.218a9.5 9.5 0 0 0 1.267 2.862l-1.485 1.484 2.693 2.691 1.485-1.484a9.5 9.5 0 0 0 2.867 1.269v2.216h4.761V38.72a9.5 9.5 0 0 0 2.808-1.231l1.544 1.543 2.693-2.691-1.521-1.522a9.5 9.5 0 0 0 1.306-2.934h2.215v-4.747h-2.215a9.4 9.4 0 0 0-1.268-2.875m-7.941 9.165a3.917 3.917 0 1 1 0-7.835 3.917 3.917 0 0 1 0 7.835M38.412 21.672c-.537.456-.867 1.006-.975 1.66-.084.651.072 1.207.455 1.663q.577.688 1.553.69c.646 0 1.244-.231 1.781-.69q.796-.685.973-1.663c.109-.654-.029-1.205-.434-1.66-.4-.464-.928-.691-1.574-.691-.652-.001-1.248.227-1.779.691M45.203 42.357c0-.195-.262-.4-.768-.61-.059.084-.119.157-.176.245-.354.45-1.674 2.034-3.385 2.983a.06.06 0 0 0-.027.018c-.15.076-.303.14-.457.206-.451.165-.871.204-1.01.217-.385-.048-.594-.319-.594-.827 0-.425.125-1.254.373-2.504l.291-1.26 1.172-5.635c.191-.959.291-1.491.316-1.594l.254-1.319q.228-1.225.229-1.617c0-.507-.125-.886-.326-1.196a.56.56 0 0 0-.168-.242c-.035-.039-.053-.072-.1-.111-.5-.407-.969-.523-1.289-.549l.01-.012s-2.121-.162-5.258 1.907c-.043.027-.068.051-.115.079a14.3 14.3 0 0 0-1.998 1.51 5.8 5.8 0 0 0-.844.864l-.01.012.004-.003c-.268.353-.41.677-.41.955 0 .224.182.45.537.672 0 0 1.352-1.737 3.613-2.871.168-.074.605-.256.988-.353.176-.04.514-.072.73.106.154.156.256.381.256.732q.002.47-.141 1.158l-.232 1.085-.283 1.356-1.119 5.362q-.859 4.155-.859 4.966 0 1.908 2.094 1.91c.629 0 1.279-.114 1.943-.317l.012.004q.066-.026.129-.049.168-.054.334-.123c3.145-1.168 5.211-3.522 5.834-4.31.059-.068.104-.13.148-.192.037-.047.057-.08.057-.08.159-.23.245-.425.245-.573M29.68 5.828v6.156h8.054v6.1000000000000005h3.905V9.422L32.242.025H5.764v17.741h3.907V3.859H29.68v.951z"></path>
            </g>
        </svg>
    )
}

export default DetailsSvg;