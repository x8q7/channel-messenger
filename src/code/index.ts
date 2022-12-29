export const Code = {
    OK: 0,

    // PARAMS
    PARAMS_ERR: 10000,

    // DB ERR
    DB_ERR: 20000

};

export interface Result {
    code: number;
    message: string;
    data: any;
}

export function BackData(code: number, message: string, data: any): Result {
    return {
        code,
        message,
        data
    };
}