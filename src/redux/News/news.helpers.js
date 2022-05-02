import {
  firestore
} from "../../firebase/utils";

export const handleSaveNews = news => {
  return new Promise((resolve, reject) => {
    firestore
      .collection('news')
      .doc()
      .set(news)
      .then(() => {
        resolve();
      })
      .catch(err => {
        reject(err);
      });
  })
}

export const handleFetchNews = ({
  startAfterDoc,
  persistNews = []
}) => {
  return new Promise((resolve, reject) => {
    const pageSize = 6;
    let ref = firestore
      .collection('news')
      .orderBy('newsCreated')
      .limit(pageSize);

    if (startAfterDoc)
      ref = ref.startAfter(startAfterDoc)
    ref
      .get()
      .then((snapShot) => {
        const totalCount = snapShot.size;
        const dataNews = [
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
          dataNews,
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


export const handleDeleteNews = newsID => {
  return new Promise((resolve, reject) => {
    firestore
      .collection('news')
      .doc(newsID)
      .delete()
      .then(() => {
        resolve();
      })
      .catch(err => {
        reject(err);
      })
  });
}


export const handleEditNews = newsID => {
  return new Promise((resolve, reject) => {
    firestore
      .collection('news')
      .doc(newsID)
      .get()
      .then(snap=>{
        if(snap.exists){
          resolve({
            ...snap.data(),
            documentID:newsID
          })
        }
      })
      .catch(err=>{
        reject(err);
      })
  });
}


export const handleUpdateNews= (news,newsID) => {

  return new Promise((resolve, reject) => {
    firestore
      .collection('news')
      .doc(newsID)
      .update(news)
      .then(()=>{
        resolve()
        }
      )
      .catch(err => {
        reject(err);
      })
  })
}



export const handleGetCurrentNews = ({newsLink}) => {

  return new Promise((resolve, reject) => {


  let ref = firestore
    .collection('news')

  if(newsLink)
     ref = ref.where('newsLink', "==", newsLink)

    ref
      .get()
      .then(snapShot => {
        const data = [
          ...snapShot
            .docs
            .map(doc => {
              return {
                ...doc.data(),
                documentId: doc.id
              }
            })
        ];
        resolve(data)
      })
      .catch(err => {
        reject(err);
        console.log(err);
      })

})}