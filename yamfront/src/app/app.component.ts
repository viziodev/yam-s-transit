import {Component, OnInit} from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'viziostock-front';
  expanded: boolean;
  ngOnInit(): void {
    this.expanded=false;
/*// SHOW MENU
    const showMenu = (toggleId, navbarId, bodyId) => {
       const toggle = document.getElementById(toggleId),
        navbar = document.getElementById(navbarId),
         bodypadding = document.getElementById(bodyId);

      if (toggle && navbar) {
        toggle.addEventListener("click", () => {
          // APARECER MENU
          navbar.classList.toggle("shows");

          // ROTATE TOGGLE
          toggle.classList.toggle("rotate");
          // PADDING BODY
          bodypadding.classList.toggle("expander");
        });
      }
    };
    showMenu("nav-toggle", "navbar", "body");

// Change active link when clicked
    const linkColor = document.querySelectorAll(".nav-link");
    function colorLink() {
      linkColor.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");
    }

    linkColor.forEach((l) => l.addEventListener("click", colorLink));*/
  }
  toggleMenu(){
    const toggle = document.getElementById("nav-toggle")
    toggle.click()
      this.expanded=!this.expanded;

  }
}
