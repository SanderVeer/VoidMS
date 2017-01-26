package net.channel.handler;

import client.MapleClient;
import net.AbstractMaplePacketHandler;
import tools.MaplePacketCreator;
import tools.data.input.SeekableLittleEndianAccessor;

public class MesoDropHandler extends AbstractMaplePacketHandler {

    public MesoDropHandler() {
    }

    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        c.getPlayer().resetAfkTime();
        slea.readInt();
        int meso = slea.readInt();
        if (!c.getPlayer().isAlive() || c.getPlayer().getCheatTracker().Spam(500, 2)) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        if (meso <= c.getPlayer().getMeso() && meso >= 10 && meso <= 50000) {
            c.getPlayer().gainMeso(-meso, false, true);
            c.getPlayer().getMap().spawnMesoDrop(meso, meso, c.getPlayer().getPosition(), c.getPlayer(), c.getPlayer(), false);
        } else {
            c.getPlayer().setMeso(0);
            return;
        }
    }
}
