/*-------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------- LoadingRing ---------------------------------------------*/

document.addEventListener('DOMContentLoaded', hideLoadingRing);

function hideLoadingRing(){
  setTimeout(() => {
    document.getElementById("container-loadingRing").style.display = "none";
  }, 2000);
}

/*-----------------------------------------------------------------------------------------------------*/
/*--------------------------------------------- SearchBar ---------------------------------------------*/

document.getElementById("input-searchBar").addEventListener('keyup', goToSearchHtml);

function goToSearchHtml(){
  console.log("asd");
  if (event.keyCode === 13) {
    console.log("asd2");
    event.preventDefault();
    window.location.href = "./search.html";
  }
}

/*---------------------------------------------------------------------------------------------------*/
/*--------------------------------------------- Gallery ---------------------------------------------*/

var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

/*----------------------------------------------------------------------------------------------------*/
/*--------------------------------------------- Comments ---------------------------------------------*/

document.getElementById("button-see3Comments").addEventListener('click', displayComments);

function displayComments(){
    document.getElementById("container-allComments").className="";
    document.getElementById("button-see3Comments").style.display="none";
}

