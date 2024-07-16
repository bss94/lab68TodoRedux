import {ApiTodo, ApiTodos, Todo} from '../../types';
import {AsyncThunk, createAsyncThunk, createSlice, Draft, PayloadAction} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {RootState} from '../../app/store';


interface ToDosState {
  value: Todo[];
  isSending: boolean;
  isDeleting: boolean;
  isLoading: boolean;
  error: boolean;
}

const initialState: ToDosState = {
  value: [],
  isSending: false,
  isDeleting: false,
  isLoading: false,
  error: false
};

export const fetchToDos: AsyncThunk<Todo[], void, { state: RootState }> = createAsyncThunk<Todo[], void, {
  state: RootState
}>('toDos/fetch', async () => {
  const {data: toDos} = await axiosApi.get<ApiTodos | null>('/todos.json');
  if (!toDos) {
    return [];
  } else {
    return Object.keys(toDos).map((id) => ({
      ...toDos[id],
      id,
    }));
  }
});
export const fetchAddToDo: AsyncThunk<void, void, { state: RootState }> = createAsyncThunk<void, void, {
  state: RootState
}>(
  'toDo/add', async (newTodo: ApiTodo) => {
    await axiosApi.post('/todos.json', newTodo);
  });
export const fetchDeleteToDo: AsyncThunk<void, void, { state: RootState }> = createAsyncThunk<void, void, {
  state: RootState
}>(
  'toDo/delete', async (id: string) => {
    await axiosApi.delete(`/todos/${id}.json`);
  });
export const fetchCompleteToDo: AsyncThunk<void, void, { state: RootState }> = createAsyncThunk<void, void, {
  state: RootState
}>(
  'toDo/complete', async (data: { id: string, putData: ApiTodo }) => {
    await axiosApi.put(`/todos/${data.id}.json`, data.putData);
  });

export const toDoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    send: (state: ToDosState) => {
      state.isSending = true;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchToDos.pending, (state: Draft<ToDosState>) => {
      state.error = false;
      state.isLoading = true;
    });
    builder.addCase(fetchToDos.fulfilled, (state: Draft<ToDosState>, action: PayloadAction<Todo[]>) => {
      state.isLoading = false;
      state.value = action.payload;
    });
    builder.addCase(fetchToDos.rejected, (state: Draft<ToDosState>) => {
      state.error = true;
      state.isLoading = false;
    });
    builder.addCase(fetchAddToDo.pending, (state: Draft<ToDosState>) => {
      state.error = false;
      state.isSending = true;
    });
    builder.addCase(fetchAddToDo.fulfilled, (state: Draft<ToDosState>) => {
      state.isSending = false;
    });
    builder.addCase(fetchAddToDo.rejected, (state: Draft<ToDosState>) => {
      state.error = true;
      state.isSending = false;
    });
    builder.addCase(fetchDeleteToDo.pending, (state: Draft<ToDosState>) => {
      state.error = false;
      state.isDeleting = true;
    });
    builder.addCase(fetchDeleteToDo.fulfilled, (state: Draft<ToDosState>) => {
      state.isDeleting = false;
    });
    builder.addCase(fetchDeleteToDo.rejected, (state: Draft<ToDosState>) => {
      state.error = true;
      state.isDeleting = false;
    });
    builder.addCase(fetchCompleteToDo.pending, (state: Draft<ToDosState>) => {
      state.error = false;
      state.isLoading = true;
    });
    builder.addCase(fetchCompleteToDo.fulfilled, (state: Draft<ToDosState>) => {
      state.isLoading = false;
    });
    builder.addCase(fetchCompleteToDo.rejected, (state: Draft<ToDosState>) => {
      state.error = true;
      state.isLoading = false;
    });

  },
});

export const toDosReducer = toDoSlice.reducer;
export const {
  send
} = toDoSlice.actions;
