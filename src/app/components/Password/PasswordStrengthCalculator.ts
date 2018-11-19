/*
 **    Created by: Jeff Todnem (http://www.todnem.com/)
 **    Created on: 2007-08-14
 **    Last modified: 2010-05-03
 **
 **    License Information:
 **    -------------------------------------------------------------------------
 **    Copyright (C) 2007 Jeff Todnem
 **
 **    This program is free software; you can redistribute it and/or modify it
 **    under the terms of the GNU General Public License as published by the
 **    Free Software Foundation; either version 2 of the License, or (at your
 **    option) any later version.
 **
 **    This program is distributed in the hope that it will be useful, but
 **    WITHOUT ANY WARRANTY; without even the implied warranty of
 **    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 **    General Public License for more details.
 **
 **    You should have received a copy of the GNU General Public License along
 **    with this program; if not, write to the Free Software Foundation, Inc.,
 **    59 Temple Place, Suite 330, Boston, MA 02111-1307 USA
 **
 */
export function getPasswordStrength(pwd: string): number {

    // TODO: this comment no longer holds true for newer browsers:
    // update code to be more readable or assign to objects instead of separate variables
    // Simultaneous variable declaration and value assignment aren't supported in IE apparently
    // so I'm forced to assign the same value individually per var to support a crappy browser *sigh*
    let nScore = 0;
    let nLength = 0;
    let nAlphaUC = 0;
    let nAlphaLC = 0;
    let nNumber = 0;
    let nSymbol = 0;
    let nMidChar = 0;
    let nRequirements = 0;
    let nAlphasOnly = 0;
    let nNumbersOnly = 0;
    let nUnqChar = 0;
    let nRepChar = 0;
    let nRepInc = 0;
    let nConsecAlphaUC = 0;
    let nConsecAlphaLC = 0;
    let nConsecNumber = 0;
    let nConsecSymbol = 0;
    let nConsecCharType = 0;
    let nSeqAlpha = 0;
    let nSeqNumber = 0;
    let nSeqSymbol = 0;
    let nSeqChar = 0;
    let nReqChar = 0;
    const nMultConsecCharType = 0;
    const nMultRepChar = 1;
    const nMultConsecSymbol = 1;
    const nMultMidChar = 2;
    const nMultRequirements = 2;
    const nMultConsecAlphaUC = 2;
    const nMultConsecAlphaLC = 2;
    const nMultConsecNumber = 2;
    const nReqCharType = 3;
    const nMultAlphaUC = 3;
    const nMultAlphaLC = 3;
    const nMultSeqAlpha = 3;
    const nMultSeqNumber = 3;
    const nMultSeqSymbol = 3;
    const nMultLength = 4;
    const nMultNumber = 4;
    const nMultSymbol = 6;
    let nTmpAlphaUC: number;
    let nTmpAlphaLC: number;
    let nTmpNumber: number;
    let nTmpSymbol: number;
    const sAlphas = "abcdefghijklmnopqrstuvwxyz";
    const sNumerics = "01234567890";
    const sSymbols = ")!@#$%^&*()";
    const nMinPwdLen = 8;

    if (!pwd) {
        return 0;
    }

    nScore = pwd.length * nMultLength;
    nLength = pwd.length;
    const arrPwd = pwd.replace(/\s+/g, "").split(/\s*/);
    const arrPwdLen = arrPwd.length;

    /* Loop through password to check for Symbol, Numeric, Lowercase and Uppercase pattern matches */
    for (let a = 0; a < arrPwdLen; a++) {
        if (arrPwd[a].match(/[A-Z]/g)) {
            if (nTmpAlphaUC !== undefined) {
                if ((nTmpAlphaUC + 1) === a) {
                    nConsecAlphaUC++;
                    nConsecCharType++;
                }
            }
            nTmpAlphaUC = a;
            nAlphaUC++;
        } else if (arrPwd[a].match(/[a-z]/g)) {
            if (nTmpAlphaLC !== undefined) {
                if ((nTmpAlphaLC + 1) === a) {
                    nConsecAlphaLC++;
                    nConsecCharType++;
                }
            }
            nTmpAlphaLC = a;
            nAlphaLC++;
        } else if (arrPwd[a].match(/[0-9]/g)) {
            if (a > 0 && a < (arrPwdLen - 1)) { nMidChar++; }
            if (nTmpNumber !== undefined) {
                if ((nTmpNumber + 1) === a) {
                    nConsecNumber++;
                    nConsecCharType++;
                }
            }
            nTmpNumber = a;
            nNumber++;
        } else if (arrPwd[a].match(/[^a-zA-Z0-9_]/g)) {
            if (a > 0 && a < (arrPwdLen - 1)) { nMidChar++; }
            if (nTmpSymbol !== undefined) {
                if ((nTmpSymbol + 1) === a) {
                    nConsecSymbol++;
                    nConsecCharType++;
                }
            }
            nTmpSymbol = a;
            nSymbol++;
        }
        /* Internal loop through password to check for repeat characters */
        let bCharExists = false;
        for (let b = 0; b < arrPwdLen; b++) {
            if (arrPwd[a] === arrPwd[b] && a !== b) { /* repeat character exists */
                bCharExists = true;
                /*
                Calculate increment deduction based on proximity to identical characters
                Deduction is incremented each time a new match is discovered
                Deduction amount is based on total password length divided by the
                difference of distance between currently selected match
                */
                nRepInc += Math.abs(arrPwdLen / (b - a));
            }
        }
        if (bCharExists) {
            nRepChar++;
            nUnqChar = arrPwdLen - nRepChar;
            nRepInc = (nUnqChar) ? Math.ceil(nRepInc / nUnqChar) : Math.ceil(nRepInc);
        }
    }

    /* Check for sequential alpha string patterns (forward and reverse) */
    for (let s = 0; s < 23; s++) {
        const sFwd = sAlphas.substring(s, s + 3);
        const sRev = reverseString(sFwd);
        if (pwd.toLowerCase().indexOf(sFwd) !== -1 || pwd.toLowerCase().indexOf(sRev) !== -1) {
            nSeqAlpha++;
            nSeqChar++;
        }
    }

    /* Check for sequential numeric string patterns (forward and reverse) */
    for (let s = 0; s < 8; s++) {
        const sFwd = sNumerics.substring(s, s + 3);
        const sRev = reverseString(sFwd);
        if (pwd.toLowerCase().indexOf(sFwd) !== -1 || pwd.toLowerCase().indexOf(sRev) !== -1) {
            nSeqNumber++;
            nSeqChar++;
        }
    }

    /* Check for sequential symbol string patterns (forward and reverse) */
    for (let s = 0; s < 8; s++) {
        const sFwd = sSymbols.substring(s, s + 3);
        const sRev = reverseString(sFwd);
        if (pwd.toLowerCase().indexOf(sFwd) !== -1 || pwd.toLowerCase().indexOf(sRev) !== -1) {
            nSeqSymbol++;
            nSeqChar++;
        }
    }
    let amountMatching = 0;
    // if at least 10 chars
    if (RegExp("^(?=.{8,})").test(pwd)) {
        amountMatching += 1;
    }

    /* Modify overall score value based on usage vs requirements */
    /* General point assignment */
    if (nAlphaUC > 0 && nAlphaUC < nLength) {
        nScore = nScore + ((nLength - nAlphaUC) * 2);
    }
    if (nAlphaLC > 0 && nAlphaLC < nLength) {
        nScore = nScore + ((nLength - nAlphaLC) * 2);
    }
    if (nNumber > 0 && nNumber < nLength) {
        nScore = nScore + (nNumber * nMultNumber);
    }
    if (nSymbol > 0) {
        nScore = nScore + (nSymbol * nMultSymbol);
    }
    if (nMidChar > 0) {
        nScore = nScore + (nMidChar * nMultMidChar);
    }

    // /* Point deductions for poor practices */
    if ((nAlphaLC > 0 || nAlphaUC > 0) && nSymbol === 0 && nNumber === 0) { // Only Letters
        nScore = (nScore - nLength);
        nAlphasOnly = nLength;
    }
    if (nAlphaLC === 0 && nAlphaUC === 0 && nSymbol === 0 && nNumber > 0) { // Only Numbers
        nScore = (nScore - nLength);
        nNumbersOnly = nLength;
    }
    if (nRepChar > 0) { // Same character exists more than once
        nScore = (nScore - nRepInc);
    }
    if (nConsecAlphaUC > 0) { // Consecutive Uppercase Letters exist
        nScore = (nScore - (nConsecAlphaUC * nMultConsecAlphaUC));
    }
    if (nConsecAlphaLC > 0) { // Consecutive Lowercase Letters exist
        nScore = (nScore - (nConsecAlphaLC * nMultConsecAlphaLC));
    }
    if (nConsecNumber > 0) { // Consecutive Numbers exist
        nScore = (nScore - (nConsecNumber * nMultConsecNumber));
    }
    if (nSeqAlpha > 0) { // Sequential alpha strings exist (3 characters or more)
        nScore = (nScore - (nSeqAlpha * nMultSeqAlpha));
    }
    if (nSeqNumber > 0) { // Sequential numeric strings exist (3 characters or more)
        nScore = (nScore - (nSeqNumber * nMultSeqNumber));
    }
    if (nSeqSymbol > 0) { // Sequential symbol strings exist (3 characters or more)
        nScore = (nScore - (nSeqSymbol * nMultSeqSymbol));
    }

    /* Determine if mandatory requirements have been met and set image indicators accordingly */
    const arrChars = [nLength, nAlphaUC, nAlphaLC, nNumber, nSymbol];
    const arrCharsIds = ["nLength", "nAlphaUC", "nAlphaLC", "nNumber", "nSymbol"];
    const arrCharsLen = arrChars.length;
    for (let c = 0; c < arrCharsLen; c++) {
        let minVal;
        if (arrCharsIds[c] === "nLength") {
            minVal = (nMinPwdLen - 1);
        } else {
            minVal = 0;
        }
        if (arrChars[c] === (minVal + 1)) {
            nReqChar++;
        } else if (arrChars[c] > (minVal + 1)) {
            nReqChar++;
        }
    }
    nRequirements = nReqChar;
    let nMinReqChars;
    if (pwd.length >= nMinPwdLen) { nMinReqChars = 3; } else { nMinReqChars = 4; }
    if (nRequirements > nMinReqChars) { // One or more required characters exist
        nScore = (nScore + (nRequirements * 2));
    }

    /* Determine complexity based on overall score */
    if (nScore > 100) { nScore = 100; } else if (nScore < 0) { nScore = 0; }

    return nScore;
}

function reverseString(input: string): string {
    let output = "";
    for (let s = 0; s < input.length; s++) {
        output = input.charAt(s) + output;
    }
    return output;
}
