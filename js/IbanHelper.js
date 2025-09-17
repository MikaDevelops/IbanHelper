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
        "RU",
        "VG"
    ];

    checkIban(ibanToCheck){
        if(!this.#checkTehCountryCode(ibanToCheck)) throw new Error('country code not good');
        let countryCode = this.#numberFromCoutryCode(ibanToCheck);
        let checkNums = ibanToCheck.slice(2,4);
        let theRest = ibanToCheck.slice(4);
        if ( theRest.search(/[a-zA-Z]/) > -1 ) theRest = this.#convertLettersToNumbers(theRest);
        let checkableNum = theRest + countryCode+ checkNums;
        return this.#checkMod(checkableNum);
    }

    createIban(countrycode, bankCode, bban){
        let countryCodeNum = this.#numberFromCoutryCode(countrycode);
        let bankCodeNum = bankCode.search(/[a-zA-Z]/) > -1 ? this.#convertLettersToNumbers(bankCode) : bankCode;
        let bbanNum = bban.search(/[a-zA-Z]/) > -1 ? this.#convertLettersToNumbers(bban) : bban;
        let rawNumber = bankCodeNum + bbanNum + countryCodeNum + "00";
        let modNum = this.#countMod97(rawNumber);
        let checkNum = String(98 - Number(modNum));
        let ibanNum = countrycode + checkNum + bankCode + bban;
        return ibanNum;
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

    #charToNum(character){
        character = character.toUpperCase();
        character = String(character.codePointAt(0)-55);
        return character;
    }

    #checkMod(num){
        
        let modNum = this.#countMod97(num);
        if (modNum === '1') return true;
        else return false;
    }

    #countMod97(num){
        let startPart = "";
        let pointer = 0;
        let endPointer = 0;

        while (true){
            endPointer = pointer + 9 - startPart.length;
            let pieceOfNum = startPart + num.slice(pointer, endPointer);
            startPart = String(Number(pieceOfNum)%97);
            pointer = endPointer;
            if (pointer >= num.length) break; 
        }
        return startPart;
    }

    #convertLettersToNumbers(theNum){
        let arrayOfChars = theNum.split("");
        for (let i = 0; i < arrayOfChars.length; i++){
            if (arrayOfChars[i].search(/[a-zA-Z]/i)>-1) arrayOfChars[i] = this.#charToNum(arrayOfChars[i]);
        }
        return arrayOfChars.join("");
    }
}