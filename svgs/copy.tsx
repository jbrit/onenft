import { SVGProps } from "react";

export function Copy(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13 7H7V5H13V7ZM13 11H7V9H13V11ZM7 15H13V13H7V15Z"
        fill="white"
        fillOpacity="0.67"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 19V1H17V5H21V23H7V19H3ZM15 17V3H5V17H15ZM17 7V19H9V21H19V7H17Z"
        fill="white"
        fillOpacity="0.67"
      />
    </svg>
  );
}
