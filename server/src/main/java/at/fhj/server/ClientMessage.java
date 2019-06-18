package at.fhj.server;

class ClientMessage {
    private String username;
    private ActionType action;

    public ClientMessage(String username, ActionType action) {
        this.username = username;
        this.action = action;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public ActionType getAction() {
        return action;
    }

    public void setAction(ActionType action) {
        this.action = action;
    }
}
