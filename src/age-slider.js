window.addEventListener("load", () => {
  document.querySelectorAll(".age-slider").forEach((rangeSlider) => {
    const ranges = rangeSlider.querySelectorAll("input[type=range]");
    const rangeMin = rangeSlider.querySelector(".rangeMin");
    const rangeMax = rangeSlider.querySelector(".rangeMax");

    ranges[0].addEventListener("input", (e) => {
      if (+ranges[0].value >= +ranges[1].value) {
        ranges[0].value = +ranges[1].value - 1;
      }
      rangeMin.innerHTML = ranges[0].value;
    });

    ranges[1].addEventListener("input", (e) => {
      if (+ranges[1].value <= +ranges[0].value) {
        ranges[1].value = +ranges[0].value + 1;
      }
      rangeMax.innerHTML = ranges[1].value;
    });

    rangeMin.innerHTML = ranges[0].value;
    rangeMax.innerHTML = ranges[1].value;
  });
});
