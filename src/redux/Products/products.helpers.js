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
export const handleFetchProducts = ({filterType}) =>{
    return new Promise((resolve,reject)=>{
        let ref = firestore.collection('products').orderBy('createdDate')

            if(filterType) ref = ref.where('productCategory',"==",filterType)

            ref
            .get()
            .then((snapShot)=>{
                const productsArray = snapShot.docs.map(doc=>{
                    return{
                        ...doc.data(),
                        documentId:doc.id
                    }
                })
                resolve(productsArray)
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