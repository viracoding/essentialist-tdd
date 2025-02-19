import { isMissingKeys, isUUID } from "../index";
import { InvalidRequestBodyException } from "../controllers";

class CreateAssignmentDTO {
    constructor(public classId: string, public title: string) {}

    static fromRequest(body: unknown) {
        const requiredKeys = ["classId", "title"];
        const isRequestInvalid =
            !body || typeof body !== "object" || isMissingKeys(body, requiredKeys);

        if (isRequestInvalid) {
            throw new InvalidRequestBodyException(requiredKeys);
        }

        const { classId, title } = body as {
            classId: string;
            title: string;
        };

        return new CreateAssignmentDTO(classId, title);
    }
}
class AssignStudentDTO {
    constructor(public studentId: string, public assignmentId: string) {}

    static fromRequest(body: unknown) {
        const requiredKeys = ["studentId", "assignmentId"];
        const isRequestInvalid =
            !body || typeof body !== "object" || isMissingKeys(body, requiredKeys);

        if (isRequestInvalid) {
            throw new InvalidRequestBodyException(requiredKeys);
        }

        const { studentId, assignmentId } = body as {
            studentId: string;
            assignmentId: string;
        };

        return new AssignStudentDTO(studentId, assignmentId);
    }
}
class SubmitAssignmentDTO {
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

        return new SubmitAssignmentDTO(id);
    }
}
class GradeAssignmentDTO {
    constructor(public id: string, public grade: string) {}

    static fromRequest(body: unknown) {
        const requiredKeys = ["id", "grade"];
        const isRequestInvalid =
            !body || typeof body !== "object" || isMissingKeys(body, requiredKeys);

        if (isRequestInvalid) {
            throw new InvalidRequestBodyException(requiredKeys);
        }

        const { id, grade } = body as {
            id: string;
            grade: string;
        };

        return new GradeAssignmentDTO(id, grade);
    }
}

export { CreateAssignmentDTO, AssignStudentDTO, SubmitAssignmentDTO, GradeAssignmentDTO }