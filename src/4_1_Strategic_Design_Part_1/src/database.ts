import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class Database {

    constructor () {}

    // student
    public async saveStudent(name: string) {
        const data = await prisma.student.create({
            data: {
                name,
            },
        });

        return data;
    }

    public async getAllStudents() {
        const data = await prisma.student.findMany({
            include: {
                classes: true,
                assignments: true,
                reportCards: true,
            },
            orderBy: {
                name: "asc",
            },
        });

        return data;
    }

    public async getStudentById(id: string) {
        const data = await prisma.student.findUnique({
            where: {
                id,
            },
            include: {
                classes: true,
                assignments: true,
                reportCards: true,
            },
        });

        return data;
    }

    public async existsStudent(id: string) {
        const student = await prisma.student.findUnique({
            where: {
                id
            }
        });
        return student;
    }

    // class
    public async saveClass(name: string) {
        return prisma.class.create({
            data: {
                name
            }
        });
    }

    public async existsClass(id: string) {
        const cls = await prisma.class.findUnique({
            where: {
                id
            }
        });
        return cls;
    }

    // assignment
    public async saveAssignment(classId: string, title: string) {
        return prisma.assignment.create({
            data: {
                classId,
                title
            }
        });
    }

    public async getAssignmentByClass(classId: string) {
        const data = await prisma.assignment.findMany({
            where: {
                classId
            },
            include: {
                class: true,
                studentTasks: true
            }
        });
        return data;
    }

    public async existsAssignment(id: string) {
        return prisma.assignment.findUnique({
            where: {
                id
            }
        });
    }

    public async getAssignmentById(id: string) {
        return prisma.assignment.findUnique({
            include: {
                class: true,
                studentTasks: true
            },
            where: {
                id
            }
        });
    }

    // student assignment
    public async saveStudentAssignment(assignmentId: string, studentId: string) {
        return prisma.studentAssignment.create({
                data: {
                    assignmentId,
                    studentId
                }
            }
        );
    }

    public async getStudentAssignments(id: string) {
        const data = prisma.studentAssignment.findMany({
            where: {
                studentId: id,
                status: 'submitted'
            },
            include: {
                assignment: true
            },
        });
        return data;
    }

    public async getStudentGrades(id: string) {
        const data = prisma.studentAssignment.findMany({
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
        return data;
    }

    public async existsStudentAssignment(id: string) {
        return prisma.studentAssignment.findUnique({
            where: {
                id
            }
        });
    }

    public async submitStudentAssignment(id: string) {
        return prisma.studentAssignment.update({
            where: {
                id
            },
            data: {
                status: 'submitted'
            }
        });
    }

    public async gradeStudentAssignment(id: string, grade: string) {
        return prisma.studentAssignment.update({
            where: {
                id
            },
            data: {
                grade,
            }
        });
    }

    // class enrollment
    public async isStudentEnrolledInClass(studentId: string, classId: string) {
        const data = await prisma.classEnrollment.findFirst({
            where: {
                studentId,
                classId
            }
        });
        return data;
    }

    public async enrollStudent(studentId: string, classId: string) {
        return prisma.classEnrollment.create({
            data: {
                studentId,
                classId
            }
        });
    }
}