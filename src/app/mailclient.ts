import { env } from "./env";

import { formatString } from "./utils";

export class GMailClient {
    apikey: string;
    clientid: string;
    client: gapi.auth2.GoogleAuth;
    isAuthorized: boolean;
    userid: string;
    currentApiRequest: gapi.client.Request<gapi.client.gmail.Message>;

    constructor(userid: string) {
        this.apikey = env["api-key"];
        this.clientid = env["client-id"];
        this.userid = userid
        gapi.client.init({
            apiKey: this.apikey,
            clientId: this.clientid
        }).then(this.onOAuthInit);
    }

    private onOAuthInit() {
        this.client = gapi.auth2.getAuthInstance();
        this.client.isSignedIn.listen(this.onSignedIn);
    }

    private sendAuthorizedApiRequest(request: gapi.client.Request<gapi.client.gmail.Message>) {
        this.currentApiRequest = request;
        if(this.isAuthorized) {
            this.currentApiRequest = null;
        } else {
            this.client.signIn();
        }
    }

    private onSignedIn(signedIn: boolean) {
        if(signedIn) {
            console.log("Successfully signed in");
            this.isAuthorized = true;
            if(this.currentApiRequest) {

            }
        } else {
            this.isAuthorized = false;
        }
    }

    public sendEmail(m: string, to: string) {
        var msg = {
            payload: {
                headers: [
                    {
                        "To": to
                    }
                ],
                mimeType: "text/plain",
                body: {
                    data: btoa(m)
                }
            }
        }
        var request = gapi.client.request({
            "method": "POST",
            "path": formatString("/gmail/v1/users/{userId}/messages/send", {"userId": this.userid}),
            "params": msg
        });
        this.sendAuthorizedApiRequest(request);
    }

}
