import {firestore} from "../../firebase/utils";

export const handleSaveOrder = order => {
  return new Promise((resolve, reject) => {
    firestore
      .collection('orders')
      .doc()
      .set(order)
      .then(() => {
        resolve();
      })
      .catch(err => {
        reject(err);
      });

  })
}

export const handleGetUserOrderHistory = uid => {
  return new Promise((resolve, reject) => {
    let ref = firestore.collection('orders').orderBy('orderCreated');
    ref = ref.where('orderUserID', '==', uid);

    ref
      .get()
      .then(snap => {
        const data = [
          ...snap.docs.map(doc => {
            return {
              ...doc.data(),
              documentID: doc.id
            }
          })
        ];
        setTimeout(()=>{ resolve({ data })},1000)
      
      })
      .catch(err => {
        reject(err);
      });


  });
};


export const handleGetOrder = orderID =>{
  return new Promise((resolve,reject)=>{
    firestore
      .collection('orders')
      .doc(orderID)
      .get()
      .then(snap=>{
        if(snap.exists){
          setTimeout(()=>{
            resolve({
              ...snap.data(),
              documentID:orderID
            })
          },1000)
        }
      })
      .catch(err=>{
        reject(err);
      })
  })
}


export const handleFetchOrderHistory = ({
  startAfterDoc,
  persistOrderHistory=[]
}) => {
  return new Promise((resolve, reject) => {

    const pageSize = 5;

    let ref = firestore
      .collection('orders')
      .orderBy('orderCreated',"desc")
      .limit(pageSize);

    if (startAfterDoc)
      ref = ref.startAfter(startAfterDoc)

    ref
      .get()
      .then((snapShot) => {
        const totalCount = snapShot.size;
        const dataOrders = [
          ...persistOrderHistory,
          ...snapShot
            .docs
            .map(doc => {
              return {
                ...doc.data(),
                documentID:doc.id,
              }
            })
        ];
        resolve({
          dataOrders,
          queryDocOrders: snapShot.docs[totalCount - 1],
          isLastPageOrders: totalCount < pageSize
        })
      })
      .catch(err => {
        reject(err);
      })
  })
}

export const handleDeleteOrder = orderID => {
  return new Promise((resolve, reject) => {
    firestore
      .collection('orders')
      .doc(orderID)
      .delete()
      .then(() => {
        resolve();
      })
      .catch(err => {
        reject(err);
      })
  });
}

export const handleSetActivity = (activityData, documentId) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection('orders')
      .doc(documentId)
      .update(activityData)
      .then(() => {
        resolve();
      })
      .catch(err => {
        reject(err);
      })
  });
}
