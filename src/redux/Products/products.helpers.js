import {firestore} from "../../firebase/utils";

export const handleAddProduct = products => {


  return new Promise((resolve, reject) => {
    firestore
      .collection('products')
      .doc()
      .set(products)
      .then(() => {
        resolve();
      })
      .catch(err => {
        reject(err);
      })
  })
}

export const handleFetchProducts = ({
  filterType,
  sortType,
  sortAvailableP,
  startAfterDoc,
  discountQ,
  persistProducts = []
}) => {
  return new Promise((resolve, reject) => {

    const pageSize = 8;
    
    let ref = firestore
      .collection('products')
      .limit(pageSize);

    if(sortType)
      ref = ref.orderBy("price", sortType)

    if(sortAvailableP )
       ref = ref.where("availability", "in",sortAvailableP)

    if(discountQ)
       ref = ref.where('discount', "==", discountQ)
  
    if(filterType)
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

export const handleDeleteProduct = documentID => {
  return new Promise((resolve, reject) => {
    firestore
      .collection('products')
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


export const handleFetchCurrentProduct = ({productID,productName}) => {

  return new Promise((resolve, reject) => {


  let ref = firestore
    .collection('products')

  if(productName)
     ref = ref.where('productName', "==", productName)

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



export const handleEditContent = productID => {
  return new Promise((resolve, reject) => {
    firestore
      .collection('products')
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


export const handleUpdateContent = (content,contentID) => {

  return new Promise((resolve, reject) => {
    firestore
      .collection('products')
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