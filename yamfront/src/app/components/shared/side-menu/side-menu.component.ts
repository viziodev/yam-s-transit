import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent  implements OnInit{
  title = 'viziostock-front';

  ngOnInit(): void {
// SHOW MENU
    const showMenu = (toggleId, navbarId, bodyId) => {
      const toggle = document.getElementById(toggleId),
        navbar = document.getElementById(navbarId),
        titleMenu = document.getElementsByClassName('titleMenu'),
        bodypadding = document.getElementById(bodyId);

      if (toggle && navbar) {
        toggle.addEventListener("click", () => {
          // APARECER MENU
          navbar.classList.toggle("shows");
          // @ts-ignore
          for (let titleMenuKey of titleMenu) {
            titleMenuKey.classList.toggle("showing");
          }
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

    linkColor.forEach((l) => l.addEventListener("click", colorLink));
  }

}
