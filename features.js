const gfName = "MrsRandom";
const gfName2 = "MrsRandom1";
const gfName3 = "MrsRandom2";

export default gfName;
export{gfName2,gfName3};  // only explains export file and every variable is a module which can be exported in main file 

export const  genenratePercent=()=>{
    return` ${Math.floor(Math.random()*100)}%`;
}