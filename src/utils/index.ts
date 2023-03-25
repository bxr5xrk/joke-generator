// unite classNames
export const cl = (...classes: Array<string | undefined | boolean | null>) => {
    return classes.filter((i) => Boolean(i) && typeof i === 'string').join(' ');
};

export const setToLocalStorage = <T>(key: string, value: T) =>
    localStorage.setItem(key, JSON.stringify(value));
