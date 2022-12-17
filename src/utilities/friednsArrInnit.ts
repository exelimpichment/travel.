import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { useAppSelector } from '../hooks/reduxHooks';

const {
  newJourney: { currentUser },
} = useAppSelector((state) => state);

export const initiateFriendsArr = async () => {
  console.log('your lovely function works ');
  console.log(currentUser?.uid);
  // checks if document exist ====================================
  {
    const docRef = doc(
      db,
      'users',
      `${currentUser?.uid}`,
      'userFriends',
      'detailedUsersList'
    );
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());
    } else {
      // ADDS DOCUMENT IF IT DOES NOT EXIST  ========================
      console.log('No such document!');
      await setDoc(
        doc(
          db,
          'users',
          `${currentUser?.uid}`,
          'userFriends',
          'detailedUsersList'
        ),
        {
          detailedFriends: [],
          friendsList: [],
        }
      );
      console.log('document added');
    }
  }
};
initiateFriendsArr();
