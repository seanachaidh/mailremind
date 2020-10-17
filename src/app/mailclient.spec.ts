import { Mailclient } from "./mailclient"

describe("Mailclient", function(){
    var socket: Mailclient;
    beforeAll(() => {
        socket = new Mailclient("smtp://smtp.antagonist.nl");
    });

    it("Should send messages", function() {
        socket.sendMessage("ELHO");
    });

})