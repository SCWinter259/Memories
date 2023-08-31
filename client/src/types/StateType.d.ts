import { PostType } from "./PostType";

// this type is just for documentation and I have no intention to apply it

export type StateType = {
  auth: { authData: null | string };
  posts: {
    post: PostType;
    // currentPage: number;
    isLoading: boolean;
    // numberOfPages: number;
    posts: PostType[];
  };
};
