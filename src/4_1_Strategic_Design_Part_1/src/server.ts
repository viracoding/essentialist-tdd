import express, { Express } from 'express';
import { AssignmentController, ClassController, StudentController } from "./controllers";
const cors = require('cors');

export class Server {
    private app: Express;
    private server: any;
    constructor(private studentController :StudentController,
                private classController: ClassController,
                private assignmentController: AssignmentController) {
        this.app = express();
        this.app.use(cors())
        this.app.use(express.json())
    }

    public start(port: number) {
        this.server = this.app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
}