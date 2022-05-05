import dotenv from 'dotenv';
import App from './app';
import validEnv from './utils/validateEnv';
import PostController from './resources/post/post_controller';

dotenv.config();
validEnv();

const app = new App([new PostController()], Number(process.env.PORT));

app.listen();
