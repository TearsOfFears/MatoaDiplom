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
export const handleFetchProducts = () =>{
    return new Promise((resolve,reject)=>{
        firestore
            .collection('products')
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

export const handleDeleteProduct = (documentID)=>{
    return new Promise((resolve,reject)=>{
        firestore
            .collection('products')
            .doc(documentID)
           .delete()
            .then(()=>{
                resolve()
                })
        
            .catch(err=>{
                reject(err);
            })
    })
}