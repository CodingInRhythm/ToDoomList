import Scroll from "./scroll.js"
import Scheme from "./schemes.js"

window.addEventListener("load", (event)=>{

    new Scroll().play();
    new Scheme().getSchemes();

})