
import { clsx } from 'clsx';
import type { SvgIconType } from './type';

const CloseSvg = ({ className, size = 15, strokeWidth = 2, strokeColor = '#464455' }: SvgIconType) => {
    return (

        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size} height={size} className={clsx(className)} strokeWidth={strokeWidth}
            fill="none"
            viewBox="-0.5 0 25 25"
        >
            <path
                stroke={strokeColor}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="m3 21.32 18-18M3 3.32l18 18"
            ></path>
        </svg>
    )
};

export default CloseSvg;
