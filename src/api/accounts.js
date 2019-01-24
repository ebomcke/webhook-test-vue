import firebase from "firebase/app";
import "firebase/firestore";

class Account {
  createOrGetAccount = async user => {
    const accountRef = firebase
      .firestore()
      .collection("accounts")
      .doc(user.uid);
    const accountSnapshot = await accountRef.get();
    let account;
    if (!accountSnapshot.exists) {
      account = this.state.account;
      account.confirmed = false;
      account.date = firebase.firestore.Timestamp.now();
      await accountRef.set(account);
    } else {
      account = accountSnapshot.data();
    }
    return account;
  };

  update = async account => {
    await firebase
      .firestore()
      .collection("accounts")
      .doc(account.id)
      .set(account);
    return account;
  };
}

export default new Account();
