//module to add to Villains seeder array

const bcrypt = require('bcryptjs');


const hashedPassword = bcrypt.hashSync("Evil00!", 10);


const villains = [

{firstName: "Thanos", userName: "Thanoz", email: "thanos@evilinc.com", hashedPassword: hashedPassword},
{title: "Doctor", firstName: "Octopus", userName: "DoctaOcta", email:"thedoctor@spiderman.com", hashedPassword},
{firstName: "Lex", lastName: "Luthor", userName: "LexWillDominate", email:"lex@supermanstinks.com", hashedPassword},
{firstName: "The Joker", userName: "theJoker", email:"thejoker@lotsoflaughs.com", hashedPassword},
{firstName: "Loki", userName: "LokiGod", email:"loki@IhateThor.com", hashedPassword},

]

const schemes = [
    {name:"Operation Destroy Spiderman", villainId: 2},
    {name:"Destroy the Avengers", villainId: 1}
]

const ploys = [
    {name: "Find spiderman's location", dueAt: '2022-01-01', schemeId: 1, },
    {name: "Gather energy on Titan", schemeId: 2}
]

module.exports = {
    villains,
    schemes,
    ploys
}