class IbanHelper{
    countryCodes=[
        "AL",
        "AD",
        "AT",
        "AZ",
        "BH",
        "BY",
        "BE",
        "BA",
        "BR",
        "BG",
        "CR",
        "HR",
        "CY",
        "CZ",
        "DK",
        "DO",
        "SV",
        "EE",
        "FO",
        "FI",
        "FR",
        "GE",
        "DE",
        "GI",
        "GR",
        "GL",
        "GT",
        "HU",
        "IS",
        "IQ",
        "IE",
        "IL",
        "IT",
        "JO",
        "KZ",
        "XK",
        "KW",
        "LV",
        "LB",
        "LI",
        "LT",
        "LU",
        "MK",
        "MT",
        "MR",
        "MU",
        "MD",
        "MC",
        "ME",
        "NL",
        "NO",
        "PK",
        "PS",
        "PL",
        "PT",
        "QA",
        "RO",
        "LC",
        "SM",
        "ST",
        "SA",
        "RS",
        "SC",
        "SK",
        "SI",
        "ES",
        "SE",
        "CH",
        "TL",
        "TN",
        "TR",
        "UA",
        "AE",
        "GB",
        "VA",
        "VG"
    ];

    checkIban(ibanToCheck){
        if(!this.#checkTehCountryCode(ibanToCheck)) throw new Error('country code not good');
        let countryCode = this.#numberFromCoutryCode(ibanToCheck);
        let checkNums = ibanToCheck.slice(2,4);
        let theRest = ibanToCheck.slice(4);
        let checkableNum = theRest + countryCode+ checkNums;
        return this.#checkMod(checkableNum);
    }

    #checkTehCountryCode(ibanToCheck){
        let countryCode = ibanToCheck.slice(0,2);
        countryCode=countryCode.toUpperCase();
        if( this.countryCodes.includes(countryCode)) return true;
        else return false;
    }

    #numberFromCoutryCode(iban){
        let countryCode = iban.slice(0,2).toUpperCase();
        countryCode = String(countryCode.codePointAt(0)-55) + String(countryCode.codePointAt(1)-55);
        return countryCode;
    }

    #checkMod(num){
        let startPart = "";
        let pointer = 0;
        let endPointer = 0;
        while (true){
            let lenOfStart = startPart.length;
            pointer = pointer + lenOfStart;
            endPointer = pointer + 9 - lenOfStart;
            
            let pieceOfNum = num.slice(pointer, endPointer);
            //let leftOvers = pie

            pointer = endPointer;
            

            break;
        }
    }
}

/*
0 1 2 3 4 5 6 7 8 9 10 11 12 13
5 3 0 4 9 5 3 4 2 3  4  2  3  4
^                 ^
                  ^  

*/