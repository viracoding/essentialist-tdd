import {isMissingKeys} from "../index";
import {InvalidRequestBodyException} from "../controllers";

class CreateStudentDTO {
    constructor(public name: string) {}

    static fromRequest(body: unknown) {
        const requiredKeys = ["name"];
        const isRequestInvalid =
            !body || typeof body !== "object" || isMissingKeys(body, requiredKeys);

        if (isRequestInvalid) {
            throw new InvalidRequestBodyException(requiredKeys);
        }

        const { name } = body as {
            name: string;
        };

        return new CreateStudentDTO(name);
    }
}

export { CreateStudentDTO }