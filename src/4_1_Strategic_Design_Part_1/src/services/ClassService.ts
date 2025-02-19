import { Database } from "../database";
import { AssignStudentDTO, CreateClassDTO } from "../dtos/class";
import { GetByIdDTO } from "../dtos";

class ClassNotFoundException {
    //     return res.status(404).json({ error: Errors.ClassNotFound, data: undefined, success: false });
}

export class ClassService {
    private db: Database;
    constructor (db: Database) {
        this.db = db;
    }

    public create = async (dto: CreateClassDTO) => {
        const { name } = dto;

        return await this.db.saveClass(name);
    }

    public getAssignments = async (dto: GetByIdDTO)=> {
        const { id } = dto;

        // check if class exists
        const cls = await this.db.existsClass(id);

        if (!cls) {
           throw new ClassNotFoundException();
        }

        return await this.db.getAssignmentByClass(id);
    }

    public assignStudent = async (dto: AssignStudentDTO) => {
        const { studentId, classId } = dto;

        // check if student exists
        const student = await this.db.existsStudent(studentId);

        if (!student) {
            throw new ClassNotFoundException()
        //     StudentNotFound
        }

        // check if class exists
        const cls = await this.db.existsClass(classId);

        // check if student is already enrolled in class
        const duplicatedClassEnrollment = await this.db.isStudentEnrolledInClass(studentId, classId);

        if (duplicatedClassEnrollment) {
            // StudentAlreadyEnrolled
            throw new ClassNotFoundException();
        }

        if (!cls) {
            throw new ClassNotFoundException();
        }

        return await this.db.enrollStudent(studentId, classId);
    }
}