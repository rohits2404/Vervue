"use client";

import { getStrictContext } from "@/lib/get-strict-context";
import { cn } from "cn";
import { CopyButton } from "../buttons/copy";
import { useTheme } from "next-themes";
import { useRef } from "react";
import { CodeBlock as CodeBlockPrimitive } from "../../primitives/animate/code-block";

const [CodeProvider, useCode] = getStrictContext("CodeContext");

function Code({ className, code, ...props }) {
    return (
        <CodeProvider value={{ code }}>
            <div
                className={cn(
                    "relative flex flex-col overflow-hidden border bg-accent/50 rounded-lg",
                    className,
                )}
                {...props}
            />
        </CodeProvider>
    );
}

function CodeHeader({
    className,
    children,
    icon: Icon,
    copyButton = false,
    ...props
}) {
    const { code } = useCode();

    return (
        <div
            className={cn(
                "bg-accent shrink-0 gap-x-2 border-b border-border/75 dark:border-border/50 text-sm flex text-muted-foreground items-center px-4 w-full h-10",
                className,
            )}
            {...props}
        >
            {Icon && <Icon className="size-4" />}
            {children}
            {copyButton && (
                <CopyButton
                    content={code}
                    size="xs"
                    variant="ghost"
                    className="ml-auto w-auto h-auto p-2 -mr-2"
                />
            )}
        </div>
    );
}

function CodeBlock({ cursor, className, ...props }) {
    const { resolvedTheme } = useTheme();
    const { code } = useCode();
    const scrollRef = useRef(null);

    return (
        <CodeBlockPrimitive
            ref={scrollRef}
            theme={resolvedTheme === "dark" ? "dark" : "light"}
            scrollContainerRef={scrollRef}
            className={cn(
                "relative text-sm p-4 overflow-auto",
                "[&>pre,&_code]:bg-transparent! [&>pre,&_code]:[background:transparent_!important] [&>pre,&_code]:border-none [&_code]:text-[13px]! [&_code_.line]:px-0!",
                cursor &&
                    "data-[done=false]:[&_.line:last-of-type::after]:content-['|'] data-[done=false]:[&_.line:last-of-type::after]:inline-block data-[done=false]:[&_.line:last-of-type::after]:w-[1ch] data-[done=false]:[&_.line:last-of-type::after]:-translate-px",
                className,
            )}
            code={code}
            {...props}
        />
    );
}

export { Code, CodeHeader, CodeBlock };
