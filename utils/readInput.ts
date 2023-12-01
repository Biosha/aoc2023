import * as fs from 'fs';

export function readInput(input: number) {
    return fs.readFileSync(`input/${input}.input`,'utf8');
}

export function readExample(input: number) {
    return fs.readFileSync(`example/${input}.input`,'utf8');
}