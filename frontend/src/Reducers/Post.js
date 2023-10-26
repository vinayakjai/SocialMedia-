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



const postRequest=createAction('postRequest');
const postSuccess=createAction('postSuccess');
const postFailure=createAction('postFailure');




const newpostRequest=createAction('newpostRequest');
const newpostSuccess=createAction('newpostSuccess');
const newpostFailure=createAction('newpostFailure');




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



export const postReducer=createReducer(initialState,(builder)=>{
    builder.addCase(postRequest,(state,action)=>{
      state.loading=true;
    }).addCase(postSuccess,(state,action)=>{
        state.loading=false;
        state.posts=action.payload;
    }).addCase(postFailure,(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    }).addCase(clearErrors,(state)=>{
         state.error=null;
    })
})



export const newpostReducer=createReducer(initialState,(builder)=>{
    builder.addCase(newpostRequest,(state,action)=>{
      state.loading=true;
    }).addCase(newpostSuccess,(state,action)=>{
        state.loading=false;
        state.message=action.payload;
    }).addCase(newpostFailure,(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    }).addCase(clearMessage,(state)=>{
         state.message=null;
    }).addCase(clearErrors,(state)=>{
        state.error=null;
   })
})




