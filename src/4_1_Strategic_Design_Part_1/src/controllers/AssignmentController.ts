import express, { Request, Response, NextFunction } from 'express';
import { parseForResponse } from '../helper';
import { CreateAssignmentDTO, AssignStudentDTO, SubmitAssignmentDTO, GradeAssignmentDTO } from '../dtos/assignment'
import { GetByIdDTO } from "../dtos";
import { AssignmentService } from "../services";
import { ErrorExceptionHandler } from "../errorExceptionHandler";


export class AssignmentController {
    private router: express.Router;

    constructor (
        private assignmentService: AssignmentService,
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
        // POST assignment created
        this.router.post('/assignments', this.create);
        // GET assignment by id
        this.router.get('/assignments/:id', this.getById);
        // POST student assigned to assignment
        this.router.post('/student-assignments', this.assignStudent);
        // POST student submitted assignment
        this.router.post('/student-assignments/submit', this.submit);
        // POST student assignment graded
        this.router.post('/student-assignments/grade', this.grade);
    }

    private setupErrorHandler() {
        this.router.use(this.errorHandler.handle);
    }

    public create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const createAssignmentDTO = CreateAssignmentDTO.fromRequest(req.body)
            const assignment = await this.assignmentService.create(createAssignmentDTO)

            res.status(201).json({ error: undefined, data: parseForResponse(assignment), success: true });
        } catch (error) {
            next(error);
        }
    }

    public assignStudent = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const assignStudentDTO = AssignStudentDTO.fromRequest(req.body)

            const studentAssignment = await this.assignmentService.assignStudent(assignStudentDTO)

            res.status(201).json({ error: undefined, data: parseForResponse(studentAssignment), success: true });
        } catch (error) {
            next(error);
        }

    }

    public submit = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const submitAssignmentDTO = SubmitAssignmentDTO.fromRequest(req.body);
            const studentAssignmentUpdated = this.assignmentService.submit(submitAssignmentDTO);

            res.status(200).json({ error: undefined, data: parseForResponse(studentAssignmentUpdated), success: true });
        } catch (error) {
            next(error);
        }
    }

    public grade = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const dto = GradeAssignmentDTO.fromRequest(req.body);
            const studentAssignmentUpdated = this.assignmentService.grade(dto)

            res.status(200).json({ error: undefined, data: parseForResponse(studentAssignmentUpdated), success: true });
        } catch (error) {
            next(error);
        }
    }

    public getById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const dto = GetByIdDTO.fromRequest(req.params);
            const assignment = this.assignmentService.getById(dto)

            res.status(200).json({ error: undefined, data: parseForResponse(assignment), success: true });
        } catch (error) {
            next(error);
        }
    }
}