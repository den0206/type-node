import {Router, Request, Response, NextFunction} from 'express';
import Controller from '../../utils/interfaces/controller.interface';
import HttpException from '../../utils/exceptions/http.exception';
import validateMiddleware from '../../middleware/validation.middleware';
import validation from './post.validation';
import PostService from './post_service';

class PostController implements Controller {
  public path = '/posts';
  public router = Router();
  private service = new PostService();

  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    this.router.post(
      `${this.path}`,
      validateMiddleware(validation.create),
      this.create
    );
  }

  private create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const {title, body} = req.body;

      const post = await this.service.createPost(title, body);
      return res.status(200).json({status: true, post});
    } catch (e) {
      next(new HttpException(e.statusCode | 400, e.message));
    }
  };
}

export default PostController;
