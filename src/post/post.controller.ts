import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res, UseGuards } from "@nestjs/common";
import { PostService } from "./post.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { Response } from "express";
import { AuthGuard } from "src/Guards/authGuard";
import { UpdatePostDto } from "./dto/update-post.dto";


@Controller('posts')
export class PostController {
  constructor(
    private postService: PostService
  ) {}

  @UseGuards(AuthGuard)
  @Post('post')
  async createPost(
    @Body() 
    CreatePostDto: CreatePostDto,
    id: number,
    subcategoryId: number,
    @Res() res: Response
    ) {
      await this.postService.createPost(CreatePostDto, id, subcategoryId);
      return res.status(HttpStatus.CREATED).json({ message: 'Post has created succsessfully' })
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async updatePost(
    @Param('id')
    postId: number,
    @Body()
    UpdatePostDto: UpdatePostDto,
    id: number,
    @Res() res: Response
  ) {
    await this.postService.updatePost(UpdatePostDto, postId, id)
    res.status(HttpStatus.OK).json({ message: 'Post has been updated succsessfully' })
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deletePost(
    @Param('id')
    postId: number,
    @Body()
    id: number,
    @Res() res: Response
  ) {
    await this.postService.deletePost(id, postId)
    res.status(HttpStatus.OK).json('Post has been deleted succsessfully')
  }

  @Get('/')
  async getAll(
    @Res() res: Response
  ) {
    return res.status(HttpStatus.OK).json(this.postService.getAllPosts)
  }

  @Get('')
  async getSubcategoryPosts(
    @Body() subcategoryId: number,
    @Res() res: Response
  ) {
    res.status(HttpStatus.OK).json(await this.postService.getSubcategoryPosts(subcategoryId))
  }

  @Get('')
  @UseGuards(AuthGuard)
  async getUserPosts(
    @Body() 
    id: number,
    @Res() res: Response
  ) {
    res.status(HttpStatus.OK).json(await this.postService.getUserPosts(id));
  }
}
