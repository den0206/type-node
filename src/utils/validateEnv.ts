import {cleanEnv, str, port} from 'envalid';

function validEnv(): void {
  cleanEnv(process.env, {
    NODE_ENV: str({choices: ['develop', 'production']}),
    MONGO_PATH: str(),
    MONGO_USER: str(),
    MONGO_PASSWORD: str(),
    PORT: port({default: 3000}),
  });
}

export default validEnv;
