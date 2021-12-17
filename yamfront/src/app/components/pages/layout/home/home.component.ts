import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

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
   // toggle.click()
    this.expanded=!this.expanded;

  }

}
