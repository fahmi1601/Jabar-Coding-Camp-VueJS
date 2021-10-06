//  Soal 1
const LuasPersegiPanjang = (p, l) => p*l;
const KelPersegiPanjang = (p, l) => 2*(p+l);

console.log(LuasPersegiPanjang(4,8));
console.log(KelPersegiPanjang(4,8));

//  Soal 2
const newFunction = (firstName, lastName) => {
    return {
       firstName: firstName,
       lastName: lastName,
       fullName: () => console.log(firstName + " " + lastName)
    }
}

newFunction("William", "Imoh").fullName();

//  Soal 3
const newObject = {
    firstName: "Muhammad",
    lastName: "Iqbal Mubarok",
    address: "Jalan Ranamanyar",
    hobby: "playing football",
}

const {firstName, lastName, address, hobby} = newObject;
console.log(firstName, lastName, address, hobby);

//  Soal 4
const west = ["Will", "Chris", "Sam", "Holly"];
const east = ["Gill", "Brian", "Noel", "Maggie"];
const combined = [...west, ...east];

console.log(combined);

//  Soal 5
const planet = "earth";
const view = "glass"; 
const after = `Lorem ${view} dolor sit amet, consectur adipiscing elit, ${planet}`;

console.log(after);



