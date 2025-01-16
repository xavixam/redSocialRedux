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

export const likePost = createAsyncThunk(
  "posts/likePost",
  async (postId, thunkAPI) => {
    try {
      return await postsService.likePost(postId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const unlikePost = createAsyncThunk(
  "posts/unlikePost",
  async (postId, thunkAPI) => {
    try {
      return await postsService.unlikePost(postId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

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
    })
      .addCase(likePost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedPost = action.payload;
        const index = state.posts.findIndex((post) => post.id === updatedPost.id);
        if (index !== -1) {
          state.posts[index] = updatedPost;
        }
      })
      .addCase(likePost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(unlikePost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(unlikePost.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedPost = action.payload;
        const index = state.posts.findIndex((post) => post.id === updatedPost.id);
        if (index !== -1) {
          state.posts[index] = updatedPost;
        }
      })
      .addCase(unlikePost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
  }
})


export const createComment = createAsyncThunk("posts/createComment", async (comment) => {
  try {
    return await postsService.createComment(comment);
  } catch (error) {
    console.error(error);
  }
});

export const { reset } = postsSlice.actions
export default postsSlice.reducer
