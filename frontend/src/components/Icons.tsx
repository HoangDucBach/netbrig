interface SVGProps extends React.SVGProps<SVGSVGElement> {
}

export const Logo = ({ ...props }: SVGProps) => {
    const { width = 32, height = 32, ...rest } = props;
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect x="15.7125" y="3.4875" width="25.025" height="8.225" rx="4.1125" transform="rotate(90 15.7125 3.4875)" fill="url(#paint0_linear_4724_277)" stroke="#D4FF70" stroke-width="2.975" />
            <circle cx="18.1478" cy="13.4042" r="7.93333" fill="#F9FFB3" />
            <defs>
                <linearGradient id="paint0_linear_4724_277" x1="45.2" y1="7.6" x2="17.2" y2="7.6" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#E8FB04" />
                    <stop offset="1" stop-color="#E8FB04" stop-opacity="0" />
                </linearGradient>
            </defs>
        </svg>

    )
}