import { GmailForm } from "./dialogs/gmail-form";


function clearCookies() {
    //nog niets
}
describe('#googleLogin', function() {
    
    var fixture: ComponentFixture<GmailForm>;
    
    beforeEach(function() {
        Testbed.configureTestingModule({
            declarations: [GmailForm]
        });
        fixture = Testbed.createComponent(GmailForm);
    });
});
