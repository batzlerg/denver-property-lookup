const debounce = v => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    val = v;
  }, 750);
}