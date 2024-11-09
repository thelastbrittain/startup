export class Grade {
    constructor(prefix, suffix){
        this.prefix = prefix;
        this.suffix = suffix
    }

    greaterThan(otherGrade) {
        if (this.prefix < otherGrade.prefix) {
            return false;
        } else if (this.prefix > otherGrade.prefix) {
            return true;
        } else {
            if (this.suffix <= otherGrade.suffix){
                return false;
            } else {
                return true;
            }
        }
    }

    lessThan(otherGrade) {
        if (this.prefix < otherGrade.prefix) {
            return true;
        } else if (this.prefix > otherGrade.prefix) {
            return false;
        } else {
            if (this.suffix >= otherGrade.suffix){
                return false;
            } else {
                return true;
            }
        }
    }

    equalTo(otherGrade) {
        if (this.suffix === otherGrade.suffix && this.prefix === otherGrade.prefix){
            return true;
        } else {
            return false;
        }
    }
}