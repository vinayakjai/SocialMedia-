import { createAction, createReducer } from "@reduxjs/toolkit"
const initialState = {}
const loginRequest=createAction('loginRequest');
const loginSuccess=createAction('loginSuccess');
const loginFailure=createAction('loginFailure');
const registerRequest=createAction('registerRequest');
const registerSuccess=createAction('registerSuccess');
const registerFailure=createAction('registerFailure');
const loadRequest=createAction('loadRequest');
const loadSuccess=createAction('loadSuccess');
const loadFailure=createAction('loadFailure');

export const userReducer = createReducer(initialState,(builder)=> {
   builder.addCase(loginRequest,(state)=>{
    state.loading=true;
   }).addCase(loginSuccess,(state,action)=>{
    state.loading=false;
    state.user=action.payload;
   }).addCase(loginFailure,(state,action)=>{
    state.loading=false;
    state.error=action.payload;
   }).addCase(registerRequest,(state)=>{
    state.loading=true;
   }).addCase(registerSuccess,(state,action)=>{
    state.loading=false;
    state.user=action.payload;
   }).addCase(registerFailure,(state,action)=>{
    state.loading=false;
    state.error=action.payload;
   }).addCase(loadRequest,(state)=>{
    state.loading=true;
   }).addCase(loadSuccess,(state,action)=>{
    state.loading=true;
   }).addCase(loadFailure,(state,action)=>{
    state.loading=false;
    state.error=action.payload;
   })
  
})