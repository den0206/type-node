import PostModel from './post.model';
import Post from './post.interface';

class PostService {
  public async createPost(title: string, body: string): Promise<Post> {
    try {
      const post = await PostModel.create({title, body});
      return post;
    } catch (e) {
      throw new Error('unbale to Post');
    }
  }
}

export default PostService;
