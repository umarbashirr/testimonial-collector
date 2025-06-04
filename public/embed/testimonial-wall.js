class TestimonialWall extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const formSlug = this.getAttribute("form");
    const theme = this.getAttribute("theme") || "light";
    const layout = this.getAttribute("layout") || "masonry"; // masonry | grid | list
    const limit = this.getAttribute("limit") || "10";

    const container = document.createElement("div");
    container.className = `testimonial-wall layout-${layout}`;

    try {
      const res = await fetch(
        `${this.dataset.api}/api/testimonials?form=${formSlug}&limit=${limit}`
      );
      const data = await res.json();

      container.innerHTML = data.testimonials
        .map((t) => {
          const stars = Array.from({ length: 5 })
            .map((_, i) =>
              i < (t.rating || 0)
                ? `<span class="star filled">★</span>`
                : `<span class="star">☆</span>`
            )
            .join("");
          const timeAgo = this.formatTimeAgo(t.createdAt);

          return `
          <div class="testimonial-card">
            <div class="testimonial-header">
              <img src="${
                t.avatar ||
                "https://ui-avatars.com/api/?name=" + encodeURIComponent(t.name)
              }" alt="${t.name}" class="avatar" />
              <div class="author-info">
                <div class="name">${t.name}</div>
                <div class="role">${t.role || "Customer"}</div>
              </div>
            </div>
            <div class="testimonial-message">“${t.content}”</div>
            <div class="testimonial-rating">${stars}</div>
            <div class="testimonial-time">${timeAgo}</div>
          </div>
        `;
        })
        .join("");
    } catch (error) {
      container.innerHTML = `<p>Error loading testimonials.</p>`;
      console.error("Error fetching testimonials:", error);
    }

    const style = document.createElement("style");
    style.textContent = `
      .testimonial-wall {
        padding: 2rem;
        background-color: ${theme === "dark" ? "#0e0e0e" : "#fafafa"};
        color: ${theme === "dark" ? "#f5f5f5" : "#111"};
        font-family: "Segoe UI", sans-serif;
        overflow: hidden;
      }

      /* Layout: Masonry */
      .layout-masonry {
        column-count: 1;
        column-gap: 1.5rem;
        justify-items: center;
      }

      @media (min-width: 600px) {
        .layout-masonry {
          column-count: 2;
        }
        .layout-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      @media (min-width: 900px) {
        .layout-masonry {
          column-count: 3;
        }
        .layout-grid {
          grid-template-columns: repeat(3, 1fr);
        }
      }

      /* Layout: Grid */
      .layout-grid {
        display: grid;
        gap: 1.5rem;
      }

      /* Layout: List */
      .layout-list {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }

      /* Card Styles */
      .testimonial-card {
        background: ${theme === "dark" ? "#181818" : "#fff"};
        border-radius: 16px;
        padding: 1.5rem;
        margin-bottom: 1.5rem;
        display: inline-block;
        width: 100%;
        box-sizing: border-box;
        box-shadow: 0 8px 24px rgba(0,0,0,0.08);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }

      .testimonial-card:hover {
        transform: translateY(-6px);
        box-shadow: 0 12px 28px rgba(0,0,0,0.12);
      }

      .testimonial-header {
        display: flex;
        align-items: center;
        margin-bottom: 1rem;
      }

      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        object-fit: cover;
        margin-right: 0.85rem;
        border: 2px solid ${theme === "dark" ? "#333" : "#eee"};
        box-shadow: 0 0 0 2px ${theme === "dark" ? "#444" : "#ccc"};
      }

      .author-info .name {
        font-weight: 600;
        font-size: 1.05rem;
      }

      .author-info .role {
        font-size: 0.85rem;
        color: ${theme === "dark" ? "#aaa" : "#777"};
      }

      .testimonial-message {
        font-size: 0.95rem;
        margin: 0.75rem 0 0.5rem;
        line-height: 1.6;
      }

      .testimonial-rating {
        margin-top: 0.5rem;
        font-size: 1rem;
        color: ${theme === "dark" ? "#facc15" : "#f59e0b"};
      }

      .star {
        margin-right: 2px;
        opacity: 0.4;
      }

      .star.filled {
        opacity: 1;
      }

      .testimonial-time {
        font-size: 0.75rem;
        color: ${theme === "dark" ? "#777" : "#999"};
        text-align: right;
        margin-top: 0.75rem;
      }
    `;

    this.shadowRoot.append(style, container);
  }

  formatTimeAgo(isoDate) {
    if (!isoDate) return "";
    const date = new Date(isoDate);
    const seconds = Math.floor((new Date() - date) / 1000);
    const intervals = [
      { label: "year", seconds: 31536000 },
      { label: "month", seconds: 2592000 },
      { label: "week", seconds: 604800 },
      { label: "day", seconds: 86400 },
      { label: "hour", seconds: 3600 },
      { label: "minute", seconds: 60 },
      { label: "second", seconds: 1 },
    ];

    for (const interval of intervals) {
      const count = Math.floor(seconds / interval.seconds);
      if (count > 0)
        return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
    }
    return "Just now";
  }
}

customElements.define("testimonial-wall", TestimonialWall);
