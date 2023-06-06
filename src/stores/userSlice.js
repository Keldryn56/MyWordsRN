import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
	name: "user",
	initialState: {
		data: null,
        theme: "auto" 
	},
	reducers: {
		setUserProfile: (state, action) => {
			state.data = {
				uid: action.payload.uid,
				displayName: action.payload.displayName,
				email: action.payload.email,
			};
		},
		clearUserProfile: (state) => {
			state.data = null;
		},
        setUserTheme: (state, action) => {
            state.theme = action.payload 
        }
	},
});

export const { setUserProfile, clearUserProfile, setUserTheme } = userSlice.actions;

export default userSlice.reducer;
