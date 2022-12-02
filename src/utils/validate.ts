import { getType } from "./type";

export function isNumber(val: number) {
    if (getType(val) === "number" && !Number.isNaN(val)) {
        return true;
    }
    return false;
}