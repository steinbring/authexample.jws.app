initApp = function() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var uid = user.uid;
      var phoneNumber = user.phoneNumber;
      var providerData = user.providerData;
      user.getIdToken().then(function(accessToken) {
        document.getElementById('sign-in-status').textContent = 'You are signed in!';
        document.getElementById('sign-in').innerHTML = '<button id="sign-out">Sign Out</button>';
        document.getElementById('account-details').textContent = JSON.stringify({
          displayName: displayName,
          email: email,
          emailVerified: emailVerified,
          phoneNumber: phoneNumber,
          photoURL: photoURL,
          uid: uid,
          accessToken: accessToken,
          providerData: providerData
        }, null, '  ');
      });
    } else {
      // User is signed out.
      document.getElementById('sign-in-status').textContent = 'You are signed out!';
      document.getElementById('sign-in').innerHTML = '<button id="Sign-in">Sign in</button>';
      document.getElementById('account-details').textContent = 'null';
    }
  }, function(error) {
    console.log(error);
  });

  // Give them the ability to sign out
  document.getElementById('sign-out').addEventListener('click', function() {
    firebase.auth().signOut();
  });
  // Give them the ability to sign in
  document.getElementById('sign-in').addEventListener('click', function() {
    window.location.href = 'https://authexample.jws.app/';
  });
};

window.addEventListener('load', function() {
  initApp();
});