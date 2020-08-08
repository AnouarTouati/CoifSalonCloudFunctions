import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
//const requestModule = require('request')

admin.initializeApp()



/*this works it outputs EAI_AGAIN  syscall getaddinfo
EAI_AGAIN is a DNS lookup timed out erro
meaning we are on free tier firebase we should upgrade to Blaze
export const currenciesApi=functions.https.onRequest((request,response)=>{
  const url="https://openexchangerates.org/api/latest.json?app_id=f43b3eae232d42a7b86dacab4395ef18"
 requestModule(url,(error:any,res:any,body:any)=>{
        console.log(res)
        console.log(error)
        console.log(body)
       
        if(!error){
          response.send(res +" "+body)
        }else{
          response.send(error)
        }
 })

})
*/



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