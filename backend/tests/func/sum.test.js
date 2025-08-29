import { describe, it, expect } from "@jest/globals"
import { sum } from './sum.ts';

describe('Sum function', () =>{
    it('Returns correct value', () =>{
        expect(sum(2, 3)).toEqual(5)
    }),

    it('Should not return incorrect value', () =>{
        expect(sum(2, 3)).not.toBe(6);
    })
})