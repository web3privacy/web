function applyScrambleEffect() {
	const glitchTextOnceElements = document.querySelectorAll('.glitch-text');
	const glitchTextRepeatElements = document.querySelectorAll('.glitch-text-interval');
  
	function animateScramble(element, text, duration = 1000) {
	  const chars = [];
	  element.innerHTML = '';
	  const preScrambleWidth = element.offsetWidth;
	  element.style.width = `${preScrambleWidth}px`;
  
	  for (let t = 0; t < text.length; t++) {
		const span = document.createElement('span');
		span.innerHTML = text[t] === ' ' ? '&nbsp;' : text[t];
		chars[t] = span;
		span.style.display = 'inline-block';
		element.appendChild(span);
	  }
  
	  const rand = Math.random;
	  const SECONDS = 1000;
	  const FPS = 30;
	  const animationLength = duration;
  
	  function animate3(k) {
		const kk = k * text.length;
		for (let i = 0; i < text.length; i++) {
		  if (kk < i) {
			chars[i].innerHTML = String.fromCharCode(~~(65 + rand() * 26));
		  } else {
			chars[i].innerHTML = text[i] === ' ' ? '&nbsp;' : text[i];
		  }
		}
	  }
  
	  let start = Date.now();
	  function animate() {
		const current = Date.now();
		const time = current - start;
		const k = time / animationLength;
  
		if (k < 1) {
		  setTimeout(animate, SECONDS / FPS);
		  animate3(k);
		} else {
		  for (let i = 0; i < text.length; i++) {
			chars[i].innerHTML = text[i] === ' ' ? '&nbsp;' : text[i];
		  }
		  element.style.width = 'auto';
		  element.isAnimating = false;
		}
	  }
  
	  animate();
	}
  
	const observer = new IntersectionObserver((entries, observer) => {
	  entries.forEach(entry => {
		if (entry.isIntersecting) {
		  const element = entry.target;
		  const text = element.innerText;
		  animateScramble(element, text);
		  observer.unobserve(element);
		}
	  });
	}, {
	  threshold: 0.1
	});
  
	glitchTextOnceElements.forEach((element) => {
	  observer.observe(element);
	});
  
	glitchTextRepeatElements.forEach((element) => {
	  const text = element.innerText;
  
	  animateScramble(element, text);
  
	  const intervalId = setInterval(() => {
		if (!element.isAnimating) {
		  animateScramble(element, text);
		}
	  }, 5000);
  
	  element.addEventListener('mouseenter', () => {
		if (!element.isAnimating) {
		  clearInterval(intervalId);
		  animateScramble(element, text, 800);
		  element.isAnimating = true;
  
		  setTimeout(() => {
			element.isAnimating = false;
		  }, 1000);
		}
	  });
	});
  }
  
  document.addEventListener('DOMContentLoaded', applyScrambleEffect);
  