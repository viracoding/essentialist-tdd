import { Database } from "../database";
import { AssignStudentDTO, CreateClassDTO } from "../dtos/class";
import { GetByIdDTO } from "../dtos";
import {ClassNotFoundException, StudentAlreadyEnrolledException, StudentNotFoundException} from "../exceptions";

export class ClassService {
    constructor (private db: Database) {}

    public create = async (dto: CreateClassDTO) => {
        const { name } = dto;

        return await this.db.saveClass(name);
    }

    public getAssignments = async (dto: GetByIdDTO)=> {
        const { id } = dto;

        // check if class exists
        const cls = await this.db.existsClass(id);

        if (!cls) {
           throw new ClassNotFoundException(id);
        }

        return await this.db.getAssignmentByClass(id);
    }

    public assignStudent = async (dto: AssignStudentDTO) => {
        const { studentId, classId } = dto;

        // check if student exists
        const student = await this.db.existsStudent(studentId);

        if (!student) {
            throw new StudentNotFoundException()
        }

        // check if class exists
        const cls = await this.db.existsClass(classId);

        if (!cls) {
            throw new ClassNotFoundException(classId);
        }

        // check if student is already enrolled in class
        const duplicatedClassEnrollment = await this.db.isStudentEnrolledInClass(studentId, classId);

        if (duplicatedClassEnrollment) {
            throw new StudentAlreadyEnrolledException();
        }

        return await this.db.enrollStudent(studentId, classId);
    }
}