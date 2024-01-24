import { PostInterface } from "src/interfaces/Interfaces";

export class CreatePostDto implements PostInterface{
  readonly postText: string;
  readonly subcategoryId: number;
} 
