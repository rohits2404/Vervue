import { useInView } from "motion/react";
import { useImperativeHandle, useRef } from "react";

export function useIsInView(ref, options = {}) {
    const { inView, inViewOnce = false, inViewMargin = "0px" } = options;
    const localRef = useRef(null);
    useImperativeHandle(ref, () => localRef.current);
    const inViewResult = useInView(localRef, {
        once: inViewOnce,
        margin: inViewMargin,
    });
    const isInView = !inView || inViewResult;
    return { ref: localRef, isInView };
}
