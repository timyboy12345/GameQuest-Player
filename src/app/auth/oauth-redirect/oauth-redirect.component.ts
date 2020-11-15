import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {AuthService} from "../../_services/auth.service";

@Component({
  selector: 'app-oauth-redirect',
  templateUrl: './oauth-redirect.component.html',
  styleUrls: ['./oauth-redirect.component.scss']
})
export class OauthRedirectComponent implements OnInit {
  public route: ParamMap;

  constructor(private activatedRoute: ActivatedRoute,
              private httpClient: HttpClient,
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.route = this.activatedRoute.snapshot.queryParamMap;

    const state = this.route.get('state');
    const code = this.route.get('code');

    if (state != localStorage.getItem('oauth_state')) {
      alert(`Codes did not match! (${state} / ${localStorage.getItem('oauth_state')})`);
      return;
    }

    this.authService.getTokenFromAuthorizationCode(code).then(value => {
      this.router.navigate(['/home']);
    })
  }
}
