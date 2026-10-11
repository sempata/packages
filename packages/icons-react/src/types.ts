import type { SVGProps } from "react";

export type IconProps = Omit<
  SVGProps<SVGSVGElement>,
  "children" | "dangerouslySetInnerHTML"
> & { size?: number | string };
