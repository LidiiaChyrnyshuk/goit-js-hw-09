const t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]"),r=document.querySelector("body");t.addEventListener("click",(function(t){t.target.disabled=!0,e.removeAttribute("disabled"),a=setInterval((()=>{r.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}),1e3)})),e.addEventListener("click",(function(e){e.target.disabled=!0,t.removeAttribute("disabled"),clearInterval(a)}));let a=null;e.disabled=!0;
//# sourceMappingURL=01-color-switcher.8597c097.js.map