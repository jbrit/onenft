import { SVGProps } from "react";

export function Collection(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.8334 1.75H1.16675V5.25H1.75008V11.6667C1.75008 11.9761 1.873 12.2728 2.09179 12.4916C2.31058 12.7104 2.60733 12.8333 2.91675 12.8333H11.0834C11.3928 12.8333 11.6896 12.7104 11.9084 12.4916C12.1272 12.2728 12.2501 11.9761 12.2501 11.6667V5.25H12.8334V1.75ZM2.33341 2.91667H11.6667V4.08333H2.33341V2.91667ZM11.0834 11.6667H2.91675V5.25H11.0834V11.6667ZM5.25008 6.41667H8.75008C8.75008 6.72609 8.62717 7.02283 8.40837 7.24162C8.18958 7.46042 7.89283 7.58333 7.58342 7.58333H6.41675C6.10733 7.58333 5.81058 7.46042 5.59179 7.24162C5.373 7.02283 5.25008 6.72609 5.25008 6.41667Z"
        fill="white"
        fillOpacity="0.67"
      />
    </svg>
  );
}