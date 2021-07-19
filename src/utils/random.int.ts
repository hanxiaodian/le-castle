export default function randomInt (value: number) { // value在[-(2 ** 32 - 1), 2 ** 32 - 1]之间
    let l1: number
    let l2: number
    let r1: number
    let r2: number
    let i: number = 0

    l1 = (value >> 16) & 65535
    r1 = value & 65535;

    while (i < 3) {
        l2 = r1;
        r2 = l1 ^ Math.round((((1366 * r1 + 150889) % 714025) / 714025.0) * 32767);
        l1 = l2;
        r1 = r2;
        i += 1;
    }

    const result = ((r1 << 16) + l1)
    return result
}