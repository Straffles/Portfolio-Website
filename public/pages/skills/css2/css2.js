function isMobile() {
    const img1 = document.querySelector('#img1');
    const img2 = document.querySelector('#img2');
    const divText = document.querySelector('.text-container');
    const imgContainer = document.querySelector('.img-container');
    const paragraph2 = document.querySelector('#p2');
    const paragraph3 = document.querySelector('#p3');

  
    if (( window.innerWidth <= 600 ) && ( window.innerHeight <= 900 )){
      divText.insertBefore(img1, paragraph2);
      divText.insertBefore(img2, paragraph3);
    }
    else {
      imgContainer.appendChild(img1)
      imgContainer.appendChild(img2)
    }
  }
  
  
  window.addEventListener('resize', () => {
    isMobile();
  })
  isMobile();