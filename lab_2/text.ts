type StringIndexed = Record<string, any>;

const obj: StringIndexed = {
    key: 1,
    key1_1: null,
    key1_2: undefined,
    key1_3: {},
    key1_4: [],
    key1_5: '',
    key1_6: ' ',
    key2: 'test',
    key3: false,
    key4: true,
    key5: [1, 2, 3],
    key6: {a: 1},
    key7: {b: {d: 2}},
    key8: {b: {d: 2, c: 4}},
    key9: {m: {c: 2, r: 4}, r: {m: { p: 4}, c: 2}},
    key0: [{a: 8}, {b: 9}, {c: 7}],
    megaKey: [{a: [1, {r: 1}, [1, 4]]}, {b: [3, 2, {c: 3}]}, {c: 7}],
};

// function format(fn: (data: StringIndexed) => string[] ): (data: StringIndexed) => string | never {
//     return function (data: StringIndexed): string | never {
//         const formattedResult = fn(data)
//         for (let i = 0; i < formattedResult.length; i++) {
//             const query = formattedResult[i]
//             if (query.split('=').length > 2) {
//                 const separatedQuery = query.split('=')
//                 const arr =  separatedQuery.slice(1, separatedQuery.length-1).map((x: any) => `[${x}]`).join('')
//                 formattedResult[i] = `${separatedQuery[0]}${arr}=${separatedQuery.pop()}`
//             }
//         }
//         return formattedResult.join('&')
//     }
// }
//
// type PlainObject<T = unknown> = {
//     [k in string]: T;
// };
//
// function isPlainObject(value: unknown): value is PlainObject {
//     return typeof value === 'object'
//         && value !== null
//         && value.constructor === Object
//         && Object.prototype.toString.call(value) === '[object Object]';
// }
//
// function queryStringify(data: StringIndexed): string[]   {
//     const result = []
//     for (const [key, value] of Object.entries(data)) {
//         if(Array.isArray(value)) {
//             result.push(
//                 ...queryStringify(Object.fromEntries(value.entries()))
//                     .map((x: any) => `${key}=${x}`)
//             )
//         } else if ( isPlainObject(value) ) {
//             const arr = queryStringify(value)
//             arr.forEach(x => {
//                 result.push(`${key}=${x}`)
//             })
//         } else {
//             if (typeof value === "string" ) {
//                 if (value.toString().trim().length > 0) result.push(`${key}=${value}`)
//             } else {
//                 result.push(`${key}=${value}`)
//             }
//         }
//     }
//     return result
// }
//

type PlainObject<T = unknown> = {
    [k in string]: T;
};

function isPlainObject(value: unknown): value is PlainObject {
    return typeof value === 'object'
        && value !== null
        && value.constructor === Object
        && Object.prototype.toString.call(value) === '[object Object]';
}

function queryStringify(data: any): string | never  {
    if (typeof data !== "object") throw new Error('input must be an object')
    function innerQuery(data: StringIndexed): string[] {
        const result = []
        for (const [key, value] of Object.entries(data)) {
            if(Array.isArray(value)) {
                const obj: PlainObject = {};
                for (let i = 0; i < value.length; i++) {
                    obj[i] = value[i];
                }
                result.push(
                    ...innerQuery(obj)
                        .map((x: any) => `${key}=${x}`)
                )
            } else if ( isPlainObject(value) ) {
                const arr = innerQuery(value)
                arr.forEach(x => {
                    result.push(`${key}=${x}`)
                })
            } else {
                if (typeof value === "string" ) {
                    if (value.toString().trim().length > 0) result.push(`${key}=${value}`)
                } else {
                    result.push(`${key}=${value}`)
                }
            }
        }
        return result
    }

    const formattedResult = innerQuery(data)
    for (let i = 0; i < formattedResult.length; i++) {
        const query = formattedResult[i]
        if (query.split('=').length > 2) {
            const separatedQuery = query.split('=')
            const arr =  separatedQuery.slice(1, separatedQuery.length-1).map((x: any) => `[${x}]`).join('')
            formattedResult[i] = `${separatedQuery[0]}${arr}=${separatedQuery.pop()}`
        }
    }
    return formattedResult.join('&')
}


console.log(queryStringify(obj));
