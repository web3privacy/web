function applyScrambleEffect() {
	const glitchTextElements = document.querySelectorAll('.glitch-text');
	const glitchTextHoverElements = document.querySelectorAll('.glitch-text-hover');
  
	function animateScramble(element, text, duration = 2000) {
	  const chars = [];
	  element.innerHTML = ''; // Clear the original text
  
	  // Measure the element's width before animation starts
	  const preScrambleWidth = element.offsetWidth;
	  element.style.width = `${preScrambleWidth}px`;
  
	  for (let t = 0; t < text.length; t++) {
		const span = document.createElement('span');
  
		// Check if the character is a space, then use &nbsp; to preserve it
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
			// Preserve spaces with &nbsp;
			chars[i].innerHTML = text[i] === ' ' ? '&nbsp;' : text[i];
		  }
		}
	  }
  
	  // Animation loop
	  let start = Date.now();
	  function animate() {
		const current = Date.now();
		const time = current - start;
		const k = time / animationLength;
  
		if (k < 1) {
		  setTimeout(animate, SECONDS / FPS);
		  animate3(k);
		} else {
		  // Ensure the final text is revealed once the animation is complete
		  for (let i = 0; i < text.length; i++) {
			chars[i].innerHTML = text[i] === ' ' ? '&nbsp;' : text[i];
		  }
		  // Restore the original width (optional if you want to revert to normal)
		  element.style.width = 'auto';
		  // Allow new hover events after the animation completes
		  element.isAnimating = false;
		}
	  }
  
	  animate();
	}
  
	// Use Intersection Observer to observe when the element comes into view
	const observer = new IntersectionObserver((entries, observer) => {
	  entries.forEach(entry => {
		if (entry.isIntersecting) {
		  const element = entry.target;
		  const text = element.innerText;
		  animateScramble(element, text);
		  observer.unobserve(element); // Stop observing after the animation has been triggered
		}
	  });
	}, {
	  threshold: 0.1 // Trigger when 10% of the element is visible
	});
  
	// Observe each glitchTextElement for when it comes into view
	glitchTextElements.forEach((element) => {
	  observer.observe(element);
	});
  
	glitchTextHoverElements.forEach((element) => {
	  const text = element.innerText;
  
	  element.isAnimating = false;
  
	  element.addEventListener('mouseenter', () => {
		if (!element.isAnimating) {
		  element.isAnimating = true; // Set flag to prevent re-triggering during animation
		  animateScramble(element, text, 800);
		}
	  });
	});
  }
  
  document.addEventListener('DOMContentLoaded', applyScrambleEffect);
  