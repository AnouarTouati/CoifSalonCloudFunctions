import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

 export const helloWorld = functions.https.onRequest((request, response) => {
  admin.firestore().collection('Shops').doc("fff").collection("fefwe").doc("fewfew")
  .set( {timeInMillis :admin.firestore.Timestamp.now().toMillis()},{merge:true})
  .then(writeResult=>{
        console.log("setting the time for pending was successful") 
        response.send("Succesffully written")
  }) .catch(error=>{
    console.log(error) 
    response.send("could not write"+error)
  })
 });

 export const clientPendingTimeStamping=functions.firestore.document('/Shops/{ShopOwnerUid}/ClientsPending/{ClientUid}')
 .onCreate((snapshot,context)=>{
  
  return admin.firestore().collection('Shops').doc(context.params.ShopOwnerUid).collection('ClientsPending').doc(context.params.ClientUid)
 
  .set( {timeInMillis :admin.firestore.Timestamp.now().toMillis()},{merge:true})
  .then(writeResult=>{
        console.log("setting the time for pending was successful")
  })
  .catch(error=>{
    console.log(error) 
  })

 });

 export const clientReviewTimeStamping=functions.firestore.document('/Shops/{ShopOwnerUid}/Reviews/{ClientUid}')
 .onCreate((snapshot,context)=>{
  console.log(snapshot.data())
    return admin.firestore().collection('Shops').doc(context.params.ShopOwnerUid).collection('Reviews').doc(context.params.ClientUid)
   
    .set({ReviewerCommentDateInMillis :admin.firestore.Timestamp.now().toMillis()},{merge:true})
    .then(writeResult=>{
      console.log("setting the time for review was successful")
    })
    .catch(error=>{
      console.log(error) 
    })

 });