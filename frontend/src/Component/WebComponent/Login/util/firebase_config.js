import firebase from 'firebase'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDKfGhfG2WutaUsqpxQl7nm88DIP-ehLv8",
    authDomain: "startplayup-ac7ee.firebaseapp.com",
    databaseURL: "https://startplayup-ac7ee-default-rtdb.firebaseio.com",
    projectId: "startplayup-ac7ee",
    storageBucket: "startplayup-ac7ee.appspot.com",
    messagingSenderId: "922265546085",
    appId: "1:922265546085:web:e6882d6e2e0b55edacc58c",
    measurementId: "G-BBD31DL3C7"
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
