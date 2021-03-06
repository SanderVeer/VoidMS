/*
@	Author : Raz
@
@	NPC = Violet Balloon
@	Map = Hidden-Street <Stage 9>
@	NPC MapId = 922010900
@	Function = LPQ - 9th Stage
@
*/

importPackage(Packages.server.pq);
importPackage(Packages.client);

var status = 0;
var party;
var preamble;
var gaveItems;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {

         
         if (mode == -1) {
		cm.dispose();//ExitChat
	}else if (mode == 0){
		cm.dispose();//No
	}else{		    //Regular Talk
		if (mode == 1)
			status++;
		else
			status--;
		var eim = cm.getChar().getEventInstance(); 
		var nthtext = "9th";


                 if (status == 0) {
		 party = eim.getPlayers();
                 preamble = eim.getProperty("leader" + nthtext + "preamble");
		 gaveItems = eim.getProperty("leader" + nthtext + "gaveItems");
                        if (preamble == null) {
                                cm.sendNext("Alishar has been spawned, good luck!");
                                cm.spawnMonster(9500172,1500000000, 50, 10000, 1000000, 1, 0, 1, 970, 184);
                                eim.setProperty("leader" + nthtext + "preamble","done");
                                cm.dispose();
                        }else{
		 if(!isLeader()){
		 if(gaveItems == null){
		 cm.sendOk("Please tell your #bParty-Leader#k to come talk to me");
		 cm.dispose();
		 }else{
		 cm.sendOk("Gratz you beat the #bLudibrium-PQ#k!");
		  cm.dispose();
		 }
		}else{
		if(gaveItems == null){
		if(cm.itemQuantity(4001023) >= 1){
		cm.sendOk("Good job! You have collected the #b#t4001023##k");
		cm.removeAll(4001023);

		}else{
                    eim.setProperty("leader" + nthtext + "preamble",null);
		cm.sendOk("Sorry you don't have the #b#t4001023##k");
		cm.dispose();
		}
		}
		}}
		}else if (status == 1){
		cm.sendOk("You have finished the PQ!");
		cm.givePartyExp(85000, eim.getPlayers());
		eim.setProperty("leader" + nthtext + "gaveItems","done");
		}else if (status == 2){
		warpOut(eim);//WarpOut
		cm.dispose();
		}            
          }
     }
     
     
function isLeader(){
if(cm.getParty() == null){
return false;
}else{
return cm.isLeader();
}
}


function warpOut(eim) {
	var map = eim.getMapInstance(922011000);
	var portal = map.getPortal("st00");
	party = eim.getPlayers();
	cm.warpMembers(map, "st00", party);
	cm.getChar().getEventInstance().schedule("startBonus", (1 * 60000));
	cm.getChar().getMap().broadcastMessage(tools.MaplePacketCreator.getClock(60));
}
