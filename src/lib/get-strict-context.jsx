import { createContext, useContext } from "react";

function getStrictContext(name) {
    const Context = createContext(undefined);

    const Provider = ({ value, children }) => (
        <Context.Provider value={value}>{children}</Context.Provider>
    );

    const useSafeContext = () => {
        const ctx = useContext(Context);
        if (ctx === undefined) {
            throw new Error(
                `useContext Must Be Used Within ${name ?? "a Provider"}`,
            );
        }
        return ctx;
    };

    return [Provider, useSafeContext];
}

export { getStrictContext };
