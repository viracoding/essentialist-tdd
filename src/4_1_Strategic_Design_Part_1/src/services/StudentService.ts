import { prisma } from "../database";
import { CreateStudentDTO } from "../dto/student";
import { GetByIdDTO } from "../dto";

class StudentNotFoundException {
    // StudentNotFound
}

export class StudentService {
    constructor() { }

    public create = async (dto: CreateStudentDTO) => {
        const { name } = dto;

        return prisma.student.create({
            data: {
                name
            }
        });
    }
    public getAll = async () => {
        return prisma.student.findMany({
            include: {
                classes: true,
                assignments: true,
                reportCards: true
            },
            orderBy: {
                name: 'asc'
            }
        });
    }
    public getById = async (dto: GetByIdDTO) => {
        const { id } = dto;
        const student = await prisma.student.findUnique({
            where: {
                id
            },
            include: {
                classes: true,
                assignments: true,
                reportCards: true
            }
        });

        if (!student) {
            throw new StudentNotFoundException();
        }
        return student;
    }
    public getAssignments = async (dto: GetByIdDTO) => {
        const { id } = dto

        // check if student exists
        const student = await prisma.student.findUnique({
            where: {
                id
            }
        });

        if (!student) {
            throw new StudentNotFoundException();
            // Errors.StudentNotFound
        }

        return prisma.studentAssignment.findMany({
            where: {
                studentId: id,
                status: 'submitted'
            },
            include: {
                assignment: true
            },
        });

    }
    public getGrades = async (dto: GetByIdDTO) => {
        const { id } = dto;

        // check if student exists
        const student = await prisma.student.findUnique({
            where: {
                id
            }
        });

        if (!student) {
            throw new StudentNotFoundException();
        }

        return prisma.studentAssignment.findMany({
            where: {
                studentId: id,
                status: 'submitted',
                grade: {
                    not: null
                }
            },
            include: {
                assignment: true
            },
        });
    }

}