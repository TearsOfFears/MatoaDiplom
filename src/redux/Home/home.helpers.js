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
  persistInstagram = []
}) => {
  return new Promise((resolve, reject) => {

    const Size = 6;

    let ref = firestore
      .collection('homeInstagram')
      .orderBy('createdDate')
      .limit(Size);

    if (startAfterDoc) 
      ref = ref.startAfter(startAfterDoc)
    ref
      .get()
      .then((snapShot) => {
        const totalCount = snapShot.size;
        const dataInstagram = [
          ...persistInstagram,
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
          isLastPageInstagram: totalCount < Size
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




export const handleAddImage =  image => {
  return new Promise((resolve, reject) => {
    firestore
      .collection('images')
      .doc()
      .set(image)
      .then(() => {
        resolve();
      })
      .catch(err => {
        reject(err);
      })
  })
}

export const handleFetchImages= ({
  startAfterDoc,
  persistImage = []
}) => {
  return new Promise((resolve, reject) => {

    const pageSize = 5;

    let ref = firestore
      .collection('images')
      .orderBy('createdDate')
      .limit(pageSize);

    if (startAfterDoc) 
      ref = ref.startAfter(startAfterDoc)
    ref
      .get()
      .then((snapShot) => {
        const totalCount = snapShot.size;
        const dataImage = [
          ...persistImage,
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
          dataImage,
          queryDocImages: snapShot.docs[totalCount - 1],
          isLastPageImages: totalCount < pageSize
        })
      })
      .catch(err => {
        reject(err);
      
      })
  })
}


export const handleDeleteImages = imagesID => {
  return new Promise((resolve, reject) => {
    firestore
      .collection('images')
      .doc(imagesID)
      .delete()
      .then(() => {
        resolve();
      })
      .catch(err => {
        reject(err);
      })
  });
}


export const handleFetchSeries = ({

  series,
}) => {
  return new Promise((resolve, reject) => {

    const pageSizeDef = 9;
    let ref = firestore
    .collection('products')
    .limit(pageSizeDef);

    if(series)
      ref = ref.where('series', "in", series)

    ref
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
  })
}