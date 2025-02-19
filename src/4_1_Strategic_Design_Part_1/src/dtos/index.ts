import {isMissingKeys, isUUID} from "../index";
import {InvalidRequestBodyException} from "../controllers";

class GetByIdDTO {
    constructor(public id: string) {}

    static fromRequest(body: unknown) {
        const requiredKeys = ["id"];
        const isRequestInvalid =
            !body || typeof body !== "object" || isMissingKeys(body, requiredKeys);

        if (isRequestInvalid) {
            throw new InvalidRequestBodyException(requiredKeys);
        }

        const { id } = body as {
            id: string;
        };

        if(!isUUID(id)) {
            throw new InvalidRequestBodyException(requiredKeys);
        }

        return new GetByIdDTO(id);
    }
}

export { GetByIdDTO }