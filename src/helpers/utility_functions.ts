export const getCurrentFormattedDate = (): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
};

export const parseDatesFromString = (str: string): string => {
    if (!str) {
        return '';
    }
    const dateRegex = /\d{1,2}\/\d{1,2}\/\d{4}/g;
    const dates = str.match(dateRegex);
    if (dates) {
        return dates.join(', ');
    } else {
        return '';
    }
};

export const isStringOnlyDigits = (str: string): boolean => {
    const regex = /^\d+$/; // Regular expression for matching digits
    return regex.test(str);
};