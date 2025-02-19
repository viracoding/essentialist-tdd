import {
    AssignStudentDTO,
    CreateAssignmentDTO,
    GradeAssignmentDTO,
    SubmitAssignmentDTO
} from "../dto/assignment";
import { GetByIdDTO } from "../dto";
import { Database } from "../database";

class StudentNotFoundException {
    //     return res.status(404).json({ error: Errors.StudentNotFound, data: undefined, success: false });
}

class AssignmentNotFoundException {
    //     return res.status(404).json({ error: Errors.AssignmentNotFound, data: undefined, success: false });
}

class ValidationNotValidException {
//                 return res.status(400).json({ error: Errors.ValidationError, data: undefined, success: false });
}

export class AssignmentService {
    private db: Database;
    constructor (db: Database) {
        this.db = db;
    }

    public create = async (dto: CreateAssignmentDTO) => {
        const { classId, title } = dto;
        return await this.db.saveAssignment(classId, title);
    }

    public assignStudent = async (dto: AssignStudentDTO) => {
        const { studentId, assignmentId } = dto;

        const student = this.db.existsStudent(studentId);

        if (!student) {
            throw new StudentNotFoundException();
        }

        const assignment = this.db.existsAssignment(assignmentId);

        if (!assignment) {
            throw new AssignmentNotFoundException();
        }

       return this.db.saveStudentAssignment(assignmentId, studentId);
    };

    public submit = async (dto: SubmitAssignmentDTO) => {
        const { id } = SubmitAssignmentDTO.fromRequest(dto);

        // check if student assignment exists
        const studentAssignment = this.db.existsStudentAssignment(id);

        if (!studentAssignment) {
            throw new AssignmentNotFoundException();
        }

        return this.db.submitStudentAssignment(id);
    }

    public grade = async (dto: GradeAssignmentDTO) => {
        const { id, grade } = dto;

        // validate grade
        if (!['A', 'B', 'C', 'D'].includes(grade)) {
            throw new ValidationNotValidException();
        }

        // check if student assignment exists
        const studentAssignment = this.db.existsStudentAssignment(id);

        if (!studentAssignment) {
            throw new AssignmentNotFoundException();
        }

        return this.db.gradeStudentAssignment(id, grade);
    }

    public getById = async (dto: GetByIdDTO)=> {
        const { id } = dto;

        const assignment = await this.db.getAssignmentById(id);

        if (!assignment) {
            throw new AssignmentNotFoundException();
        }

        return assignment;
    }
}