//module to add to Villains seeder array

const bcrypt = require('bcryptjs');


const hashedPassword = bcrypt.hashSync("Evil00!", 10);


const villains = [

{firstName: "Thanos", userName: "Thanoz", email: "thanos@evilinc.com", hashedPassword: hashedPassword},
{title: "Doctor", firstName: "Octopus", userName: "DoctaOcta", email:"thedoctor@spiderman.com", hashedPassword}
]

const schemes = []

const ploys = []

module.exports = {
    villains
}