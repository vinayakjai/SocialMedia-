import {createAction, createReducer} from "@reduxjs/toolkit";

const initialState={

}
 
const likeRequest=createAction('likeRequest');
const likeSuccess=createAction('likeSuccess');
const likeFailure=createAction('likeFailure');


const clearErrors=createAction('clearErrors');
const clearMessage=createAction('clearMessage');

const addCommentRequest=createAction('addCommentRequest');
const addCommentSuccess=createAction('addCommentSuccess');
const addCommentFailure=createAction('addCommentFailure');


const deleteCommentRequest=createAction('deleteCommentRequest');
const deleteCommentSuccess=createAction('deleteCommentSuccess');
const deleteCommentFailure=createAction('deleteCommentFailure');


export const likeReducer=createReducer(initialState,(builder)=>{
    builder.addCase(likeRequest,(state,action)=>{
      state.loading=true;
    }).addCase(likeSuccess,(state,action)=>{
        state.loading=false;
        state.message=action.payload;
    }).addCase(likeFailure,(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    }).addCase(clearErrors,(state)=>{
         state.error=null;
    }).addCase(clearMessage,(state)=>{
        state.message=null;
   }).addCase(addCommentRequest,(state)=>{
        state.loading=true;
    }).addCase(addCommentSuccess,(state,action)=>{
        state.loading=false;
        state.message=action.payload;
    }).addCase(addCommentFailure,(state,action)=>{
        state.loading=false;
         state.error=action.payload;
    }).addCase(deleteCommentRequest,(state)=>{
        state.loading=true;
    }).addCase(deleteCommentSuccess,(state,action)=>{
        state.loading=false;
        state.message=action.payload;
    }).addCase(deleteCommentFailure,(state,action)=>{
        state.loading=false;
         state.error=action.payload;
    })
})




