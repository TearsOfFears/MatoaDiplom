import { auth, firestore } from './../../firebase/utils';

export const handleResetPasswordAPI = (email) => {
  const config = {
    url: 'http://localhost:3000/login'
  };

  return new Promise((resolve, reject) => {
    auth.sendPasswordResetEmail(email, config)
      .then(() => {
        resolve();
      })
      .catch(() => {
        const err = ["Пошта не знайдена. Попробуйте ще раз"];
        reject(err);
      });
  });
};

export const handleFetchUsers= ({
  startAfterDoc,
  persistUsers = [],
}) => {
  return new Promise((resolve, reject) => {
    const pageSize = 8;
    let ref = firestore
      .collection('users')
      .orderBy('createdDate', "desc")
      .limit(pageSize);
    if (startAfterDoc)
      ref = ref.startAfter(startAfterDoc)
    ref
      .get()
      .then((snapShot) => {
        const totalCount = snapShot.size;
        const dataUsers = [
          ...persistUsers,
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
          dataUsers,
          queryDocUsers: snapShot.docs[totalCount - 1],
          isLastPageUsers: totalCount < pageSize
        })
      })
      .catch(err => {
        reject(err);
      })
  })
}

export const handleSetRoles = (userRoles, documentId) => {
  console.log(userRoles);
  console.log(documentId);
  return new Promise((resolve, reject) => {
    //Object.assign({}, userRoles)
    firestore
      .collection('users')
      .doc(documentId)
      .update(Object.assign({userRoles}))
      .then(() => {
        resolve();
      })
      .catch(err => {
        reject(err);
      })
  });
}

export const handleDeleteUser = documentID => {
  return new Promise((resolve, reject) => {
    firestore
      .collection('users')
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