import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postsService from "./postsService";

const initialState = {
  posts: [],
  isLoading: false,
  userPost: [],
  post: {}
};

export const getAll = createAsyncThunk("posts/getAll", async () => {
  try {
    return await postsService.getAll();
  } catch (error) {
    console.error(error);
  }
});

export const getById = createAsyncThunk("posts/getById", async (id) => {
  try {
    return await postsService.getById(id);
  } catch (error) {
    console.error(error);
  }
});

export const getPostByName = createAsyncThunk("posts/getByName", async (title) => {
  try {
    return await postsService.getPostByName(title);
  } catch (error) {
    console.error(error);
  }
}
);

export const getUserPosts = createAsyncThunk("posts/getUserPosts", async (id) => {
  try {
    return await postsService.getUserPosts(id);
  } catch (error) {
    console.error(error);
  }
});

export const createPost = createAsyncThunk("posts/createPost", async (post) => {
  try {
    return await postsService.createPost(post);
  } catch (error) {
    console.error(error);
  }
});

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAll.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getAll.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getById.fulfilled, (state, action) => {
      state.post = action.payload;
    });
    builder.addCase(getPostByName.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.isSuccess = true;
      state.message = action.payload.message;
      state.posts = [...state.posts, action.payload.post]
    });
    builder.addCase(createPost.rejected, (state, action) => {
      state.isError = true;
      state.message = action.payload;
    });
    builder.addCase(getUserPosts.fulfilled, (state, action) => {
      state.isError = false;
      state.userPost = action.payload.posts;
    });
  },
});

export const createComment = createAsyncThunk("posts/createComment", async (comment) => {
  try {
    return await postsService.createComment(comment);
  } catch (error) {
    console.error(error);
  }
});

export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
  try {
    return await postsService.deletePost(id);
  } catch (error) {
    console.error(error);
  }
});

export const { reset } = postsSlice.actions
export default postsSlice.reducer