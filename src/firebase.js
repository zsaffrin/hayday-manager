import firebase from 'firebase';

const config = {
	apiKey: 'AIzaSyCqY7xwHz04Ne8TEbcav7zF2CyBuP86cjQ',
	authDomain: 'hayday-manager.firebaseapp.com',
	databaseURL: 'https://hayday-manager.firebaseio.com',
	projectId: 'hayday-manager',
	storageBucket: 'hayday-manager.appspot.com',
	messagingSenderId: '368708658714',
};
const fire = firebase.initializeApp(config);

export default fire;
