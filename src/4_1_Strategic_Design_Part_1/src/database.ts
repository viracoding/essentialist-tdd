import type { PrismaClient } from "@prisma/client";

export class Database {
    private prisma: PrismaClient;

    constructor (prisma: PrismaClient) {
        this.prisma = prisma;
    }

    // student
    public async saveStudent(name: string) {
        const data = await this.prisma.student.create({
            data: {
                name,
            },
        });

        return data;
    }

    public async getAllStudents() {
        const data = await this.prisma.student.findMany({
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
        const data = await this.prisma.student.findUnique({
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
        const student = await this.prisma.student.findUnique({
            where: {
                id
            }
        });
        return student;
    }

    // class
    public async saveClass(name: string) {
        return await this.prisma.class.create({
            data: {
                name
            }
        });
    }

    public async existsClass(id: string) {
        const cls = await this.prisma.class.findUnique({
            where: {
                id
            }
        });
        return cls;
    }

    // assignment
    public async saveAssignment(classId: string, title: string) {
        return await this.prisma.assignment.create({
            data: {
                classId,
                title
            }
        });
    }

    public async getAssignmentByClass(classId: string) {
        const data = await this.prisma.assignment.findMany({
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
        return await this.prisma.assignment.findUnique({
            where: {
                id
            }
        });
    }

    public async getAssignmentById(id: string) {
        return await this.prisma.assignment.findUnique({
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
        return await this.prisma.studentAssignment.create({
                data: {
                    assignmentId,
                    studentId
                }
            }
        );
    }

    public async getStudentAssignments(id: string) {
        const data = await this.prisma.studentAssignment.findMany({
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
        const data = await this.prisma.studentAssignment.findMany({
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
        return await this.prisma.studentAssignment.findUnique({
            where: {
                id
            }
        });
    }

    public async submitStudentAssignment(id: string) {
        return await this.prisma.studentAssignment.update({
            where: {
                id
            },
            data: {
                status: 'submitted'
            }
        });
    }

    public async gradeStudentAssignment(id: string, grade: string) {
        return await this.prisma.studentAssignment.update({
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
        const data = await this.prisma.classEnrollment.findFirst({
            where: {
                studentId,
                classId
            }
        });
        return data;
    }

    public async enrollStudent(studentId: string, classId: string) {
        return await this.prisma.classEnrollment.create({
            data: {
                studentId,
                classId
            }
        });
    }
}