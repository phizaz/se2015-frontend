/**
 * bootstrapper is used to show loading progress before
 * the actual program is loaded
 */

/* globals: NProgress */

// import 'pace/pace.js';
// import 'pace/themes/orange/pace-theme-minimal.css';

import NProgress from 'nprogress/nprogress.js';
import 'nprogress/nprogress.css';

class Bootstrapper {
  constructor() {
    this.load('./public/app.bundle.js');
  }

  progress(percent) {
    console.log('percent:', percent);
    NProgress.set(percent);
  }

  load(url) {
    let req = new XMLHttpRequest();
    // report progress events
    req.addEventListener("progress", (event) => {
      if (event.lengthComputable) {
        let percentComplete = event.loaded / event.total;
        this.progress(percentComplete);
      } else {
        // Unable to compute progress information since the total size is unknown
        console.log('cannot get the loading length');
      }
    }, false);

    // load responseText into a new script element
    req.addEventListener("load", (event) => {
      let e = event.target;
      let s = document.createElement("script");
      s.innerHTML = e.responseText;
      // or: s[s.innerText!=undefined?"innerText":"textContent"] = e.responseText
      document.documentElement.appendChild(s);

      s.addEventListener("load", function() {
        // this runs after the new script has been executed...
      });
    }, false);

    NProgress.start();
    req.open("GET", url);
    req.send();
  }
}

new Bootstrapper();


