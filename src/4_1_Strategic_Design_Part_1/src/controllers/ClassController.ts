import { Request, Response } from 'express';
import { Errors, parseForResponse } from '../index';
import { AssignStudentDTO, CreateClassDTO } from "../dtos/class";
import { GetByIdDTO } from "../dtos";
import { ClassService } from "../services";

export class ClassController {
    private classService: ClassService;
    constructor (classService: ClassService) {
        this.classService = classService;
    }

    public create = async (req: Request, res: Response) => {
        try {
            const dto = CreateClassDTO.fromRequest(req.body);

            const newClass = await this.classService.create(dto)

            res.status(201).json({ error: undefined, data: parseForResponse(newClass), success: true });
        } catch (error) {
            res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
        }
    }

    public getAssignments = async (req: Request, res: Response) => {
        try {
            const dto = GetByIdDTO.fromRequest(req.body);
            const assignments = await this.classService.getAssignments(dto)

            res.status(200).json({ error: undefined, data: parseForResponse(assignments), success: true });
        } catch (error) {
            res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
        }
    }

    public assignStudent = async (req: Request, res: Response) => {
        try {
            const dto = AssignStudentDTO.fromRequest(req.body);
            const classEnrollment = await this.classService.assignStudent(dto)

            res.status(201).json({ error: undefined, data: parseForResponse(classEnrollment), success: true });
        } catch (error) {
            res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
        }

    }
}