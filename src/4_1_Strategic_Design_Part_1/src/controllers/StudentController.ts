import express, { Request, Response, NextFunction } from 'express';
import { parseForResponse } from '../helper';
import { CreateStudentDTO } from "../dtos/student";
import { GetByIdDTO } from "../dtos";
import { StudentService } from "../services";
import { ErrorExceptionHandler } from "../errorExceptionHandler";

export class StudentController {
    private router: express.Router;

    constructor (
        private studentService: StudentService,
        private errorHandler: ErrorExceptionHandler
    ) {
        this.router = express.Router();
        this.routes();
        this.setupErrorHandler();
    }

    private routes() {
        // POST student created
        this.router.post('/students', this.create);
        // GET all students
        this.router.get('/students', this.getAll);
        // GET a student by id
        this.router.get('/students/:id', this.getById);
        // GET all student submitted assignments
        this.router.get('/student/:id/assignments', this.getAssignments);
        // GET all student grades
        this.router.get('/student/:id/grades', this.getGrades)
    }

    private setupErrorHandler() {
        this.router.use(this.errorHandler.handle);
    }

    public create = async (req: Request, res: Response, next: NextFunction)=> {
        try {
            const dto = CreateStudentDTO.fromRequest(req.body);
            const student = await this.studentService.create(dto)

            res.status(201).json({ error: undefined, data: parseForResponse(student), success: true });
        } catch (error) {
            next(error);
        }
    }

    public getAll = async (req: Request, res: Response, next: NextFunction) =>{
        try {
            const students = this.studentService.getAll();
            res.status(200).json({ error: undefined, data: parseForResponse(students), success: true });
        } catch (error) {
            next(error);
        }
    }

    public getById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const dto = GetByIdDTO.fromRequest(req.body);
            const student = this.studentService.getById(dto);

            res.status(200).json({ error: undefined, data: parseForResponse(student), success: true });
        } catch (error) {
            next(error);
        }
    }

    public getAssignments = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const dto = GetByIdDTO.fromRequest(req.params);
            const studentAssignments = this.studentService.getAssignments(dto);
            res.status(200).json({ error: undefined, data: parseForResponse(studentAssignments), success: true });
        } catch (error) {
            next(error);
        }
    }

    public getGrades = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const dto = GetByIdDTO.fromRequest(req.params);
            const studentAssignments = this.studentService.getGrades(dto);

            res.status(200).json({ error: undefined, data: parseForResponse(studentAssignments), success: true });
        } catch (error) {
            next(error);
        }
    }
}