import { createSlice } from "@reduxjs/toolkit";
const intitalState = {
  id:"",
  avatar: "",
  name: "",
  email: "",
  isAdmin: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: intitalState,
  reducers: {
    getUserInform: (state, action) => {
      state.name = action.payload.name;
      state.avatar = action.payload.avatar || "";
      state.email = action.payload.email;
      state.id = action.payload.id
    },
    destoryUser: (state, action) => {
      state.avatar = "";
      state.name = "";
      state.email = "";
    },
    // adminLogin: (state, action) => {
    //   state.isAdmin = action.payload;
    // },
    // updateClients: (state, action) => {
    //   state.clients = state.clients.filter(
    //     (logo, index) => action.payload !== logo._id
    //   );
    // },
  },
});

export const { getUserInform, destoryUser } = userSlice.actions;
export default userSlice.reducer;
