import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from 'src/user/entities/user.entity';
import { Subcategory } from 'src/subcategory/entities/subcategory.entity';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRep: Repository<Post>,
    @InjectRepository(User)
    private userRep: Repository<User>,
    @InjectRepository(Subcategory)
    private subcategoryRep: Repository<Subcategory>,
  ) {}

  async createPost(
    CreatePostDto: CreatePostDto,
    id: number
  ): Promise<any> {
    const { postText, subcategoryId } = CreatePostDto;
    const user = await this.userRep.findOneBy({ id: id });
    const subcategory = await this.subcategoryRep.findOneBy({
      id: subcategoryId,
    });
    if (!subcategory) {
      throw new HttpException('Subcategory not found', HttpStatus.NOT_FOUND);
    }
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const post = this.postRep.create({
      postText: postText,
      user: user,
      subcategory: subcategory,
    });
    await this.postRep.save(post);
  }

  async updatePost(UpdatePostDto: UpdatePostDto, params: { id: number, userId: number }) {
    const { postText } = UpdatePostDto;
    const { id, userId } = params
    const post = await this.postRep.findOneBy({
      id: id,
      userId: userId,
    });
    if (!post) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
    await this.postRep.update(id, { postText: postText });
  }

  async deletePost(params: { id: number, userId: number },) {
    const { id, userId } = params
    const post = await this.postRep.findOneBy({
      id: id,
      userId: userId,
    });
    if (!post) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
    await this.postRep.remove(post);
  }

  async getAll(): Promise<Post[]> {    
    return this.postRep.find();
  }

  async getUserPosts(id: number): Promise<Post[]> {
    const user = this.userRep.findOneBy({ id: id });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return this.postRep.findBy({ userId: id });
  }
}
