useEffect(() => {
  async function getBookmarks() {
    const firstLoading = query(
      collection(db, 'users', 'nsidPuwRICdck5LhWHg9WBg0Z383', 'bookmarks'),
      orderBy('createdAt'),
      limit(5)
    );



    
    const querySnapshot = await getDocs(firstLoading);
    let fetchedBookmarks: object[] = [];
    querySnapshot.forEach((doc) => {
      fetchedBookmarks.push(doc.data());
      const {
        displayName,
        docID,
        email,
        latitude,
        location_id,
        longitude,
        photo,
        photoURL,
        uid,
      } = doc.data();

      fetchedBookmarks.push({
        displayName,
        docID,
        email,
        latitude,
        location_id,
        longitude,
        photo,
        photoURL,
        uid,
      });
    });

    dispatch(setBookmarks(fetchedBookmarks));

    console.log(fetchedBookmarks);

    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    lastVisibleBookmark = lastVisible;
    // return lastVisible;
  }
  // dispatch(setBookmarks(fetchedBookmarks));
  console.log('test');

  bookmarks.length < 5 ? getBookmarks() : null;
}),
  [];
