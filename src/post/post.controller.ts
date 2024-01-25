import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Response } from 'express';
import { AuthGuard } from 'src/Guards/authGuard';
import { UpdatePostDto } from './dto/update-post.dto';
import { ValidationPipe } from 'src/pipe/validation.pipe';
import {
  createPostSchema,
  updatePostSchema,
} from 'src/validationSchemas/post.schema';

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe(createPostSchema))
  @Post('')
  async createPost(
    @Param('userId')
    id: number,
    @Body()
    CreatePostDto: CreatePostDto,
    @Res() res: Response,
  ) {
    await this.postService.createPost(CreatePostDto, id);
    return res
      .status(HttpStatus.CREATED)
      .json({ message: 'Post has created succsessfully' });
  }

  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe(updatePostSchema))
  @Patch(':id')
  async updatePost(
    @Param()
    params: { id: number; userId: number },
    @Body()
    UpdatePostDto: UpdatePostDto,
    @Res() res: Response,
  ) {
    await this.postService.updatePost(UpdatePostDto, params);
    res
      .status(HttpStatus.OK)
      .json({ message: 'Post has been updated succsessfully' });
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deletePost(
    @Param()
    params: { id: number; userId: number },
    @Res() res: Response,
  ) {
    await this.postService.deletePost(params);
    res.status(HttpStatus.OK).json('Post has been deleted succsessfully');
  }

  @Get('')
  async getAll(@Res() res: Response) {
    return res.status(HttpStatus.OK).json(await this.postService.getAll());
  }

  @UseGuards(AuthGuard)
  @Get('users/:id/posts')
  async getUserPosts(
    @Param('userId')
    id: number,
    @Res() res: Response,
  ) {
    res.status(HttpStatus.OK).json(await this.postService.getUserPosts(id));
  }
}
