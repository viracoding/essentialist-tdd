export { StudentController } from './StudentController';
export { ClassController } from './ClassController';
export { AssignmentController } from './AssignmentController';

export class InvalidRequestBodyException {
    constructor(requiredKeys: string[]) {}
    // return res.status(400).json({ error: Errors.ValidationError, data: undefined, success: false });
}