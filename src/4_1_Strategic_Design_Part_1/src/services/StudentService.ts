import { Database } from "../database";
import { CreateStudentDTO } from "../dtos/student";
import { GetByIdDTO } from "../dtos";
import {StudentNotFoundException} from "../exceptions";

export class StudentService {
    constructor (private db: Database) {}

    public create = async (dto: CreateStudentDTO) => {
        const { name } = dto;

        return await this.db.saveStudent(name);
    }
    public getAll = async () => {
        return await this.db.getAllStudents();
    }
    public getById = async (dto: GetByIdDTO) => {
        const { id } = dto;
        const student = await this.db.getStudentById(id);

        if (!student) {
            throw new StudentNotFoundException();
        }
        return student;
    }
    public getAssignments = async (dto: GetByIdDTO) => {
        const { id } = dto

        // check if student exists
        const student = await this.db.existsStudent(id);

        if (!student) {
            throw new StudentNotFoundException();
        }

        return await this.db.getStudentAssignments(id);

    }
    public getGrades = async (dto: GetByIdDTO) => {
        const { id } = dto;

        // check if student exists
        const student = await this.db.existsStudent(id);

        if (!student) {
            throw new StudentNotFoundException();
        }

        return await this.db.getStudentGrades(id);
    }

}