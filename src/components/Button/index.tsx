import { cl } from '@/utils';
import type { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

interface ButtonProps
    extends DetailedHTMLProps<
        ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > {
    theme: 'primary' | 'white';
    fullWidth?: boolean;
    onClick?: () => void;
    title?: string;
}

export default function Button({
    theme,
    fullWidth,
    onClick = () => ({}),
    title,
    ...props
}: ButtonProps) {
    return (
        <button
            title={title}
            onClick={onClick}
            className={cl(
                fullWidth === true ? 'w-full' : 'w-fit',
                'relative flex transition cursor-pointer items-center justify-center h-8 rounded-md border border-transparent bg-gray-100 py-2 px-4 text-xs font-medium text-gray-900 hover:bg-gray-200 whitespace-nowrap',
                theme === 'primary'
                    ? 'bg-primary-100 text-primary-800 hover:bg-primary-200'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            )}
            {...props}
        >
            {title}
        </button>
    );
}
