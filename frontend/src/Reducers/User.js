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
      state.isAuthenticated = true
   }).addCase(loadUserFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
   }).addCase(clearErrors, (state) => {
      state.error=null;
   })

})

export const postoffollowingReducers = createReducer({}, (builder) => {
   builder.addCase(postoffollowingRequest, (state) => {
      state.loading = true;
   }).addCase(postoffollowingSuccess, (state, action) => {
      state.loading = false;
      state.post = action.payload;
   }).addCase(postoffollowingFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
   }).addCase(clearErrors, (state) => {
      state.error=null;
   })
})