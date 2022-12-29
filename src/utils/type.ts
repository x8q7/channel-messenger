export function getType(val: any): string {
    let type: string = 'unknown';
    switch (Object.prototype.toString.call(val)) {
    case '[object Number]':
        type = 'number';
        break;
    case '[object BigInt]':
        type = 'bigint';
        break;
    case '[object String]':
        type = 'string';
        break;
    case '[object Boolean]':
        type = 'boolean';
        break;
    case '[object Array]':
        type = 'array';
        break;
    case '[object Object]':
        type = 'object';
        break;
    case '[object Function]':
        type = 'function';
        break;
    case '[object Undefined]':
        type = 'undefined';
        break;
    case '[object Null]':
        type = 'null';
        break;
    case '[object Date]':
        type = 'date';
        break;
    case '[object RegExp]':
        type = 'regexp';
        break;
    case '[object Error]':
        type = 'error';
        break;
    case '[object Promise]':
        type = 'promise';
        break;

    default:
        break;
    }

    return type;
}