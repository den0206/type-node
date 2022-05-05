import compression from 'compression';
import cors from 'cors';
import express, {Application} from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import Controller from './utils/interfaces/controller.interface';
import errorMiddleware from './middleware/error.middleware';

class App {
  public app: Application;
  public port: number;

  constructor(controllers: Controller[], port: number) {
    this.app = express();
    this.port = port;

    // init methods
    this.initializeDB();
    this.initialiseMiddlaware();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }

  private initialiseMiddlaware(): void {
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended: false}));
    this.app.use(compression());
  }

  private initializeControllers(controllers: Controller[]): void {
    controllers.forEach((ctx: Controller) => {
      this.app.use('/api', ctx.router);
    });
  }

  private initializeErrorHandling(): void {
    this.app.use(errorMiddleware);
  }

  private initializeDB(): void {
    const {MONGO_USER, MONGO_PATH, MONGO_PASSWORD} = process.env;
    const dbUrl = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.wybhe.mongodb.net/${MONGO_PATH}?retryWrites=true&w=majority`;
    console.log(dbUrl);
    mongoose.connect(dbUrl);
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`APP Listening ${this.port}`);
    });
  }
}

export default App;
