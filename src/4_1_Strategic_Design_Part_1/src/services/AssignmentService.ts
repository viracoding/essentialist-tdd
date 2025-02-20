import {
    AssignStudentDTO,
    CreateAssignmentDTO,
    GradeAssignmentDTO,
    SubmitAssignmentDTO
} from "../dtos/assignment";
import { GetByIdDTO } from "../dtos";
import { Database } from "../database";
import {AssignmentNotFoundException, GradeNotValidException, StudentNotFoundException} from "../exceptions";

export class AssignmentService {
    constructor (private db: Database) {}

    public create = async (dto: CreateAssignmentDTO) => {
        const { classId, title } = dto;
        return await this.db.saveAssignment(classId, title);
    }

    public assignStudent = async (dto: AssignStudentDTO) => {
        const { studentId, assignmentId } = dto;

        const student = await this.db.existsStudent(studentId);

        if (!student) {
            throw new StudentNotFoundException();
        }

        const assignment = await this.db.existsAssignment(assignmentId);

        if (!assignment) {
            throw new AssignmentNotFoundException();
        }

       return await this.db.saveStudentAssignment(assignmentId, studentId);
    };

    public submit = async (dto: SubmitAssignmentDTO) => {
        const { id } = SubmitAssignmentDTO.fromRequest(dto);

        // check if student assignment exists
        const studentAssignment = await this.db.existsStudentAssignment(id);

        if (!studentAssignment) {
            throw new AssignmentNotFoundException();
        }

        return await this.db.submitStudentAssignment(id);
    }

    public grade = async (dto: GradeAssignmentDTO) => {
        const { id, grade } = dto;

        // validate grade
        const validGrades = ['A', 'B', 'C', 'D'];
        if (!validGrades.includes(grade)) {
            throw new GradeNotValidException(validGrades);
        }

        // check if student assignment exists
        const studentAssignment = await this.db.existsStudentAssignment(id);

        if (!studentAssignment) {
            throw new AssignmentNotFoundException();
        }

        return await this.db.gradeStudentAssignment(id, grade);
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