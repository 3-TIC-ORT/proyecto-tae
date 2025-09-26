
function abajo(){
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        left: 0,
        behavior: "smooth"
      });
    }, 500);
  };

window.onload = abajo();
getEvent()