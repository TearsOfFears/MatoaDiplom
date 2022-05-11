import {
  firestore
} from "../../firebase/utils";

export const handleSaveComment = comment => {
  return new Promise((resolve, reject) => {
    firestore
      .collection('comments')
      .doc()
      .set(comment)
      .then(() => {
        resolve();
      })
      .catch(err => {
        reject(err);
      });
  })
}

export const handleFetchComments = ({
  startAfterDoc,
  persistNews = [],
  documentId
}) => {
  return new Promise((resolve, reject) => {
    const pageSize = 6;
    let ref = firestore
      .collection('comments')
      .limit(pageSize);
    if (documentId)
      ref = ref.where('documentId', "==", documentId)
    if (startAfterDoc)
      ref = ref.startAfter(startAfterDoc)
  
    ref
      .get()
      .then((snapShot) => {
        const totalCount = snapShot.size;
        const dataComments = [
          ...persistNews,
          ...snapShot
          .docs
          .map(doc => {
            return {
              ...doc.data(),
              documentID: doc.id,
            }
          })
        ];
        resolve({
          dataComments,
          queryDocNews: snapShot.docs[totalCount - 1],
          isLastPageNews: totalCount < pageSize
        })
      })
      .catch(err => {
        reject(err);
        console.log(err);
      })
  })
}


export const handleDeleteComment = commentID => {
  return new Promise((resolve, reject) => {
    firestore
      .collection('commentі')
      .doc(commentID)
      .delete()
      .then(() => {
        resolve();
      })
      .catch(err => {
        reject(err);
      })
  });
}


//   export const handleEditNews = newsID => {
//     return new Promise((resolve, reject) => {
//       firestore
//         .collection('news')
//         .doc(newsID)
//         .get()
//         .then(snap=>{
//           if(snap.exists){
//             resolve({
//               ...snap.data(),
//               documentID:newsID
//             })
//           }
//         })
//         .catch(err=>{
//           reject(err);
//         })
//     });
//   }


//   export const handleUpdateNews= (news,newsID) => {

//     return new Promise((resolve, reject) => {
//       firestore
//         .collection('news')
//         .doc(newsID)
//         .update(news)
//         .then(()=>{
//           resolve()
//           }
//         )
//         .catch(err => {
//           reject(err);
//         })
//     })
//   }



//   export const handleGetCurrentNews = ({newsLink}) => {

//     return new Promise((resolve, reject) => {

//     let ref = firestore
//       .collection('news')

//     if(newsLink)
//        ref = ref.where('newsLink', "==", newsLink)

//       ref
//         .get()
//         .then(snapShot => {
//           const data = [
//             ...snapShot
//               .docs
//               .map(doc => {
//                 return {
//                   ...doc.data(),
//                   documentId: doc.id
//                 }
//               })
//           ];
//           resolve(data)
//         })
//         .catch(err => {
//           reject(err);
//           console.log(err);
//         })

//   })}