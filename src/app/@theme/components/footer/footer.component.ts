import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
        Created with ♥ by
        <b>
          <a href="https://w3.ibm.com/bluepages/profile.html?uid=814938744" target="_blank">
            Kiran Chowdhury
           </a>
         </b> 2018
      </span>
    <div class="socials">
    <b><a class="created-by">Follow IBM</a></b>
      <a href="www.facebook.com/ibm" target="_blank" class="ion ion-social-facebook"></a>
      <a href="www.twitter.com/ibm" target="_blank" class="ion ion-social-twitter"></a>
      <a href="www.linkedin.com/company/ibm" target="_blank" class="ion ion-social-linkedin"></a>
    </div>
  `,
})
export class FooterComponent {
}
