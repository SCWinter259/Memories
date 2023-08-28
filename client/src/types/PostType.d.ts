export type PostType = {
    _id: string;
  title: string;
  message: string;
  name: string;
  creator: string;
  tags: [string];
  selectedFile: string;
  comments: string[];
  likes: string[];
  createdAt: Date;
  __v: number;
}