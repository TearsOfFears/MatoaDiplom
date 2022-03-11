import {firestore} from "../../firebase/utils";

export const handleAddContentHome = homeData => {
  return new Promise((resolve, reject) => {
    firestore
      .collection('homeProduct')
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
  startAfterDoc,
  persistProducts = []
}) => {
  return new Promise((resolve, reject) => {

    const pageSize = 5;

    let ref = firestore
      .collection('homeProduct')
      .orderBy('createdDate')
      .limit(pageSize);

      
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
      .collection('homeProduct')
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





export const handleAddContentHomeTestimonals = homeTestimonals => {
  return new Promise((resolve, reject) => {
    firestore
      .collection('homeTestimonals')
      .doc()
      .set(homeTestimonals)
      .then(() => {
        resolve();
      })
      .catch(err => {
        reject(err);
      })
  })
}

export const handleFetchContentHomeTestimonals = ({
  startAfterDoc,
  persistProducts = []
}) => {
  return new Promise((resolve, reject) => {

    const pageSize = 5;

    let ref = firestore
      .collection('homeTestimonals')
      .orderBy('createdDate')
      .limit(pageSize);

    if (startAfterDoc) 
      ref = ref.startAfter(startAfterDoc)
    ref
      .get()
      .then((snapShot) => {
        const totalCount = snapShot.size;
        const dataTestimonals = [
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
          dataTestimonals,
          queryDocTestimonals: snapShot.docs[totalCount - 1],
          isLastPageTestimonals: totalCount < pageSize
        })
      })
      .catch(err => {
        reject(err);
      
      })
  })
}


export const handleDeleteHomeContentTestimonals = testimonalsID => {
  return new Promise((resolve, reject) => {
    firestore
      .collection('homeTestimonals')
      .doc(testimonalsID)
      .delete()
      .then(() => {
        resolve();
      })
      .catch(err => {
        reject(err);
      })
  });
}

export const handleEditHomeContentTestimonals = testimonalsID => {
  return new Promise((resolve, reject) => {
    firestore
      .collection('homeTestimonals')
      .doc(testimonalsID)
      .get()
      .then((snapShot) => {
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
        resolve({
          data,
        })
      })
      .catch(err => {
        reject(err);
      })
  });
}