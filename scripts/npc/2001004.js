var items = [3990000, 3990001, 3990002, 3990003, 3990004, 3990005, 3990006, 3990007, 3990008, 3990009, 3990010, 3990011,
3990012, 3990013, 3990014, 3990015, 3990016, 3990017, 3990018, 3990019, 3990020, 3990021, 3990022, 3990023, 3991000,
3991001, 3991002, 3991003, 3991004, 3991005, 3991006, 3991007, 3991008, 3991009, 3991010, 3991011, 3991012, 3991013,
3991014, 3991015, 3991016, 3991017, 3991018, 3991019, 3991020, 3991021, 3991022, 3991023, 3991024, 3991025, 3991026,
3991027, 3991028, 3991029, 3991030, 3991031, 3991032, 3991033, 3991034, 3991035, 3991036, 3991037, 3991038, 3991039,
3991040, 3991041, 3991042, 3991043, 3991044, 3991045, 3991046, 3991047, 3991048, 3991049, 3991050, 3991051, 3992000,
3992001, 3992002, 3992003, 3992004, 3992005, 3992006, 3992007, 3992008, 3992009, 3992010, 3992011, 3992012, 3992013,
3992014, 3992015, 3992016, 3992017, 3992018, 3992019, 3992020, 3992021, 3992022, 3992023, 3992024, 3992025, 3992026,
3992027, 3992028, 3992029, 3992030, 3992031, 3992032, 3992033, 3992034, 3992035, 3992036, 3992037, 3992038, 3993000,
3993001, 3994000, 3994001, 3994002, 3994003, 3994004, 3994005, 3994006, 3994007, 3994008, 3994009, 3994010, 3994011,
3994012, 3994013, 3994014, 3994015, 3994017, 3994018, 3994019, 3994020, 3994021, 3994022, 3994023, 3994024,3994086];
var status = 0;
var item;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    selected = selection;
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status >= 0 && mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            cm.sendYesNo("#e Hello #h #, Can you feel the #rChristmas#k spirit in the air!? I sure can. Say... do you feel like decorating a christmas tree with me?");
        } else if (status == 1) {
            var hello = "#eOk, awesome! Pick an item to decorate the tree with:\r\n";
            for (i = 0; i < items.length; i++) {
                hello += "#L" + i + "##i" + items[i] + "#  -  #b#t" + items[i] + "##k\r\n"
            }
            cm.sendSimple(hello);
        } else if (status == 2) {
            item = items[selection];
            cm.sendGetText("#ePlease choose how many of #i" + item + "# you want");
        } else if (status == 3) {
            if (cm.getText() < 51) {
                cm.gainItem(item, cm.getText());
            } else {
                cm.sendOk("#eYou can't get that many of #i" + item + "#.");
            }
            cm.dispose();
        }
    }
}