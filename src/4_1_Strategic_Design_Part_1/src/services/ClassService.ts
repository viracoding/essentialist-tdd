import { prisma } from "../database";
import { AssignStudentDTO, CreateClassDTO } from "../dto/class";
import { GetByIdDTO } from "../dto";

class ClassNotFoundException {
    //     return res.status(404).json({ error: Errors.ClassNotFound, data: undefined, success: false });
}

export class ClassService {
    constructor () {}

    public create = async (dto: CreateClassDTO) => {
        const { name } = dto;

        return prisma.class.create({
            data: {
                name
            }
        });
    }

    public getAssignments = async (dto: GetByIdDTO)=> {
        const { id } = dto;

        // check if class exists
        const cls = await prisma.class.findUnique({
            where: {
                id
            }
        });

        if (!cls) {
           throw new ClassNotFoundException();
        }

        return prisma.assignment.findMany({
            where: {
                classId: id
            },
            include: {
                class: true,
                studentTasks: true
            }
        });
    }

    public assignStudent = async (dto: AssignStudentDTO) => {
        const { studentId, classId } = dto;

        // check if student exists
        const student = await prisma.student.findUnique({
            where: {
                id: studentId
            }
        });

        if (!student) {
            throw new ClassNotFoundException()
        //     StudentNotFound
        }

        // check if class exists
        const cls = await prisma.class.findUnique({
            where: {
                id: classId
            }
        });

        // check if student is already enrolled in class
        const duplicatedClassEnrollment = await prisma.classEnrollment.findFirst({
            where: {
                studentId,
                classId
            }
        });

        if (duplicatedClassEnrollment) {
            // StudentAlreadyEnrolled
            throw new ClassNotFoundException();
        }

        if (!cls) {
            throw new ClassNotFoundException();
        }

        return prisma.classEnrollment.create({
            data: {
                studentId,
                classId
            }
        });
    }
}