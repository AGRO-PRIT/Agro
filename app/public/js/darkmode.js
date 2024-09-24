function loadMode() {
    const mode = localStorage.getItem('mode');
    if (mode === 'dark') {
        setDarkMode();
    }
    document.getElementById('toggleMode').addEventListener('click', toggleMode);
  }
   
  // set darkmode
  function setDarkMode() {
    document.documentElement.style.setProperty('--textcolor', 'blue');
    document.documentElement.style.setProperty('--background', 'green');
    localStorage.setItem('mode', 'dark');
  }
   
  // set lightmode
  function setLightMode() {
    document.documentElement.style.setProperty('--textcolor', 'purple');
    document.documentElement.style.setProperty('--background', 'red');
    localStorage.setItem('mode', 'light');
  }
   
  // toggle the color mode
  function toggleMode() {
    const isDarkMode = localStorage.getItem('mode') === 'dark';
    if (isDarkMode) {
        setLightMode();
    } else {
        setDarkMode();
    }
  }
   