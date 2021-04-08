//module to add to Villains seeder array

const bcrypt = require('bcryptjs');


const hashedPassword = bcrypt.hashSync("Evil00!", 10);


const villains = [

{ title: "The Mad Titan", firstName: "Thanos", userName: "Thanoz", email: "thanos@evilinc.com", hashedPassword: hashedPassword },
{ title: "Professor", firstName: "Dr. Heinz Doofenshmirtz", lastName: "Doofenshmirtz", userName: "Professor", email:"drHD@supergenius.com", hashedPassword },
{ title: "Prankster", firstName: "The Joker", userName: "theJoker", email: "thejoker@lotsoflaughs.com", hashedPassword },
{ title: "Rightfull Ruler of Asgard", firstName: "Loki", userName: "LokiGod", email: "loki@IhateThor.com", hashedPassword },

]

const schemes = [
    //Thanos
    { name: "Conquer The Univers", villainId: 1 }, // 1
    { name: "Make Amends With My Daughters", villainId: 1 }, // 2
    { name: "Find My Son", villainId: 1 }, // 3
    { name: "Seduce the God of Death", villainId: 1 }, // 4

    //Dr. Heinz Doofenshmirtz
    { name: "The leaky-focet-inator", villainId: 2 }, // 5
    { name: "The ozone-destroy-inator", villainId: 2 }, // 6
    { name: "The cavity-make-inator", villainId: 2 }, // 7

    //The Joker
    { name: "Kill The Batman: Acid bath", villainId: 3 }, // 8
    { name: "Kill The Batman: Giant Hammer", villainId: 3 }, // 9
    { name: "Kill The Batman: Giant Electric Fly Swatter", villainId: 3 }, // 10
    { name: "Kill The Batman: Nuclear Bomb", villainId: 3 }, // 11


]

