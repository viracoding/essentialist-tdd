import { PrismaClient } from '@prisma/client';
import { Database } from "./database";
import { Application } from './server'
import { AssignmentController, ClassController, StudentController } from "./controllers/";
import { AssignmentService, ClassService, StudentService } from "./services";
import {ErrorExceptionHandler} from "./errorExceptionHandler";

const prisma = new PrismaClient();

const database = new Database(prisma);

const exceptionHandler = new ErrorExceptionHandler();

const studentService = new StudentService(database);
const studentController = new StudentController(studentService, exceptionHandler);

const classService = new ClassService(database);
const classController = new ClassController(classService, exceptionHandler);

const assignmentService = new AssignmentService(database);
const assignmentController = new AssignmentController(assignmentService, exceptionHandler);

const application = new Application(
    studentController,
    classController,
    assignmentController
);

export default application;
