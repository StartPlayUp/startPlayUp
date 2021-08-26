import firebase from 'firebase'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAmxF3pBLMX0APFtZeKDAflJTCzpjnG9ak",
  authDomain: "startplayup.firebaseapp.com",
  databaseURL: "https://startplayup-default-rtdb.firebaseio.com",
  projectId: "startplayup",
  storageBucket: "startplayup.appspot.com",
  messagingSenderId: "970113103940",
  appId: "1:970113103940:web:f58f955eda34902c72a411"
};
//파이어 베이스 설치
firebase.initializeApp(firebaseConfig)
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
// googleAuthProvider 클래스를 authentication 라이브러리에서 사용할 수 있도록 불러오는 코드
provider.setCustomParameters({prompt: 'select_account'});
//signIn이랑 authentication을 위해서 Google AuthProvider를 사용할 때마다 구글 팝업을 항상 띄우기
export const signInWithGoogle = () => auth.signInWithPopup(provider);
//트위터, 페이스북, 깃허브 등으로 로그인을 하는 경우 사용
//다만 여기서는 구글로 로그인할 것이므로 파라미터로 위에서 정의한 provider를 사용

export default firebase;
