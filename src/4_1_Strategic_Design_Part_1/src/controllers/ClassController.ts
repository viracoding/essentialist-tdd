import express, { Request, Response, NextFunction } from 'express';
import { parseForResponse } from '../helper';
import { AssignStudentDTO, CreateClassDTO } from "../dtos/class";
import { GetByIdDTO } from "../dtos";
import { ClassService } from "../services";
import { ErrorExceptionHandler } from "../errorExceptionHandler";

export class ClassController {
    private router: express.Router;

    constructor (
        private classService: ClassService,
        private errorHandler: ErrorExceptionHandler
   ) {
        this.router = express.Router();
        this.setupRoutes();
        this.setupErrorHandler();
    }

    getRouter() {
        return this.router;
    }

    private setupRoutes() {
        // POST class created
        this.router.post('/classes', this.create);
        // GET all assignments for class
        this.router.get('/classes/:id/assignments', this.getAssignments);
        // POST student assigned to class
        this.router.post('/class-enrollments', this.assignStudent);
    }

    private setupErrorHandler() {
        this.router.use(this.errorHandler.handle);
    }

    public create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const dto = CreateClassDTO.fromRequest(req.body);

            const newClass = await this.classService.create(dto)

            res.status(201).json({ error: undefined, data: parseForResponse(newClass), success: true });
        } catch (error) {
            next(error);
        }
    }

    public getAssignments = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const dto = GetByIdDTO.fromRequest(req.body);
            const assignments = await this.classService.getAssignments(dto)

            res.status(200).json({ error: undefined, data: parseForResponse(assignments), success: true });
        } catch (error) {
            next(error);
        }
    }

    public assignStudent = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const dto = AssignStudentDTO.fromRequest(req.body);
            const classEnrollment = await this.classService.assignStudent(dto)

            res.status(201).json({ error: undefined, data: parseForResponse(classEnrollment), success: true });
        } catch (error) {
            next(error);
        }

    }
}