import { isMissingKeys } from "../helper";
import { InvalidRequestBodyException } from "../exceptions";

class CreateClassDTO {
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

        return new CreateClassDTO(name);
    }
}
class AssignStudentDTO {
    constructor(public studentId: string, public classId: string) {}

    static fromRequest(body: unknown) {
        const requiredKeys = ["studentId", "classId"];
        const isRequestInvalid =
            !body || typeof body !== "object" || isMissingKeys(body, requiredKeys);

        if (isRequestInvalid) {
            throw new InvalidRequestBodyException(requiredKeys);
        }

        const { studentId, classId } = body as {
            studentId: string;
            classId: string;
        };

        return new AssignStudentDTO(studentId, classId);
    }
}

export { AssignStudentDTO, CreateClassDTO }