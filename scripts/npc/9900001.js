/*
*
* NimaKIN - v.61 Female Support
*
*/
var status = 0;
var beauty = 0;
var haircolor = Array();
var skin = Array(0, 1, 2, 3, 4, 9);
var hair = Array(31000, 31010, 31020, 31030, 31040, 31050, 31060, 31070, 31080, 31090, 31100, 31110, 31120, 31130, 31140, 31150, 31160, 31170, 31180, 31190, 31200, 31210, 31220, 31230, 31240, 31250, 31260, 31270, 31280, 31290, 31300, 31310, 31320, 31330, 31340, 31350, 31400, 31410, 31420, 31440, 31450, 31460, 31470, 31480, 31490, 31510, 31520, 31530, 31540, 31550, 31560, 31570, 31580, 31590, 31600, 31610, 31620, 31630, 31640, 31650, 31670, 31680, 31690, 31700, 31710, 31720, 31730, 31740, 31750, 31760, 31770, 31780, 31790, 31800, 31810);
var newhair = Array(30830, 30860, 30870, 30880, 30890, 30900, 30910, 30920, 30930, 30950, 30940, 31780, 31810, 31820, 31830, 31840, 31850, 31860, 31870, 31880, 31890, 31900, 31910, 31920, 31930, 31940, 31950, 31970, 31990, 32030, 32040, 32050, 32070, 32080, 32090, 32100, 32110, 33030, 33060, 33070, 33080, 33090, 33110, 33120, 33130, 33170, 33190, 33210, 33240, 33260, 33290, 33310, 33330, 34020, 33220, 34030, 34040, 34070, 34080, 34090, 34100, 34110, 34120, 34130, 34140, 34160, 34170, 34180, 34190, 34210, 34220, 34280, 34300, 34240, 34250, 34260);
var hairnew = Array();
var face = Array(21000, 21001, 21002, 21003, 21004, 21005, 21006, 21007, 21008, 21009, 21010, 21011, 21012, 21013, 21014, 21016, 21017, 21018, 21019, 21020, 21021, 21022, 21024, 21025, 20033, 20035, 20038);
var facenew = Array();
var colors = Array();

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            cm.sendSimple("Hey there, I can change your look. What would you like to change?\r\n#L0#Skin#l\r\n#L1#Hair#l\r\n#L100#Custom Hairs#l\r\n#L2#Hair Color#l\r\n#L3#Eye#l\r\n#L4#Eye Color#l");
        } else if (status == 1) {
            if (selection == 0) {
                beauty = 1;
                cm.sendStyle("Pick one?", skin);
            } else if (selection == 1) {
                beauty = 2;
                hairnew = Array();
                for(var i = 0; i < hair.length; i++) {
                    hairnew.push(hair[i] + parseInt(cm.getPlayer().getHair() % 10));
                }
                cm.sendStyle("Pick one?", hairnew);
            } else if (selection == 100) {
                beauty = 2;
                hairnew = Array();
                for(var i = 0; i < newhair.length; i++) {
                    hairnew.push(newhair[i] + parseInt(cm.getPlayer().getHair() % 10));
                }
                cm.sendStyle("Pick one?", hairnew);
            } else if (selection == 2) {
                beauty = 3;
                haircolor = Array();
                var current = parseInt(cm.getPlayer().getHair()/10)*10;
                for(var i = 0; i < 8; i++) {
                    haircolor.push(current + i);
                }
                cm.sendStyle("Pick one?", haircolor);
            } else if (selection == 3) {
                beauty = 4;
                facenew = Array();
                for(var i = 0; i < face.length; i++) {
                    facenew.push(face[i] + cm.getPlayer().getFace() % 1000 - (cm.getPlayer().getFace() % 100));
                }
                cm.sendStyle("Pick one?", facenew);
            } else if (selection == 4) {
                beauty = 5;
                var current = cm.getPlayer().getFace() % 100 + 21000;
                colors = Array();
                colors = Array(current , current + 100, current + 200, current + 300, current +400, current + 500, current + 600, current + 700, current + 800);
                cm.sendStyle("Pick one?", colors);
            }
        }
        else if (status == 2){
            if (beauty == 1){
                cm.setSkin(skin[selection]);
            }
            if (beauty == 2){
                cm.setHair(hairnew[selection]);
            }
            if (beauty == 3){
                cm.setHair(haircolor[selection]);
            }
            if (beauty == 4){
                cm.setFace(facenew[selection]);
            }
            if (beauty == 5){
                cm.setFace(colors[selection]);
            }
            cm.dispose();
        }
    }
}