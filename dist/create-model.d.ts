import { dataType, validationType } from "./types";
export default function createModel({ rules, data }: {
    rules: any;
    data?: {};
}): {
    set(data: dataType | Function): dataType;
    update(data: dataType | Function): dataType;
    validate(): validationType;
    get(): dataType;
};
