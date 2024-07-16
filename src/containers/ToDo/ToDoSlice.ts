import {ApiTodo, ApiTodos, Todo} from '../../types';
import {AsyncThunk, createAsyncThunk, createSlice, Draft, PayloadAction} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {RootState} from '../../app/store';


interface ToDosState {
  value:Todo[];
  isLoading:boolean;
  error:boolean;
}
const initialState:ToDosState={
  value:[],
  isLoading:false,
  error:false
}

export const fetchToDos:AsyncThunk<Todo[], void, {state:RootState}> = createAsyncThunk<Todo[], void, {state:RootState}>('toDos/fetch', async ()=>{
  const {data :toDos} = await axiosApi.get<ApiTodos | null>('/todos.json');
  if(!toDos){
    return [];
  }else {
    return Object.keys(toDos).map((id) => ({
      ...toDos[id],
      id,
    }));
  }
});
export const fetchAddToDo:AsyncThunk<void, void, {state:RootState}> = createAsyncThunk<void, void, {state:RootState}>(
  'toDo/add',async (newTodo:ApiTodo)=>{
  await axiosApi.post('/todos.json',newTodo);
});
export const fetchDeleteToDo:AsyncThunk<void, void, {state:RootState}> = createAsyncThunk<void, void, {state:RootState}>(
  'toDo/delete',async (id:string)=>{
    await axiosApi.delete(`/todos/${id}.json`);
  });

export const toDoSlice = createSlice({
  name:'todos',
  initialState,
  reducers: {
    new: () => {

    }
  },
  extraReducers:(builder)=>{
    builder.addCase(fetchToDos.pending,(state:Draft<ToDosState>)=>{
      state.error = false;
      state.isLoading = true
    });
    builder.addCase(fetchToDos.fulfilled,(state:Draft<ToDosState>,action:PayloadAction<Todo[]>)=>{
      state.isLoading = false
      state.value=action.payload;
    });
    builder.addCase(fetchToDos.rejected,(state:Draft<ToDosState>)=>{
      state.error = true;
      state.isLoading = false
    });
    builder.addCase(fetchAddToDo.pending,(state:Draft<ToDosState>)=>{
      state.error = false;
      state.isLoading = true
    });
    builder.addCase(fetchAddToDo.fulfilled,(state:Draft<ToDosState>)=>{
      state.isLoading = false
    });
    builder.addCase(fetchAddToDo.rejected,(state:Draft<ToDosState>)=>{
      state.error = true;
      state.isLoading = false
    });
    builder.addCase(fetchDeleteToDo.pending,(state:Draft<ToDosState>)=>{
      state.error = false;
      state.isLoading = true
    });
    builder.addCase(fetchDeleteToDo.fulfilled,(state:Draft<ToDosState>)=>{
      state.isLoading = false
    });
    builder.addCase(fetchDeleteToDo.rejected,(state:Draft<ToDosState>)=>{
      state.error = true;
      state.isLoading = false
    });

  },
});

export const toDosReducer = toDoSlice.reducer
