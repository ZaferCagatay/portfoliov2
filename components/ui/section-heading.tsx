import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
export function SectionHeading({ className, ...props }: ComponentProps<"h2">) { return <h2 className={cn("section-heading", className)} {...props} />; }
