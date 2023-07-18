window.addEventListener("DOMContentLoaded", () => {
    const magnifier = new Magnifier("nav");
  });
  
  class Magnifier {
    private el: Element | null;
    private page: number;
    private pages: number;
  
    constructor(qs: string) {
      this.el = document.querySelector(qs);
      this.page = 1;
      this.pages = 4;
  
      this.init();
    }
  
    private init(): void {
      this.el?.addEventListener("click", this.viewPage.bind(this));
      this.updateGlassPos();
      window.addEventListener("resize", this.updateGlassPos.bind(this));
    }
  
    private setPage(number: number): void {
      this.el?.classList.remove(`nav--on-page${this.page}`);
      this.page = number;
      this.el?.classList.add(`nav--on-page${this.page}`);
    }
  
    private updateGlassPos(): void {
      const glass = this.el?.querySelector(`[data-glass]`);
      const glassRadius = (glass?.offsetWidth || 0) / 2;
  
      for (let p = 1; p <= this.pages; ++p) {
        const glassItem = this.el?.querySelector(`[data-glass-item="${p}"]`);
        const left = (glassItem?.offsetLeft || 0) + (glassItem?.offsetWidth || 0) / 2;
  
        this.el?.style.setProperty(`--pos${p}`, `${left - glassRadius}px`);
      }
    }
  
    private viewPage(e: Event): void {
      e.preventDefault();
      // bubble up to the button
      let parent = e.target as HTMLElement | null;
  
      while (parent && !parent.hasAttribute("data-nav-item")) {
        parent = parent.parentElement;
      }
  
      if (parent) {
        // set the page number
        const pageNumber = +parent.getAttribute("data-nav-item");
  
        if (pageNumber !== this.page) {
          this.setPage(pageNumber);
  
          // move the active state to the clicked item
          const items = document.querySelectorAll("[data-nav-item]");
  
          Array.from(items).forEach((item) => {
            item.removeAttribute("aria-describedby");
          });
  
          parent.setAttribute("aria-describedby", "current");
  
          // something else to trigger here…
        }
      }
    }
  }
  