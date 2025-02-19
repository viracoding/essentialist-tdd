import {
    AssignStudentDTO,
    CreateAssignmentDTO,
    GradeAssignmentDTO,
    SubmitAssignmentDTO
} from "../dto/assignment";
import { GetByIdDTO } from "../dto";
import { prisma } from "../database";

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

    public create = async (dto: CreateAssignmentDTO) => {
        const { classId, title } = dto;
        return prisma.assignment.create({
            data: {
                classId,
                title
            }
        });
    }

    public assignStudent = async (dto: AssignStudentDTO) => {
        const { studentId, assignmentId } = dto;

        const student = await prisma.student.findUnique({
            where: {
                id: studentId
            }
        });

        if (!student) {
            throw new StudentNotFoundException();
        }

        const assignment = await prisma.assignment.findUnique({
            where: {
                id: assignmentId
            }
        });

        if (!assignment) {
            throw new AssignmentNotFoundException();
        }

        return prisma.studentAssignment.create({
                data: {
                    assignmentId,
                    studentId
                }
            }
        );
    };

    public submit = async (dto: SubmitAssignmentDTO) => {
        const { id } = SubmitAssignmentDTO.fromRequest(dto);

        // check if student assignment exists
        const studentAssignment = await prisma.studentAssignment.findUnique({
            where: {
                id
            }
        });

        if (!studentAssignment) {
            throw new AssignmentNotFoundException();
        }

        return prisma.studentAssignment.update({
            where: {
                id
            },
            data: {
                status: 'submitted'
            }
        });
    }

    public grade = async (dto: GradeAssignmentDTO) => {
        const { id, grade } = dto;

        // validate grade
        if (!['A', 'B', 'C', 'D'].includes(grade)) {
            throw new ValidationNotValidException();
        }

        // check if student assignment exists
        const studentAssignment = await prisma.studentAssignment.findUnique({
            where: {
                id
            }
        });

        if (!studentAssignment) {
            throw new AssignmentNotFoundException();
        }

        return prisma.studentAssignment.update({
            where: {
                id
            },
            data: {
                grade,
            }
        });
    }

    public getById = async (dto: GetByIdDTO)=> {
        const { id } = dto;

        const assignment = await prisma.assignment.findUnique({
            include: {
                class: true,
                studentTasks: true
            },
            where: {
                id
            }
        });

        if (!assignment) {
            throw new AssignmentNotFoundException();
        }
    }
}