class TestimonialWall extends HTMLElement {
  async connectedCallback() {
    const form = this.getAttribute("form");
    const theme = this.getAttribute("theme") || "light";

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/testimonials?form=${form}`
    );
    const { testimonials } = await res.json();

    const container = document.createElement("div");
    container.style.background = theme === "dark" ? "#121212" : "#fff";
    container.style.color = theme === "dark" ? "#fff" : "#000";

    testimonials.forEach((t) => {
      const card = document.createElement("div");
      card.innerHTML = `<strong>${t.name}</strong><p>${t.content}</p>`;
      container.appendChild(card);
    });

    this.innerHTML = "";
    this.appendChild(container);
  }
}

customElements.define("testimonial-wall", TestimonialWall);
