import { Database } from "../database";
import { CreateStudentDTO } from "../dto/student";
import { GetByIdDTO } from "../dto";

class StudentNotFoundException {
    // StudentNotFound
}

export class StudentService {
    private db: Database;
    constructor(db: Database) {
        this.db = db;
    }

    public create = async (dto: CreateStudentDTO) => {
        const { name } = dto;

        return this.db.saveStudent(name);
    }
    public getAll = async () => {
        return this.db.getAllStudents();
    }
    public getById = async (dto: GetByIdDTO) => {
        const { id } = dto;
        const student = this.db.getStudentById(id);

        if (!student) {
            throw new StudentNotFoundException();
        }
        return student;
    }
    public getAssignments = async (dto: GetByIdDTO) => {
        const { id } = dto

        // check if student exists
        const student = this.db.existsStudent(id);

        if (!student) {
            throw new StudentNotFoundException();
            // Errors.StudentNotFound
        }

        return this.db.getStudentAssignments(id);

    }
    public getGrades = async (dto: GetByIdDTO) => {
        const { id } = dto;

        // check if student exists
        const student = this.db.existsStudent(id);

        if (!student) {
            throw new StudentNotFoundException();
        }

        return this.db.getStudentGrades(id);
    }

}