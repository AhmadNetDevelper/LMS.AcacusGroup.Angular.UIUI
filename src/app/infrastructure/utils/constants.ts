export interface IPattern {
    DIGIT_REGEX: RegExp;
    EMAIL_REGEX: RegExp;
    SYMBOL_REGEX: RegExp;
    PASSWORD_REGEX: RegExp;
}

export interface IConstant {
    patterns: IPattern;
}


export const Constants: IConstant = {
    patterns: {
        DIGIT_REGEX: /[0-9]{9}/,
        EMAIL_REGEX: /^[a-z0-9!#$%&'*+\/=?^_\`{|}~.-]+@[a-z0-9]([a-z0-9-])+(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i,
        SYMBOL_REGEX: /[-+_!@#$%^&*,.?]/,
        PASSWORD_REGEX: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}/,
    },
}