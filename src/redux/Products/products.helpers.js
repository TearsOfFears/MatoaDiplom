import { firestore } from "../../firebase/utils";


export const handleAddProduct = products =>{
    return new Promise((resolve,reject)=>{
        firestore
            .collection('products')
            .doc()
            .set(products)
            .then(()=>{
                resolve();
            })
            .catch(err=>{
                reject(err);
            })
    })
}
export const handleFetchProducts = ({filterType,startAfterDoc,persistProducts=[]}) =>{
    return new Promise((resolve,reject)=>{

        const pageSize = 3;

        let ref = firestore.collection('products').orderBy('createdDate').limit(pageSize);

            if(filterType) ref = ref.where('productCategory',"==",filterType)
            if(startAfterDoc) ref = ref.startAfter(startAfterDoc)
            ref
            .get()
            .then((snapShot)=>{
                const totalCount = snapShot.size;
                const data = [
                    ...persistProducts,
                    ...snapShot.docs.map(doc=>{
                        return{
                            ...doc.data(),
                            documentId:doc.id
                        }
                    })
                ];
                resolve({
                    data,
                    queryDoc:snapShot.docs[totalCount-1],
                    isLastPage:totalCount<pageSize,
                    
                })
            })
            .catch(err=>{
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
          console.log(documentID, 2)
          resolve();
        })
        .catch(err => {
          reject(err);
        })
    });
  }