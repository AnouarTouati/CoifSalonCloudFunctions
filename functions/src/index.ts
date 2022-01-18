import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

admin.initializeApp();

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

export const testPostingToFunction = functions.https.onRequest(
  (request, response) => {
    if (
      request.body.firebaseAPIKey.toString() !==
      "1349b396-06ce-45f5-81e1-9042ce8218dc"
    ) {
      response.status(401).send("Unautherized");
    } else {
      admin
        .firestore()
        .collection("Currencies")
        .doc("data")
        .set(request.body)
        .then((writeResult) => {
          console.log(request.body);
          response.status(200).send("Update was successful!");
        })
        .catch((error) => {
          console.log(error);
          console.log(request.body);
          response.status(500).send("Update was NOT successful!");
        });
    }
  }
);

export const clientPendingTimeStamping = functions.firestore
  .document("/Shops/{ShopOwnerUid}/ClientsPending/{ClientUid}")
  .onCreate((snapshot, context) => {
    return admin
      .firestore()
      .collection("Shops")
      .doc(context.params.ShopOwnerUid)
      .collection("ClientsPending")
      .doc(context.params.ClientUid)

      .set(
        { timeInMillis: admin.firestore.Timestamp.now().toMillis() },
        { merge: true }
      )
      .then((writeResult) => {
        console.log("setting the time for pending was successful");
      })
      .catch((error) => {
        console.log(error);
      });
  });

export const clientReviewTimeStamping = functions.firestore
  .document("/Shops/{ShopOwnerUid}/Reviews/{ClientUid}")
  .onCreate((snapshot, context) => {
    console.log(snapshot.data());
    return admin
      .firestore()
      .collection("Shops")
      .doc(context.params.ShopOwnerUid)
      .collection("Reviews")
      .doc(context.params.ClientUid)
      .set(
        {
          ReviewerCommentDateInMillis:
            admin.firestore.Timestamp.now().toMillis(),
        },
        { merge: true }
      )
      .then((writeResult) => {
        console.log("setting the time for review was successful");
      })
      .catch((error) => {
        console.log(error);
      });
  });