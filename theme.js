/*!
 * Color mode toggler for Bootstrap's docs (https://getbootstrap.com/)
 * Copyright 2011-2023 The Bootstrap Authors
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 */

(() => {
    'use strict'
  
    const storedTheme = localStorage.getItem('theme')
  
    const getPreferredTheme = () => {
      if (storedTheme) {
        return storedTheme
      }
  
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
  
    const setTheme = function (theme) {
        const body = document.body;
    
        if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.setAttribute('data-bs-theme', 'dark');
            body.classList.add('dark-mode'); // Add dark-mode class
            body.classList.remove('light-mode'); // Remove light-mode class
        } else {
            document.documentElement.setAttribute('data-bs-theme', theme);
            body.classList.add('light-mode'); // Add light-mode class
            body.classList.remove('dark-mode'); // Remove dark-mode class
        }
        updateLogoColor();
       
    }
    
  
    setTheme(getPreferredTheme())

    const showActiveTheme = (theme, focus = false) => {
      const themeSwitcher = document.querySelector('#bd-theme')
  
      if (!themeSwitcher) {
        return
      }
  
      const themeSwitcherText = document.querySelector('#bd-theme-text')
      const activeThemeIcon = document.querySelector('.theme-icon-active use')
      const btnToActive = document.querySelector(`[data-bs-theme-value="${theme}"]`)
      const svgOfActiveBtn = btnToActive.querySelector('svg use').getAttribute('href')
  
      document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
        element.classList.remove('active')
        element.setAttribute('aria-pressed', 'false')
      })
  
      btnToActive.classList.add('active')
      btnToActive.setAttribute('aria-pressed', 'true')
      activeThemeIcon.setAttribute('href', svgOfActiveBtn)
      const themeSwitcherLabel = `${themeSwitcherText.textContent} (${btnToActive.dataset.bsThemeValue})`
      themeSwitcher.setAttribute('aria-label', themeSwitcherLabel)
  
      if (focus) {
        themeSwitcher.focus()
      }
    }
  
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (storedTheme !== 'light' || storedTheme !== 'dark') {
        setTheme(getPreferredTheme())
      }
    })
  
    window.addEventListener('DOMContentLoaded', () => {
      const preferredTheme = getPreferredTheme();
      localStorage.setItem('theme', preferredTheme); // Store the preferred theme in localStorage
      setTheme(preferredTheme);
      showActiveTheme(preferredTheme);
  
      document.querySelectorAll('[data-bs-theme-value]')
          .forEach(toggle => {
              toggle.addEventListener('click', () => {
                  const theme = toggle.getAttribute('data-bs-theme-value');
                  localStorage.setItem('theme', theme);
                  setTheme(theme);
                  showActiveTheme(theme, true);
            showActiveTheme(theme, true)
          })
        })
    })

    function updateLogoColor() {
      const storedTheme = localStorage.getItem('theme');
      const auraLogo = document.getElementById('aura-logo');
      const auraLogoH = document.getElementById('aura-logo-h');
      
      if (storedTheme === 'dark') {
        if (auraLogo) auraLogo.style.fill = 'white'; // Change the fill color to white for dark theme
        if (auraLogoH) auraLogoH.style.fill = 'white'; // Change the fill color to white for dark theme
      } else if (storedTheme === 'light') {
        if (auraLogo) auraLogo.style.fill = 'black'; // Change the fill color to black for light theme
        if (auraLogoH) auraLogoH.style.fill = 'black'; // Change the fill color to black for light theme
      } else {
        if (auraLogo) auraLogo.style.fill = 'initial'; // Revert to initial color for other themes
        if (auraLogoH) auraLogoH.style.fill = 'initial'; // Revert to initial color for other themes
      }
    }
    
    // Call the function to update the logo color based on the current theme
    updateLogoColor();
    
    // Optionally, if the theme can change dynamically, you might want to add an event listener
    window.addEventListener('storage', (event) => {
      if (event.key === 'theme') {
        updateLogoColor();
      }
    });
  })()