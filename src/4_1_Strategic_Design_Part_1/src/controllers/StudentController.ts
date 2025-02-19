import { Request, Response } from 'express';
import { Errors, parseForResponse } from '../index';
import { CreateStudentDTO } from "../dto/student";
import { GetByIdDTO } from "../dto";
import { StudentService } from "../services";

export class StudentController {
    private studentService: StudentService;
    constructor (studentService: StudentService) {
        this.studentService = studentService;
    }

    public create = async (req: Request, res: Response)=> {
        try {
            const dto = CreateStudentDTO.fromRequest(req.body);
            const student = await this.studentService.create(dto)

            res.status(201).json({ error: undefined, data: parseForResponse(student), success: true });
        } catch (error) {
            res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
        }
    }

    public getAll = async (req: Request, res: Response) =>{
        try {
            const students = this.studentService.getAll();
            res.status(200).json({ error: undefined, data: parseForResponse(students), success: true });
        } catch (error) {
            res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
        }
    }

    public getById = async (req: Request, res: Response) => {
        try {
            const dto = GetByIdDTO.fromRequest(req.body);
            const student = this.studentService.getById(dto);

            res.status(200).json({ error: undefined, data: parseForResponse(student), success: true });
        } catch (error) {
            res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
        }
    }

    public getAssignments = async (req: Request, res: Response) => {
        try {
            const dto = GetByIdDTO.fromRequest(req.params);
            const studentAssignments = this.studentService.getAssignments(dto);
            res.status(200).json({ error: undefined, data: parseForResponse(studentAssignments), success: true });
        } catch (error) {
            res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
        }
    }

    public getGrades = async (req: Request, res: Response) => {
        try {
            const dto = GetByIdDTO.fromRequest(req.params);
            const studentAssignments = this.studentService.getGrades(dto);

            res.status(200).json({ error: undefined, data: parseForResponse(studentAssignments), success: true });
        } catch (error) {
            res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
        }
    }
}