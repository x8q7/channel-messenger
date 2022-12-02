import { getType } from "./type";

export function isNumber(val: number): boolean {
    if (getType(val) === "number" && !Number.isNaN(val)) {
        return true;
    }
    return false;
}

export function isString(val: string): boolean {
    if (getType(val) === "string" && val !== "") {
        return true;
    }
    return false;
}