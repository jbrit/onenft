import { SVGProps } from "react";

export function Hamburger(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.125 5H16.875M3.125 10H16.875M3.125 15H16.875"
        stroke="white"
        strokeOpacity="0.87"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
