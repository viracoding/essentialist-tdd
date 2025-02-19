import { Request, Response } from 'express';
import { Errors, parseForResponse } from '../index';
import { CreateAssignmentDTO, AssignStudentDTO, SubmitAssignmentDTO, GradeAssignmentDTO } from '../dto/assignment'
import { GetByIdDTO } from "../dto";
import { AssignmentService } from "../services/AssignmentService";


export class AssignmentController {
    private assignmentService: AssignmentService;
    constructor () {
        this.assignmentService = new AssignmentService();
    }

    public create = async (req: Request, res: Response) => {
        try {
            const createAssignmentDTO = CreateAssignmentDTO.fromRequest(req.body)
            const assignment = await this.assignmentService.create(createAssignmentDTO)

            res.status(201).json({ error: undefined, data: parseForResponse(assignment), success: true });
        } catch (error) {
            res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
        }
    }

    public assignStudent = async (req: Request, res: Response) => {
        try {
            const assignStudentDTO = AssignStudentDTO.fromRequest(req.body)

            const studentAssignment = await this.assignmentService.assignStudent(assignStudentDTO)

            res.status(201).json({ error: undefined, data: parseForResponse(studentAssignment), success: true });
        } catch (error) {
            res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
        }

    }

    public submit = async (req: Request, res: Response) => {
        try {
            const submitAssignmentDTO = SubmitAssignmentDTO.fromRequest(req.body);
            const studentAssignmentUpdated = this.assignmentService.submit(submitAssignmentDTO);

            res.status(200).json({ error: undefined, data: parseForResponse(studentAssignmentUpdated), success: true });
        } catch (error) {
            res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
        }
    }

    public grade = async (req: Request, res: Response) => {
        try {
            const dto = GradeAssignmentDTO.fromRequest(req.body);
            const studentAssignmentUpdated = this.assignmentService.grade(dto)

            res.status(200).json({ error: undefined, data: parseForResponse(studentAssignmentUpdated), success: true });
        } catch (error) {
            res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
        }
    }

    public getById = async (req: Request, res: Response) => {
        try {
            const dto = GetByIdDTO.fromRequest(req.params);
            const assignment = this.assignmentService.getById(dto)

            res.status(200).json({ error: undefined, data: parseForResponse(assignment), success: true });
        } catch (error) {
            res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
        }
    }
}