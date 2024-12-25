
import { clsx } from 'clsx';
import type { SvgIconType } from './type';


const PencilSvg = ({ className, size = 15, strokeWidth = 2, strokeColor = '#464455' }: SvgIconType) => {
    return (
        <svg width={size} height={size} className={clsx(className)} strokeWidth={strokeWidth} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
            <path
                stroke={strokeColor}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 5H9c-1.886 0-2.828 0-3.414.586S5 7.114 5 9v6c0 1.886 0 2.828.586 3.414S7.114 19 9 19h6c1.886 0 2.828 0 3.414-.586S19 16.886 19 15v-3m-9.681.691 5.93-5.863a1.276 1.276 0 0 1 1.815 1.792l-5.831 6.05L9 15z"
            ></path>
        </svg>
    );
}

export default PencilSvg;
