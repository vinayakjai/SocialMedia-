import { createAction, createReducer } from "@reduxjs/toolkit"
const initialState = {
   isAuthenticated: false,
}
const loginRequest = createAction('loginRequest');
const loginSuccess = createAction('loginSuccess');
const loginFailure = createAction('loginFailure');



const registerRequest = createAction('registerRequest');
const registerSuccess = createAction('registerSuccess');
const registerFailure = createAction('registerFailure');



const loadUserRequest = createAction('loadUserRequest');
const loadUserSuccess = createAction('loadUserSuccess');
const loadUserFailure = createAction('loadUserFailure');



const postoffollowingRequest = createAction('postoffollowingRequest');
const postoffollowingSuccess = createAction('postoffollowingSuccess');
const postoffollowingFailure = createAction('postoffollowingFailure')
const clearErrors = createAction('clearErrors');



const allUsersRequest = createAction('allUsersRequest');
const allUsersSuccess = createAction('allUsersSuccess');
const allUsersFailure = createAction('allUsersFailure');





const logoutUserRequest = createAction('logoutUserRequest');
const logoutUserSuccess = createAction('logoutUserSuccess');
const logoutUserFailure = createAction('logoutUserFailure');




const updateProfileRequest = createAction('updateProfileRequest');
const updateProfileSuccess = createAction('updateProfileSuccess');
const updateProfileFailure = createAction('updateProfileFailure');
const clearMessage = createAction('clearMessage');





const updatePasswordRequest = createAction('updatePasswordRequest');
const updatePasswordSuccess = createAction('updatePasswordSuccess');
const updatePasswordFailure = createAction('updatePasswordFailure');

export const userReducer = createReducer(initialState, (builder) => {
   builder.addCase(loginRequest, (state) => {
      state.loading = true;
   }).addCase(loginSuccess, (state, action) => {
      state.loading = false;

      state.user = action.payload;
      state.isAuthenticated = true
   }).addCase(loginFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
   }).addCase(registerRequest, (state) => {
      state.loading = true;
   }).addCase(registerSuccess, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
   }).addCase(registerFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
   }).addCase(loadUserRequest, (state) => {
      state.loading = true;
   }).addCase(loadUserSuccess, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true
   }).addCase(loadUserFailure, (state) => {
      state.loading = false;

   })
      .addCase(logoutUserRequest, (state, action) => {
         state.loading = true;

      }).addCase(logoutUserSuccess, (state, action) => {
         state.loading = false;
         state.user = null;
         state.isAuthenticated = false;
      }).addCase(logoutUserFailure, (state, action) => {
         state.loading = false;
         state.error = action.payload;
         state.isAuthenticated = true;
      }).addCase(clearErrors, (state) => {
         state.error = null;
      })

})

export const postoffollowingReducers = createReducer({}, (builder) => {
   builder.addCase(postoffollowingRequest, (state) => {
      state.loading = true;
   }).addCase(postoffollowingSuccess, (state, action) => {
      state.loading = false;
      state.posts = action.payload;
   }).addCase(postoffollowingFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
   }).addCase(clearErrors, (state) => {
      state.error = null;
   })
})

export const getAllUsersReducers = createReducer(initialState, (builder) => {
   builder.addCase(allUsersRequest, (state, action) => {
      state.loading = true;
   }).addCase(allUsersSuccess, (state, action) => {
      state.loading = false;
      state.users = action.payload;

   }).addCase(allUsersFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
   }).addCase(clearErrors, (state) => {
      state.error = null;
   })
})




export const updateProfileReducer = createReducer(initialState, (builder) => {
   builder.addCase(updateProfileRequest, (state, action) => {
      state.loading = true;
   }).addCase(updateProfileSuccess, (state, action) => {
      state.loading = false;
      state.message = action.payload;

   }).addCase(updateProfileFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
   }).addCase(clearErrors, (state) => {
      state.error = null;
   }).addCase(clearMessage, (state) => {
      state.message = null;
   })
})




export const updatePasswordReducer = createReducer(initialState, (builder) => {
   builder.addCase(updatePasswordRequest, (state, action) => {
      state.loading = true;
   }).addCase(updatePasswordSuccess, (state, action) => {
      state.loading = false;
      state.message = action.payload;

   }).addCase(updatePasswordFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
   }).addCase(clearErrors, (state) => {
      state.error = null;
   }).addCase(clearMessage, (state) => {
      state.message = null;
   })
})