const ploys = [

    ////////////////
    /////Thanos/////
    ////////////////

    // Thanos: Conquer The Univers # 1
    { name: "Collect the Space Stone", dueAt: '2022-01-01', schemeId: 1, },
    { name: "Collect the Reality Stone", dueAt: '2022-01-11', schemeId: 1, },
    { name: "Collect the Power Stone", dueAt: '2022-02-01', schemeId: 1, },
    { name: "Collect the Mind Stone", dueAt: '2022-02-03', schemeId: 1, },
    { name: "Collect the Time Stone", dueAt: '2022-02-07', schemeId: 1, },
    { name: "Collect the Soul Stone", dueAt: '2022-02-10', schemeId: 1, },
    { name: "Get glove made by dwarfs", dueAt: '2022-03-15', schemeId: 1, },
    { name: "Snap", dueAt: '2022-03-15', schemeId: 1, },


    // Thanos: Make Amends With My Daughters # 2
    { name: "Kill all of thier Ex's", dueAt: '2022-01-01', schemeId: 2, },
    { name: "Let them sit at the foot of my floating chair", dueAt: '2022-01-01', schemeId: 2, },
    { name: "Give Gamora a knife", dueAt: '2022-01-01', schemeId: 2, },

    // Thanos: Find My Son # 3
    { name: "Invade Asgard", dueAt: '2022-01-01', schemeId: 3, },
    { name: "Make amends with Thor", dueAt: '2022-01-01', schemeId: 3, },
    { name: "Ask Thor to ask the bridge guard for help", dueAt: '2022-01-01', schemeId: 3, },
    { name: "The bridge gaurd will see my son, and tell me where he is", dueAt: '2022-01-01', schemeId: 3, },
    { name: "The children of Thanos will hunt him down", dueAt: '2022-01-01', schemeId: 3, },
    { name: "My children will bring him to me", dueAt: '2022-01-01', schemeId: 3, },
    { name: "I will take him to Maury, and wait for the results to come in", dueAt: '2022-01-01', schemeId: 3, },
    { name: "I will accept him as my son", dueAt: '2022-01-01', schemeId: 3, },

    // Thanos: Seduce the God of Death #4
    { name: "Snap away half the Universe", dueAt: '2022-01-01', schemeId: 4, },

    //////////////////
    ///////Dr. D//////
    //////////////////

    // Dr D: The leaky-faucet-inator # 5
    { name: "Draw plans to build a Giant Faucet", dueAt: '2022-01-01', schemeId: 5, },
    { name: "Buy materials to build a Giant Faucet", dueAt: '2022-01-01', schemeId: 5, },
    { name: "Build the Giant Faucet", dueAt: '2022-01-01', schemeId: 5, },
    { name: "Put the Giant Faucet in front of my building", dueAt: '2022-01-01', schemeId: 5, },
    { name: "Calibrate the Giant Faucet to leak", dueAt: '2022-01-01', schemeId: 5, },
    { name: "Enjoy watching people trying to loiter infront of my building get soaked", dueAt: '2022-01-01', schemeId: 5, },

    // Dr D: The ozone-destroy-inator # 6
    { name: "Draw plans to build a Giant Hair Spray Can", dueAt: '2022-01-01', schemeId: 6, },
    { name: "Buy materials to build Giant Hair Spray Can", dueAt: '2022-01-01', schemeId: 6, },
    { name: "Construct Giant Hair Spray Can", dueAt: '2022-01-01', schemeId: 6, },
    { name: "Bring Giant Hair Spray Can Outside", dueAt: '2022-01-01', schemeId: 6, },
    { name: "Spray Giant Hair Spray Can", dueAt: '2022-01-01', schemeId: 6, },
    { name: "Enjoy never freezing in winter again, thanks to CFCs", dueAt: '2022-01-01', schemeId: 6, },

    // Dr D: The cavity-make-inator # 7
    { name: "Draw plans to build a Candy Launching Machine", dueAt: '2022-01-01', schemeId: 7, },
    { name: "Buy material to build Candy Launching Machine", dueAt: '2022-01-01', schemeId: 7, },
    { name: "Construct Candy Launching Machine", dueAt: '2022-01-01', schemeId: 7, },
    { name: "Bring Candy Launching Machine to top of my building", dueAt: '2022-01-01', schemeId: 7, },
    { name: "Launch Candy all over the city, the sticky kind of candy", dueAt: '2022-01-01', schemeId: 7, },
    { name: "Watch kids eat the candy, and get cavities", dueAt: '2022-01-01', schemeId: 7, },

    //////////////////
    ///////Joker//////
    //////////////////

    // Joker: Kill The BatMan: Acid bath # 8
    { name: "Steal a lot of acid from Home-Depot", dueAt: '2022-04-05', schemeId: 8, },
    { name: "Get green light to make acid glow green", dueAt: '2022-04-06', schemeId: 8, },
    { name: "Send a fake distress call to Batman", dueAt: '2022-05-01', schemeId: 8, },
    { name: "Wait for Batman to arrive at warehouse", dueAt: '2022-05-01', schemeId: 8, },
    { name: "Push batman into Giant Acid container", dueAt: '2022-05-01', schemeId: 8, },
    { name: "Celebrate the death of Batman", dueAt: '2022-06-02', schemeId: 8, },

    // Joker: Kill The Batman: Giant Hammer # 9
    { name: "Order a Giant Hammer on Amazon, with 2-day delivery", dueAt: '2022-02-11', schemeId: 9, },
    { name: "Wait for hammer to arrive", dueAt: '2022-02-13', schemeId: 9, },
    { name: "Call amazon to say hammer never arrived, to get refund", dueAt: '2022-02-14', schemeId: 9, },
    { name: "Prepair the now Free Giant Hammer to fall on Batman", dueAt: '2022-02-14', schemeId: 9, },
    { name: "Make a fake distress call to the Batman", dueAt: '2022-02-16', schemeId: 9, },
    { name: "Watch the hammer fall on the Batman", dueAt: '2022-02-17', schemeId: 9, },
    { name: "Celebrate the death of Batman", dueAt: '2022-02-21', schemeId: 9, },

    // Joker: Kill The Batman: Giant Electric Fly Swatter # 10
    { name: "Order a 1000 electric-fly-swatters on Ebay", dueAt: '2022-05-11', schemeId: 10, },
    { name: "Connect all electric-fly-swatters to car battery", dueAt: '2022-03-21', schemeId: 10, },
    { name: "Glue all the electric-fly-swatters together", dueAt: '2022-12-01', schemeId: 10, },
    { name: "When Batman is least expecting, smack him with the Giant Swatter", dueAt: '2022-03-02', schemeId: 10, },
    { name: "Laugh over his toasted electrified body.", dueAt: '2022-09-03', schemeId: 10, },

    // Joker: Kill The Batman: Nuclear Bomb # 11
    { name: "Find a nuclear bomb facility", dueAt: '2022-04-01', schemeId: 11, },

]

module.exports = {
    villains,
    schemes,
    ploys
}