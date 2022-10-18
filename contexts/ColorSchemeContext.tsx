import { createContext, ReactNode, useEffect, useState, useContext } from "react";
import { getLocalStorage, setLocalStorage } from 'utils/storage'

interface ColorSchemeContext {
    colorScheme: 'dark' | 'light';
    toggleColorScheme: () => void;
}

const ColorSchemeContext = createContext({} as ColorSchemeContext);

const ColorSchemeContextProvider = ({ children }: { children: ReactNode }) => {
    const userTheme = getLocalStorage('color-theme');
    let systemTheme = false;
    // if (typeof window !== 'undefined') {
    //     systemTheme = window.matchMedia("(prefer-color-scheme: dark)").matches;
    // }

    const checkTheme = () => {
        if (userTheme === 'dark' || (!userTheme && systemTheme)) {
            if (typeof window !== 'undefined') {
                document.documentElement.classList.add('dark');
            }
            return 'dark';
        }
        if (typeof window !== 'undefined') {
            document.documentElement.classList.remove('dark');
        }
        return 'light';
    }
    const [colorScheme, setColorScheme] = useState<'dark' | 'light'>(checkTheme());

    // useEffect(() => {
    //     setLocalStorage('color-theme', colorScheme);
    //     colorScheme === 'dark' ? document.documentElement.classList.add('dark') : document.documentElement.classList.remove('dark');
    // }, [colorScheme])

    const toggleColorScheme = () => {
        const test = colorScheme === 'dark' ? 'light' : 'dark';
        setColorScheme(test);
        setLocalStorage('color-theme', test);
        if (test === 'dark') {
            if (typeof window !== 'undefined') {
                window.document.documentElement.classList.add('dark')
            }
        } else {
            if (typeof window !== 'undefined') {
                window.document.documentElement.classList.remove('dark');
            }
        }
    }

    const value = {
        colorScheme, toggleColorScheme
    }
    return (
        <ColorSchemeContext.Provider value={value}>
            {children}
        </ColorSchemeContext.Provider>
    )
}

const useColorScheme = () => {
    const context = useContext(ColorSchemeContext);
    if (!context) {
        throw new Error('Unable to set user session');
    }
    return context;
}

export { ColorSchemeContextProvider, useColorScheme };