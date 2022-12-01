export enum Code {
    OK = 0,

    // DB ERR
    DB_ERR = 10000,

}

interface Result {
    code: Code;
    message: string;
    data: any;
}

export function BackData(code: Code, message: string, data: any): Result {
    return {
        code,
        message,
        data
    }
}