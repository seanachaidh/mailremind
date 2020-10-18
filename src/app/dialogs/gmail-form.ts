import { Component } from "@angular/core";
import { GMailClient } from "../mailclient";
import { CookieService } from "ngx-cookie-service";

@Component({
    selector: "gmail-form",
    templateUrl: "./gmail-form.html",
    styleUrls: ["./gmail-form.sass"]
})
export class GmailForm {
    
    private userid: string;
    private token: string;
    private client: GMailClient = null;
    
    isLoggedIn: boolean;
    email: string;
    name: string;
    
    // Is dit wel nodig? 
    private revokeButton: HTMLButtonElement;
    private loginButton: HTMLButtonElement;
    
    private setVars() {
        this.client = new GMailClient(this.userid);
    }
    
    constructor(private cookieService: CookieService) {
        if(cookieService.check('oauthToken')) {
            this.token = cookieService.get('oauthToken');
            this.userid = cookieService.get('userid'); //Mogelijks een bug
            this.setVars();
        } else {
            this.token = '';
            this.email = '';
            this.name = "";
            this.isLoggedIn = false;
        }
        
    }
    
    public onLoginClick(event: Event) {
        
    }
    
    public onRevokeClick(event: Event) {
    }
    
}
