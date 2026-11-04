import { useCallback, useEffect, useState } from "react";

export function useControlledState(props) {
    const { value, defaultValue, onChange } = props;

    const [state, setInternalState] = useState(
        value !== undefined ? value : defaultValue,
    );

    useEffect(() => {
        if (value !== undefined) setInternalState(value);
    }, [value]);

    const setState = useCallback(
        (next, ...args) => {
            setInternalState(next);
            onChange?.(next, ...args);
        },
        [onChange],
    );

    return [state, setState];
}
