(() => {

  /* ------------------ MENU MODAL ------------------ */

  const menuBtn = document.querySelector(".menu-btn");
  const modal = document.getElementById("sideModal");

  if (!menuBtn || !modal) return;

  const menuIcon = menuBtn.querySelector("i");
  const closeBtn = modal.querySelector(".modal-close");

  const openModal = () => {
    modal.classList.add("open");
    menuBtn.classList.add("open");
    document.body.classList.add("no-scroll");

    menuIcon.classList.remove("fa-bars");
    menuIcon.classList.add("fa-xmark");
  };

  const closeModal = () => {
    modal.classList.remove("open");
    menuBtn.classList.remove("open");
    document.body.classList.remove("no-scroll");

    menuIcon.classList.remove("fa-xmark");
    menuIcon.classList.add("fa-bars");
  };

  menuBtn.addEventListener("click", () => {
    modal.classList.contains("open") ? closeModal() : openModal();
  });

  closeBtn?.addEventListener("click", closeModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) {
      closeModal();
    }
  });

  modal.addEventListener("click", (e) => {
    if (e.target.tagName === "A") closeModal();
  });



  /* ------------------ TYPEWRITER ------------------ */

  const line = document.getElementById("type-line1");
  if (line) {

    const roles = ["Front-End Developer", "Back-End Developer"];
    const devWord = "Developer";

    let roleIndex = 0;
    let charIndex = 0;
    let phase = "typing";

    const typeSpeed = 110;
    const eraseSpeed = 80;
    const holdTime = 5000;

    const render = () => {
      const full = roles[roleIndex];
      const devIndex = full.indexOf(devWord);
      const visible = full.slice(0, charIndex);

      if (full.includes("MERN Stack")) {
        line.classList.add("is-long");
      } else {
        line.classList.remove("is-long");
      }

      if (devIndex === -1 || charIndex <= devIndex) {
        line.textContent = visible;
      } else {
        const before = visible.slice(0, devIndex);
        const dev = visible.slice(devIndex);
        line.innerHTML = `${before}<span class="dev-word">${dev}</span>`;
      }
    };

    const step = () => {
      const full = roles[roleIndex];

      if (phase === "typing") {
        if (charIndex < full.length) {
          charIndex++;
          render();
          return setTimeout(step, typeSpeed);
        }
        phase = "hold";
        return setTimeout(step, holdTime);
      }

      if (phase === "hold") {
        phase = "erasing";
        return setTimeout(step, 200);
      }

      if (phase === "erasing") {
        if (charIndex > 0) {
          charIndex--;
          render();
          return setTimeout(step, eraseSpeed);
        }
        roleIndex = (roleIndex + 1) % roles.length;
        phase = "typing";
        return setTimeout(step, 250);
      }
    };

    render();
    step();
  }



  /* ------------------ SKILL BARS ------------------ */

  const skillRows = document.querySelectorAll(".skill-row");

  if (skillRows.length) {

    const animateSkill = (row) => {

      const progress = row.querySelector(".skill-progress");
      const percent = row.querySelector(".skill-percent");
      const srText = row.querySelector(".sr-only");
      const target = parseInt(row.dataset.target || "0", 10);

      const duration = 1200;
      const start = performance.now();

      const frame = (now) => {

        const elapsed = now - start;
        const t = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);

        const current = Math.round(target * eased);

        progress.style.setProperty("--val", current);
        progress.setAttribute("aria-valuenow", current);

        percent.textContent = current + "%";
        if (srText) srText.textContent = current + "% proficiency";

        if (t < 1) requestAnimationFrame(frame);
      };

      requestAnimationFrame(frame);
    };


    const observer = new IntersectionObserver((entries, obs) => {

      entries.forEach((entry) => {

        if (!entry.isIntersecting) return;

        const row = entry.target;

        if (row.dataset.animated === "true") return;

        row.dataset.animated = "true";

        animateSkill(row);

        obs.unobserve(row);

      });

    }, { threshold: 0.4 });


    skillRows.forEach(row => observer.observe(row));
  }

})();