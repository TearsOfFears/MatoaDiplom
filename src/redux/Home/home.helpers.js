import {firestore} from "../../firebase/utils";

export const handleAddContentHome = homeData => {
  return new Promise((resolve, reject) => {
    firestore
      .collection('home')
      .doc()
      .set(homeData)
      .then(() => {
        resolve();
      })
      .catch(err => {
        reject(err);
      })
  })
}

export const handleFetchContentHome = ({
  filterType,
  startAfterDoc,
  persistProducts = []
}) => {
  return new Promise((resolve, reject) => {

    const pageSize = 8;

    let ref = firestore
      .collection('home')
      .orderBy('createdDate')
      .limit(pageSize);

    if (filterType) 
      ref = ref.where('productCategory', "==", filterType)
    if (startAfterDoc) 
      ref = ref.startAfter(startAfterDoc)
    ref
      .get()
      .then((snapShot) => {
        const totalCount = snapShot.size;
        const data = [
          ...persistProducts,
          ...snapShot
            .docs
            .map(doc => {
              return {
                ...doc.data(),
                documentId: doc.id
              }
            })
        ];
        resolve({
          data,
          queryDoc: snapShot.docs[totalCount - 1],
          isLastPage: totalCount < pageSize
        })
      })
      .catch(err => {
        reject(err);
      })
  })
}


export const handleDeleteHomeContent = documentID => {
  return new Promise((resolve, reject) => {
    firestore
      .collection('home')
      .doc(documentID)
      .delete()
      .then(() => {
        resolve();
      })
      .catch(err => {
        reject(err);
      })
  });
}