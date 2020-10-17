import { GoogleAuth } from 'google-auth-library';
import "gapi.auth2"

export class GMailClient {
    apikey: string;
    clientid: string;
    client: gapi.auth2.GoogleAuth;
    isAuthorized: boolean;

    constructor(apikey: string, clientid: string) {
        this.apikey = apikey;
        this.clientid = clientid
        gapi.client.init({
            apiKey: this.apikey,
            clientId: this.clientid
        }).then(this.onOAuthInit);
    }

    private onOAuthInit() {
        this.client = gapi.auth2.getAuthInstance();
        this.client.isSignedIn.listen(this.onSignedIn);
    }

    private onSignedIn(signedIn: boolean) {

    }

}