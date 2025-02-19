import express from 'express';
import { PrismaClient } from '@prisma/client';
import { Database } from "./database";
import { AssignmentController, ClassController, StudentController } from "./controllers/";
import { AssignmentService, ClassService, StudentService } from "./services";

const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());


const prisma = new PrismaClient();

const database = new Database(prisma);

const studentService = new StudentService(database);
const studentController = new StudentController(studentService);

const classService = new ClassService(database);
const classController = new ClassController(classService);

const assignmentService = new AssignmentService(database);
const assignmentController = new AssignmentController(assignmentService);


export const Errors = {
    ValidationError: 'ValidationError',
    StudentNotFound: 'StudentNotFound',
    ClassNotFound: 'ClassNotFound',
    AssignmentNotFound: 'AssignmentNotFound',
    ServerError: 'ServerError',
    ClientError: 'ClientError',
    StudentAlreadyEnrolled: 'StudentAlreadyEnrolled'
  }

export function isMissingKeys (data: any, keysToCheckFor: string[]) {
    for (let key of keysToCheckFor) {
      if (data[key] === undefined) return true;
    } 
    return false;
}

export function parseForResponse(data: unknown) {
    return JSON.parse(JSON.stringify(data));
}

export function isUUID (id: string) {
    return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(id);
}

// API Endpoints

// POST student created
app.post('/students', studentController.create);
// GET all students
app.get('/students', studentController.getAll);
// GET a student by id
app.get('/students/:id', studentController.getById);
// GET all student submitted assignments
app.get('/student/:id/assignments', studentController.getAssignments);
// GET all student grades
app.get('/student/:id/grades', studentController.getGrades)

// POST class created
app.post('/classes', classController.create);
// GET all assignments for class
app.get('/classes/:id/assignments', classController.getAssignments);
// POST student assigned to class
app.post('/class-enrollments', classController.assignStudent);

// POST assignment created
app.post('/assignments', assignmentController.create);
// GET assignment by id
app.get('/assignments/:id', assignmentController.getById);
// POST student assigned to assignment
app.post('/student-assignments', assignmentController.assignStudent);
// POST student submitted assignment
app.post('/student-assignments/submit', assignmentController.submit);
// POST student assignment graded
app.post('/student-assignments/grade', assignmentController.grade);


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
