package at.fhj.game;

import java.util.Comparator;

class PlayerComparator implements Comparator<Player> {
    @Override
    public int compare(Player p1, Player p2) {
        if(p1.getCorrectAnswers() == p2.getCorrectAnswers()) {
            return p1.getUsername().compareTo(p2.getUsername());
        }
        return p2.getCorrectAnswers()-p1.getCorrectAnswers();
    }
}
