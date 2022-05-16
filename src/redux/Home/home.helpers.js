import {firestore} from "../../firebase/utils";
import { loadingToggleAction } from "./home.actions";

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
      .then(snap=>{
        if(snap.exists){
          resolve({
            ...snap.data(),
            documentID:testimonalsID
          })
        }
      })
      .catch(err=>{
        reject(err);
      })
  });
}


export const handleUpdateContentHomeTestimonals = (editData, id) => {

  return new Promise((resolve, reject) => {
    firestore
      .collection('homeTestimonals')
      .doc(id)
      .update(editData)
      .then(()=>{
        resolve()
        }
      )
      .catch(err => {
        reject(err);
      })
  })
}


export const handleEditHomeContentProduct = productID => {
  return new Promise((resolve, reject) => {
    firestore
      .collection('homeProduct')
      .doc(productID)
      .get()
      .then(snap=>{
        if(snap.exists){
          resolve({
            ...snap.data(),
            documentID:productID
          })
        }
      })
      .catch(err=>{
        reject(err);
      })
  });
}


export const handleUpdateContentHomeProduct = (content,contentID) => {

  return new Promise((resolve, reject) => {
    firestore
      .collection('homeProduct')
      .doc(contentID)
      .update(content)
      .then(()=>{
        resolve()
        }
      )
      .catch(err => {
        reject(err);
      })
  })
}







export const handleAddContentHomeInstagram= homeInstagram => {
  return new Promise((resolve, reject) => {
    firestore
      .collection('homeInstagram')
      .doc()
      .set(homeInstagram)
      .then(() => {
        resolve();
      })
      .catch(err => {
        reject(err);
      })
  })
}

export const handleFetchContentHomeInstagram = ({
  startAfterDoc,
  persistProducts = []
}) => {
  return new Promise((resolve, reject) => {

    const pageSize = 5;

    let ref = firestore
      .collection('homeInstagram')
      .orderBy('createdDate')
      .limit(pageSize);

    if (startAfterDoc) 
      ref = ref.startAfter(startAfterDoc)
    ref
      .get()
      .then((snapShot) => {
        const totalCount = snapShot.size;
        const dataInstagram = [
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
          dataInstagram,
          queryDocInstagram: snapShot.docs[totalCount - 1],
          isLastPageInstagram: totalCount < pageSize
        })
      })
      .catch(err => {
        reject(err);
      
      })
  })
}


export const handleDeleteHomeContentInstagram = instagramID => {
  return new Promise((resolve, reject) => {
    firestore
      .collection('homeInstagram')
      .doc(instagramID)
      .delete()
      .then(() => {
        resolve();
      })
      .catch(err => {
        reject(err);
      })
  });
}


export const handleEditHomeContentInstagram= instagramID => {
  return new Promise((resolve, reject) => {
    firestore
      .collection('homeInstagram')
      .doc(instagramID)
      .get()
      .then(snap=>{
        if(snap.exists){
          resolve({
            ...snap.data(),
            documentID:instagramID
          })
        }
      })
      .catch(err=>{
        reject(err);
      })
  });
}

export const handleFetchSeries = ({

  //startAfterDoc,
  series,
  //persistProducts = []
}) => {
  return new Promise((resolve, reject) => {

    const pageSizeDef = 9;
    let ref = firestore
    .collection('products')
    .limit(pageSizeDef);

    if(series)
      ref = ref.where('series', "in", series)

    // if (startAfterDoc) 
    //   ref = ref.startAfter(startAfterDoc)

    ref
      .get()
      .then((snapShot) => {
        //const totalCount = snapShot.size;
        const data = [
          //...persistProducts,
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
          // queryDoc: snapShot.docs[totalCount - 1],
          // isLastPage: totalCount < pageSizeDef
        })
      })
      .catch(err => {
        reject(err);
      })
  })
}