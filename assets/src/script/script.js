// Global Variables
/*******************************************************************************************/
const SelectFormation = document.getElementById("SelectFormation"); // Variable Select Input
const formation = document.getElementById("formation");  // Container Of All 11 Player
const GKInputs = document.querySelectorAll(".GK"); // Get The Goal Keeper
const NormalPlayers  = document.querySelectorAll(".NormalPlayer "); // Get All Other Player
const theRange = document.querySelectorAll(".RangInput") // Get All Range Inputs

let AllDataArraysOfEveryPlayer = [] ;/** Array For All Data Of Every Player  **/
let FormAddplayer = document.getElementById("FormAddplayer"); // Form To Add Player
let AddButton = document.getElementById("AddButton"); // The Add Button To Add Players
let allCardsDispo = document.querySelectorAll(".cardIndiv"); // Get All Cards For Next Function 
let buttonsCard = document.querySelectorAll(".cardIndiv button"); // Get Each Button That Contain Card Of Player

let PositionSelect ;
let urlimg;
let playersData ;
let idOfEle;
let isGK;
/*******************************************************************************************/
//****************************************************************************************//
// Execute All Function Before Get Any Resources Files 
document.addEventListener("DOMContentLoaded",()=>{
    CheckLocalStorage()
    FillArray()
})


//--------------------------------------- All PrinciPal Functions ---------------------------------//
/** FN - 1 - Fill Array **/
/** Function For Auto Fill The List Of Players With Localstorage Data **/
function FillArray(){
    let allData = localStorage.getItem("AllPlayersData")
    AllDataArraysOfEveryPlayer = JSON.parse(allData)
}


/** FN - 2 - Change The Formation **/
/** Function For Change The Formation **/
const checkSelect = function (){
    if (SelectFormation.value === "433") {
        formation.classList.replace("formation-442","formation-433")

    }else if (SelectFormation.value === "442") {
        formation.classList.replace("formation-433","formation-442")
    }
}


/** FN - 3 - Change The Player Section **/
/** Function For Change The Player When the User click on The Changment Btn **/
function ChangeThePlayer(){
    document.getElementById("SectionOfChangment").innerHTML =""
    document.getElementById("SectionOfChangment").classList.remove("hidden") // Remove Classe Hidden From The Section Of players Already Exist To Appear

    document.querySelector(".changement").classList.add("hidden") // Add Classe Hidden To Remove The Sub Status Section 
    document.querySelector(".TheCloseChangeExist").style.display = "flex" 

    // Loop for every player on the list of data players
    AllDataArraysOfEveryPlayer.forEach((element) => {
        if (element.Position === PositionSelect) { // Check The Position of every player if its equal to the position that the user check
            if (element.Position != "GK") { // Condition For Check The Position of the player if its a goal keeper or a normal player
                // Normal Player
                document.getElementById("SectionOfChangment").innerHTML += `
                <div onclick="ChangeFromRemp(${element.id})" id="cardChangement${element.id}" class="relative">
                    <button>
                        <div id="Changewith${element.id}"  style="z-index:20; transform: translate(-50%,-50%); top: 50%; left: 50%; background: #000; height:30px; width: 30px; display: flex; justify-content: center; border-radius:50%;" class="ModifSuppChang text-white absolute bg-[black]  w-fit rounded-[5px] flex flex-col gap-6 right-0 translate-x-[40%] float-right">
                            <div class="Change">
                                <i class="fas fa-exchange"></i>
                            </div>
                        </div>
                        <div class="BadgeCover">
                            <img class="w-[140px]" style=" height:100%;" src="${element.CardCover}" alt="">
                        </div>    
                        <div style="justify-self: center;height: 93px;overflow: hidden;top: 43px;" class="flex justify-center w-[-webkit-fill-available] informationsBadges absolute top-0 right-0">
                            <div class="image relative  flex justify-center self-center w-[100%]  ">
                                <img class="w-[75%] " src="${element.ImageUrl}" alt="">
                            </div>
                        </div>   
                        <div class=" Info absolute top-0 w-[100%] flex flex-col text-[#ffd972]  h-[100%]">
                            <div class="absolute top-[3.5rem] left-7  text-4xl font-bold">
                                <p>${element.rating}</p>
                                <p class="text-xl mt-[-5px]  text-center">${element.Position}</p>
                            </div>
                            <p class=" font-bold text-[15px] text-center absolute w-[100%] top-[9.8rem]">${element.Name}</p>
                            <div class="criticalCard flex absolute w-[100%] left-0 bottom-[2.8rem] text-[8px] text-[#ffd972] justify-center gap-1 ">
                                <div class="flex flex-col items-center">
                                    <p>Pac</p>
                                    <p class="font-semibold">${element.pace}</p>
                                </div>
                                <div class="flex flex-col items-center">
                                    <p>Sho</p>
                                    <p class="font-semibold">${element.shooting}</p>
                                </div>
                                <div class="flex flex-col items-center">
                                    <p>Pas</p>
                                    <p class="font-semibold">${element.passing}</p>
                                </div>
                                <div class="flex flex-col items-center">
                                    <p>Dri</p>
                                    <p class="font-semibold">${element.dribbling}</p>
                                </div>
                                <div class="flex flex-col items-center">
                                    <p>Def</p>
                                    <p class="font-semibold">${element.defending}</p>
                                </div>
                                <div class="flex flex-col items-center">
                                    <p>Phy</p>
                                    <p class="font-semibold">${element.physical}</p>
                                </div>
                            </div>
                            <div style="width: 14px;right: 0;display: flex;flex-direction: column;justify-content: center;align-items: center;position: absolute;top: 54px;left: 76%;" class=" flags flex h-[10px] gap-3 my-1 justify-center absolute right-0 left-0 bottom-7">
                                <div class="country flex items-center">
                                    <img class="h-[80%]" src="${element.NationalFlag}" alt="">
                                </div>
                                <div class="club">
                                    <img class="h-[100%]" src="${element.LogoUrl}" alt="">
                                </div>
                            </div>
                        </div>
                    </button>
                </div>`
            }else{
                // Goal Keeper Player
                document.getElementById("SectionOfChangment").innerHTML += `
                <div id="cardChangement${element.id}" class="relative">
                    <button>
                        <div style="z-index:20; transform: translate(-50%,-50%); top: 50%; left: 50%; background: #000; height:30px; width: 30px; display: flex; justify-content: center; border-radius:50%;" class="ModifSuppChang text-white absolute bg-[black]  w-fit rounded-[5px] flex flex-col gap-6 right-0 translate-x-[40%] float-right">
                            <div class="Change">
                                <i class="fas fa-exchange"></i>
                            </div>
                        </div>
                        <div class="BadgeCover">
                            <img class="w-[140px]" style=" height:100%;" src="${element.CardCover}" alt="">
                        </div>    
                        <div style="justify-self: center;height: 93px;overflow: hidden;top: 43px;" class="flex justify-center w-[-webkit-fill-available] informationsBadges absolute top-0 right-0">
                            <div  class="image relative flex justify-center self-center w-[78%]  ">
                                <img src="${element.ImageUrl}" alt="">
                            </div>
                        </div>   
                        <div class=" Info absolute top-0 w-[100%] flex flex-col text-[#ffd972]  h-[100%]">
                            <div class="absolute top-[3.5rem] left-7  text-4xl font-bold">
                                <p>${element.rating}</p>
                                <p class="text-xl mt-[-5px]  text-center">${element.Position}</p>
                            </div>
                            <p class=" font-bold text-[15px] text-center absolute w-[100%] top-[9.8rem]">${element.Name}</p>
                            <div class="criticalCard flex absolute w-[100%] left-0 bottom-[2.8rem] text-[8px] text-[#ffd972] justify-center gap-1 ">
                                <div class="flex flex-col items-center">
                                    <p>Div</p>
                                    <p class="font-semibold">${element.diving}</p>
                                </div>
                                <div class="flex flex-col items-center">
                                    <p>Hand</p>
                                    <p class="font-semibold">${element.handling}</p>
                                </div>
                                <div class="flex flex-col items-center">
                                    <p>Kick</p>
                                    <p class="font-semibold">${element.kicking}</p>
                                </div>
                                <div class="flex flex-col items-center">
                                    <p>Ref</p>
                                    <p class="font-semibold">${element.reflexes}</p>
                                </div>
                                <div class="flex flex-col items-center">
                                    <p>Spd</p>
                                    <p class="font-semibold">${element.speed}</p>
                                </div>
                                <div class="flex flex-col items-center">
                                    <p>Pos</p>
                                    <p class="font-semibold">${element.positioning}</p>
                                </div>
                            </div>
                            <div style="width: 14px;right: 0;display: flex;flex-direction: column;justify-content: center;align-items: center;position: absolute;top: 54px;left: 76%;" class=" flags flex h-[10px] gap-3 my-1 justify-center absolute right-0 left-0 bottom-7">
                                <div class="country flex items-center">
                                    <img class="h-[80%]" src="${element.NationalFlag}" alt="">
                                </div>
                                <div class="club">
                                    <img class="h-[100%]" src="${element.LogoUrl}" alt="">
                                </div>
                            </div>
                        </div>
                    </button>
                </div>`
}}})}


/** FN - 4 - Check Local Storage **/
/** Function That Check if there is a localstorage Data Exist if not this condition will create it **/
function CheckLocalStorage(){
//****************** Condition For The LocalStorage Data **********************/
// Condition for fill data of local storage if its not exist  
if (!localStorage.getItem("AllPlayersData")) {
    localStorage.setItem("AllPlayersData", 
`
[{"id":0,"CardCover":"https://cdn3.futbin.com/content/fifa25/img/cards/hd/50_ucl_rttk.png?fm=png&amp;ixlib=java-2.1.0&amp;w=644&amp;s=7becb988086ba151303da4d5bead8e12","Name":"Lionel Messi","ImageUrl":"https://cdn.sofifa.net/players/158/023/25_120.png","Position":"RW","Nationality":"Argentina","NationalFlag":"https://cdn.sofifa.net/flags/ar.png","Club":"Inter Miami","LogoUrlUrl":"https://cdn.sofifa.net/meta/team/239235/120.png","rating":93,"pace":85,"shooting":92,"passing":91,"dribbling":95,"defending":35,"physical":65},{"id":1,"CardCover":"https://cdn3.futbin.com/content/fifa25/img/cards/hd/50_ucl_rttk.png?fm=png&amp;ixlib=java-2.1.0&amp;w=644&amp;s=7becb988086ba151303da4d5bead8e12","Name":"Cristiano Ronaldo","ImageUrl":"https://cdn.sofifa.net/players/020/801/25_120.png","Position":"ST","Nationality":"Portugal","NationalFlag":"https://cdn.sofifa.net/flags/pt.png","Club":"Al Nassr","LogoUrl":"https://cdn.sofifa.net/meta/team/2506/120.png","rating":91,"pace":84,"shooting":94,"passing":82,"dribbling":87,"defending":34,"physical":77},{"id":2,"CardCover":"https://cdn3.futbin.com/content/fifa25/img/cards/hd/50_ucl_rttk.png?fm=png&amp;ixlib=java-2.1.0&amp;w=644&amp;s=7becb988086ba151303da4d5bead8e12","Name":"Kevin De Bruyne","ImageUrl":"https://cdn.sofifa.net/players/192/985/25_120.png","Position":"CM","Nationality":"Belgium","NationalFlag":"https://cdn.sofifa.net/flags/be.png","Club":"Manchester City","LogoUrl":"https://cdn.sofifa.net/players/239/085/25_120.png","rating":91,"pace":74,"shooting":86,"passing":93,"dribbling":88,"defending":64,"physical":78},{"id":3,"CardCover":"https://cdn3.futbin.com/content/fifa25/img/cards/hd/50_ucl_rttk.png?fm=png&amp;ixlib=java-2.1.0&amp;w=644&amp;s=7becb988086ba151303da4d5bead8e12","Name":"Kylian Mbappé","ImageUrl":"https://cdn.sofifa.net/players/231/747/25_120.png","Position":"ST","Nationality":"France","NationalFlag":"https://cdn.sofifa.net/flags/fr.png","Club":"Real Madrid","LogoUrl":"https://cdn.sofifa.net/meta/team/3468/120.png","rating":92,"pace":97,"shooting":89,"passing":80,"dribbling":92,"defending":39,"physical":77},{"id":4,"CardCover":"https://cdn3.futbin.com/content/fifa25/img/cards/hd/50_ucl_rttk.png?fm=png&amp;ixlib=java-2.1.0&amp;w=644&amp;s=7becb988086ba151303da4d5bead8e12","Name":"Virgil van Dijk","ImageUrl":"https://cdn.sofifa.net/players/203/376/25_120.png","Position":"CB","Nationality":"Netherlands","NationalFlag":"https://cdn.sofifa.net/flags/nl.png","Club":"Liverpool","LogoUrl":"https://cdn.sofifa.net/meta/team/8/120.png","rating":90,"pace":75,"shooting":60,"passing":70,"dribbling":72,"defending":92,"physical":86},{"id":5,"CardCover":"https://cdn3.futbin.com/content/fifa25/img/cards/hd/50_ucl_rttk.png?fm=png&amp;ixlib=java-2.1.0&amp;w=644&amp;s=7becb988086ba151303da4d5bead8e12","Name":"Antonio Rudiger","ImageUrl":"https://cdn.sofifa.net/players/205/452/25_120.png","Position":"CB","Nationality":"Germany","NationalFlag":"https://cdn.sofifa.net/flags/de.png","Club":"Real Madrid","LogoUrl":"https://cdn.sofifa.net/meta/team/3468/120.png","rating":88,"pace":82,"shooting":55,"passing":73,"dribbling":70,"defending":86,"physical":86},{"id":6,"CardCover":"https://cdn3.futbin.com/content/fifa25/img/cards/hd/50_ucl_rttk.png?fm=png&amp;ixlib=java-2.1.0&amp;w=644&amp;s=7becb988086ba151303da4d5bead8e12","Name":"Neymar Jr","ImageUrl":"https://cdn.sofifa.net/players/190/871/25_120.png","Position":"LW","Nationality":"Brazil","NationalFlag":"https://cdn.sofifa.net/flags/br.png","Club":"Al-Hilal","LogoUrl":"https://cdn.sofifa.net/meta/team/7011/120.png","rating":90,"pace":91,"shooting":83,"passing":86,"dribbling":94,"defending":37,"physical":61},{"id":7,"CardCover":"https://cdn3.futbin.com/content/fifa25/img/cards/hd/50_ucl_rttk.png?fm=png&amp;ixlib=java-2.1.0&amp;w=644&amp;s=7becb988086ba151303da4d5bead8e12","Name":"Mohamed Salah","ImageUrl":"https://cdn.sofifa.net/players/192/985/25_120.png","Position":"RW","Nationality":"Egypt","NationalFlag":"https://cdn.sofifa.net/flags/eg.png","Club":"Liverpool","LogoUrl":"https://cdn.sofifa.net/meta/team/8/120.png","rating":89,"pace":93,"shooting":87,"passing":81,"dribbling":90,"defending":45,"physical":75},{"id":8,"CardCover":"https://cdn3.futbin.com/content/fifa25/img/cards/hd/50_ucl_rttk.png?fm=png&amp;ixlib=java-2.1.0&amp;w=644&amp;s=7becb988086ba151303da4d5bead8e12","Name":"Joshua Kimmich","ImageUrl":"https://cdn.sofifa.net/players/212/622/25_120.png","Position":"CM","Nationality":"Germany","NationalFlag":"https://cdn.sofifa.net/flags/de.png","Club":"Bayern Munich","LogoUrl":"https://cdn.sofifa.net/meta/team/503/120.png","rating":89,"pace":70,"shooting":75,"passing":88,"dribbling":84,"defending":84,"physical":81},{"id":9,"CardCover":"https://cdn3.futbin.com/content/fifa25/img/cards/hd/50_ucl_rttk.png?fm=png&amp;ixlib=java-2.1.0&amp;w=644&amp;s=7becb988086ba151303da4d5bead8e12","Name":"Jan Oblak","ImageUrl":"https://cdn.sofifa.net/players/200/389/25_120.png","Position":"GK","Nationality":"Slovenia","NationalFlag":"https://cdn.sofifa.net/flags/si.png","Club":"Atletico Madrid","LogoUrl":"https://cdn.sofifa.net/meta/team/7980/120.png","rating":91,"diving":89,"handling":90,"kicking":78,"reflexes":92,"speed":50,"Positioning":88},{"id":10,"CardCover":"https://cdn3.futbin.com/content/fifa25/img/cards/hd/50_ucl_rttk.png?fm=png&amp;ixlib=java-2.1.0&amp;w=644&amp;s=7becb988086ba151303da4d5bead8e12","Name":"Luka Modrić","ImageUrl":"https://cdn.sofifa.net/players/177/003/25_120.png","Position":"CM","Nationality":"Croatia","NationalFlag":"https://cdn.sofifa.net/flags/hr.png","Club":"Real Madrid","LogoUrl":"https://cdn.sofifa.net/meta/team/3468/120.png","rating":88,"pace":74,"shooting":78,"passing":89,"dribbling":90,"defending":72,"physical":65},{"id":11,"CardCover":"https://cdn3.futbin.com/content/fifa25/img/cards/hd/50_ucl_rttk.png?fm=png&amp;ixlib=java-2.1.0&amp;w=644&amp;s=7becb988086ba151303da4d5bead8e12","Name":"Vinicius Junior","ImageUrl":"https://cdn.sofifa.net/players/238/794/25_120.png","Position":"LW","Nationality":"Brazil","NationalFlag":"https://cdn.sofifa.net/flags/br.png","Club":"Real Madrid","LogoUrl":"https://cdn.sofifa.net/meta/team/3468/120.png","rating":89,"pace":91,"shooting":88,"passing":85,"dribbling":94,"defending":39,"physical":61},{"id":12,"CardCover":"https://cdn3.futbin.com/content/fifa25/img/cards/hd/50_ucl_rttk.png?fm=png&amp;ixlib=java-2.1.0&amp;w=644&amp;s=7becb988086ba151303da4d5bead8e12","Name":"Brahim Diáz","ImageUrl":"https://cdn.sofifa.net/players/231/410/25_120.png","Position":"LW","Nationality":"Morocco","NationalFlag":"https://cdn.sofifa.net/flags/ma.png","Club":"Real Madrid","LogoUrl":"https://cdn.sofifa.net/meta/team/3468/120.png","rating":82,"pace":85,"shooting":74,"passing":78,"dribbling":85,"defending":31,"physical":56},{"id":13,"CardCover":"https://cdn3.futbin.com/content/fifa25/img/cards/hd/50_ucl_rttk.png?fm=png&amp;ixlib=java-2.1.0&amp;w=644&amp;s=7becb988086ba151303da4d5bead8e12","Name":"Karim Benzema","ImageUrl":"https://cdn.sofifa.net/players/165/153/25_120.png","Position":"ST","Nationality":"France","NationalFlag":"https://cdn.sofifa.net/flags/fr.png","Club":"Al-Ittihad","LogoUrl":"https://cdn.sofifa.net/meta/team/476/120.png","rating":90,"pace":77,"shooting":90,"passing":83,"dribbling":88,"defending":40,"physical":78},{"id":14,"CardCover":"https://cdn3.futbin.com/content/fifa25/img/cards/hd/50_ucl_rttk.png?fm=png&amp;ixlib=java-2.1.0&amp;w=644&amp;s=7becb988086ba151303da4d5bead8e12","Name":"Erling Haaland","ImageUrl":"https://cdn.sofifa.net/players/239/085/25_120.png","Position":"ST","Nationality":"Norway","NationalFlag":"https://cdn.sofifa.net/flags/no.png","Club":"Manchester City","LogoUrl":"https://cdn.sofifa.net/players/239/085/25_120.png","rating":91,"pace":89,"shooting":94,"passing":65,"dribbling":80,"defending":45,"physical":88},{"id":15,"CardCover":"https://cdn3.futbin.com/content/fifa25/img/cards/hd/50_ucl_rttk.png?fm=png&amp;ixlib=java-2.1.0&amp;w=644&amp;s=7becb988086ba151303da4d5bead8e12","Name":"N'Golo Kanté","ImageUrl":"https://cdn.sofifa.net/players/215/914/25_120.png","Position":"CDM","Nationality":"France","NationalFlag":"https://cdn.sofifa.net/flags/fr.png","Club":"Al-Ittihad","LogoUrl":"https://cdn.sofifa.net/meta/team/476/120.png","rating":87,"pace":77,"shooting":66,"passing":75,"dribbling":82,"defending":88,"physical":82},{"id":16,"CardCover":"https://cdn3.futbin.com/content/fifa25/img/cards/hd/50_ucl_rttk.png?fm=png&amp;ixlib=java-2.1.0&amp;w=644&amp;s=7becb988086ba151303da4d5bead8e12","Name":"Alphonso Davies","ImageUrl":"https://cdn.sofifa.net/players/234/396/25_120.png","Position":"LB","Nationality":"Canada","NationalFlag":"https://cdn.sofifa.net/flags/ca.png","Club":"Bayern Munich","LogoUrl":"https://cdn.sofifa.net/meta/team/503/120.png","rating":84,"pace":96,"shooting":68,"passing":77,"dribbling":82,"defending":76,"physical":77},{"id":17,"CardCover":"https://cdn3.futbin.com/content/fifa25/img/cards/hd/50_ucl_rttk.png?fm=png&amp;ixlib=java-2.1.0&amp;w=644&amp;s=7becb988086ba151303da4d5bead8e12","Name":"Yassine Bounou","ImageUrl":"https://cdn.sofifa.net/players/209/981/25_120.png","Position":"GK","Nationality":"Morocco","NationalFlag":"https://cdn.sofifa.net/flags/ma.png","Club":"Al-Hilal","LogoUrl":"https://cdn.sofifa.net/meta/team/7011/120.png","rating":84,"diving":81,"handling":82,"kicking":77,"reflexes":86,"speed":38,"Positioning":83},{"id":18,"CardCover":"https://cdn3.futbin.com/content/fifa25/img/cards/hd/50_ucl_rttk.png?fm=png&amp;ixlib=java-2.1.0&amp;w=644&amp;s=7becb988086ba151303da4d5bead8e12","Name":"Bruno Fernandes","ImageUrl":"https://cdn.sofifa.net/players/212/198/25_120.png","Position":"CM","Nationality":"Portugal","NationalFlag":"https://cdn.sofifa.net/flags/pt.png","Club":"Manchester United","LogoUrl":"https://cdn.sofifa.net/meta/team/14/120.png","rating":88,"pace":75,"shooting":85,"passing":89,"dribbling":84,"defending":69,"physical":77},{"id":19,"CardCover":"https://cdn3.futbin.com/content/fifa25/img/cards/hd/50_ucl_rttk.png?fm=png&amp;ixlib=java-2.1.0&amp;w=644&amp;s=7becb988086ba151303da4d5bead8e12","Name":"Jadon Sancho","ImageUrl":"https://cdn.sofifa.net/players/233/049/25_120.png","Position":"LW","Nationality":"England","NationalFlag":"https://cdn.sofifa.net/flags/gb-eng.png","Club":"Manchester United","LogoUrl":"https://cdn.sofifa.net/meta/team/14/120.png","rating":84,"pace":85,"shooting":74,"passing":78,"dribbling":88,"defending":34,"physical":63},{"id":20,"CardCover":"https://cdn3.futbin.com/content/fifa25/img/cards/hd/50_ucl_rttk.png?fm=png&amp;ixlib=java-2.1.0&amp;w=644&amp;s=7becb988086ba151303da4d5bead8e12","Name":"Trent Alexander-Arnold","ImageUrl":"https://cdn.sofifa.net/players/231/281/25_120.png","Position":"RB","Nationality":"England","NationalFlag":"https://cdn.sofifa.net/flags/gb-eng.png","Club":"Liverpool","rating":87,"pace":76,"shooting":66,"passing":89,"dribbling":80,"defending":79,"physical":71},{"id":21,"CardCover":"https://cdn3.futbin.com/content/fifa25/img/cards/hd/50_ucl_rttk.png?fm=png&amp;ixlib=java-2.1.0&amp;w=644&amp;s=7becb988086ba151303da4d5bead8e12","Name":"Achraf Hakimi","ImageUrl":"https://cdn.sofifa.net/players/235/212/25_120.png","Position":"RB","Nationality":"Morocco","NationalFlag":"https://cdn.sofifa.net/flags/ma.png","Club":"Paris Saint-Germain","LogoUrl":"https://cdn.sofifa.net/meta/team/591/120.png","rating":84,"pace":91,"shooting":76,"passing":80,"dribbling":80,"defending":75,"physical":78},{"id":22,"CardCover":"https://cdn3.futbin.com/content/fifa25/img/cards/hd/50_ucl_rttk.png?fm=png&amp;ixlib=java-2.1.0&amp;w=644&amp;s=7becb988086ba151303da4d5bead8e12","Name":"Youssef En-Nesyri","ImageUrl":"https://cdn.sofifa.net/players/235/410/25_120.png","Position":"ST","Nationality":"Morocco","NationalFlag":"https://cdn.sofifa.net/flags/ma.png","Club":"Fenerbahçe","LogoUrl":"https://cdn.sofifa.net/meta/team/88/120.png","rating":83,"pace":82,"shooting":82,"passing":63,"dribbling":77,"defending":36,"physical":80},{"id":23,"CardCover":"https://cdn3.futbin.com/content/fifa25/img/cards/hd/50_ucl_rttk.png?fm=png&amp;ixlib=java-2.1.0&amp;w=644&amp;s=7becb988086ba151303da4d5bead8e12","Name":"Noussair Mazraoui","ImageUrl":"https://cdn.sofifa.net/players/236/401/25_120.png","Position":"LB","Nationality":"Morocco","NationalFlag":"https://cdn.sofifa.net/flags/ma.png","Club":"Manchester United","LogoUrl":"https://cdn.sofifa.net/meta/team/14/120.png","rating":81,"pace":78,"shooting":66,"passing":77,"dribbling":83,"defending":77,"physical":71},{"id":24,"CardCover":"https://cdn3.futbin.com/content/fifa25/img/cards/hd/50_ucl_rttk.png?fm=png&amp;ixlib=java-2.1.0&amp;w=644&amp;s=7becb988086ba151303da4d5bead8e12","Name":"Ismael Saibari","ImageUrl":"https://cdn.sofifa.net/players/259/480/25_120.png","Position":"CM","Nationality":"Morocco","NationalFlag":"https://cdn.sofifa.net/flags/ma.png","Club":"PSV","LogoUrl":"https://cdn.sofifa.net/meta/team/682/120.png","rating":83,"pace":89,"shooting":78,"passing":80,"dribbling":86,"defending":55,"physical":84},{"id":25,"CardCover":"https://cdn3.futbin.com/content/fifa25/img/cards/hd/50_ucl_rttk.png?fm=png&amp;ixlib=java-2.1.0&amp;w=644&amp;s=7becb988086ba151303da4d5bead8e12","Name":"Gianluigi Donnarumma","ImageUrl":"https://cdn.sofifa.net/players/230/621/25_120.png","Position":"GK","Nationality":"Italy","NationalFlag":"https://cdn.sofifa.net/flags/it.png","Club":"Paris Saint-Germain","LogoUrl":"https://cdn.sofifa.net/meta/team/591/120.png","rating":89,"diving":88,"handling":84,"kicking":75,"reflexes":90,"speed":50,"Positioning":85}]
`)
}
// Condition for set an initial id if its not exist  
if (!localStorage.getItem("PlayerId")) {
    localStorage.setItem("PlayerId", 25)
}
}


/** FN - 5 - Remove Player **/
/** Function For Remove The Player From The Stad When the user click on The Delete Btn**/ 
function supprime(id , idofCard){
    let CardParDefault = document.getElementById(idofCard).querySelector(" button .CardParDefault")
    let cardPlayerOfficiale = document.getElementById(idofCard).querySelector(" button .cardPlayerOfficiale")
    CardParDefault.classList.remove("hidden")
    cardPlayerOfficiale.innerHTML =""
}


/** FN - 6 - Update Player Informations **/
/** Function For Update The Player Data **/ 
function modification(id,idofCard , position) {
            let playerId = id 
            let playerData = AllDataArraysOfEveryPlayer.find(player => player.id === parseInt(playerId));
            let thePosition = playerData
            
            let classIdOffsetPar = "cardClass"+playerId
            let theCardHtml = document.querySelector("."+classIdOffsetPar+" button")
            
            let countryFlagImg = document.getElementById(idofCard).querySelector(".country img").getAttribute("src")
            let clubFlagImg = document.getElementById(idofCard).querySelector(".club img").getAttribute("src")
            let CoverImg = document.getElementById(idofCard).querySelector(".cardPlayerOfficiale .BadgeCover img").getAttribute("src")
            

            console.log(CoverImg)

            // let selectNation = document.getElementById("nations")
            nations.setValue(`${countryFlagImg}`)
            clubs.setValue(`${clubFlagImg}`)
            Cover.setValue(`${CoverImg}`)
            // Cover.setValue(clubFlagImg)

            // console.log(selectNation.value)
            // console.log(clubFlagImg)
            if(position != 'GK'){
                if (playerData) {
                    document.getElementById("name").value = playerData.Name;
                    document.getElementById("Cover").value = playerData.CardCover;
                    document.getElementById("nations").textContent = playerData.Nationality;
                    document.getElementById("nations").value = countryFlagImg;
                    document.getElementById("clubs").textContent = playerData.Club;
                    document.getElementById("clubs").value = clubFlagImg;
                    document.getElementById("NormalPlayerRating").value = playerData.rating;
                    document.getElementById("NormalPlayerPace").value = playerData.pace;
                    document.getElementById("NormalPlayerShooting").value = playerData.shooting;
                    document.getElementById("NormalPlayerPassing").value = playerData.passing;
                    document.getElementById("NormalPlayerDribbling").value = playerData.dribbling;
                    document.getElementById("NormalPlayerDefending").value = playerData.defending;
                    document.getElementById("NormalPlayerPhysical").value = playerData.physical;
    
                    FormAddplayer.classList.remove("hidden");
                    document.getElementById("ModifyButton").addEventListener('click', () => {
                        playerData.Name = document.getElementById("name").value;
                        playerData.CardCover = document.getElementById("Cover").value;
                        playerData.Nationality = document.getElementById("nations").textContent;
                        playerData.NationalityFlag = document.getElementById("nations").value;
                        playerData.Club = document.getElementById("clubs").textContent;
                        playerData.ClubFlag = document.getElementById("clubs").value;
                        playerData.rating = document.getElementById("NormalPlayerRating").value;
                        playerData.pace = document.getElementById("NormalPlayerPace").value;
                        playerData.shooting = document.getElementById("NormalPlayerShooting").value;
                        playerData.passing = document.getElementById("NormalPlayerPassing").value;
                        playerData.dribbling = document.getElementById("NormalPlayerDribbling").value;
                        playerData.defending = document.getElementById("NormalPlayerDefending").value;
                        playerData.physical = document.getElementById("NormalPlayerPhysical").value;
                        
                        localStorage.setItem('AllPlayersData', JSON.stringify(AllDataArraysOfEveryPlayer));
    
    
                        // Operations Just For The Styling
                        FormAddplayer.classList.add("hidden") 
                        document.getElementById("TheEmptyMessage").style.display = "flex"
    
                        let CardParDefault = document.getElementById(idofCard).querySelector(" button .CardParDefault")
                        let cardPlayerOfficiale = document.getElementById(idofCard).querySelector(" button .cardPlayerOfficiale")
                        // Add Player To The Stad 
                        cardPlayerOfficiale.innerHTML = `
                                    <div style="z-index:20;" class="ModifSuppChang text-white absolute bg-[black] p-3 rounded-[5px] flex flex-col gap-6 right-0 translate-x-[40%] float-right">
                                        <div onclick="supprime(${playerData.id},'${idofCard}')" class="Supp">
                                            <i class="fa-solid fa-xmark"></i>
                                        </div>
                                        <div idPlayer="${playerData.id}" onclick="modification(${playerData.id},'${idofCard}')" class="Modif">
                                            <i idPlayer="${playerData.id}"  class="fa-solid fa-pen"></i>
                                        </div>
                                        <div onclick="ChangeThePlayer()" class="Changement">
                                            <i class="fas fa-exchange"></i>
                                        </div>
                                    </div>
                                    <div class="BadgeCover">
                                        <img class="w-[140px]" style=" height:100%;" src="${playerData.CardCover}" alt="">
                                    </div>    
                                    <div style="justify-self: center;height: 93px;overflow: hidden;top: 43px;" class="flex justify-center w-[-webkit-fill-available] informationsBadges absolute top-0 right-0">
                                        <div class="image relative top-8 flex justify-center self-center w-[78%]  ">
                                            <img class="urlImg" src="${playerData.ImageUrl}" alt="">
                                        </div>
                                    </div>   
                                    <div class=" Info absolute top-0 w-[100%] flex flex-col text-[#ffd972]  h-[100%]">
                                        <div class="absolute top-[3.5rem] left-7  text-4xl font-bold">
                                            <p>${playerData.rating}</p>
                                            <p class="positionSelect text-xl mt-[-5px]  text-center">${playerData.Position}</p>
                                        </div>
                                        <p class=" font-bold text-[15px] text-center absolute w-[100%] top-[9.8rem]">${playerData.Name}</p>
                                        <div class="criticalCard flex absolute w-[100%] left-0 bottom-[2.8rem] text-[8px] text-[#ffd972] justify-center gap-1 ">
                                            <div class="flex flex-col items-center">
                                                <p>Pac</p>
                                                <p class="font-semibold">${playerData.pace}</p>
                                            </div>
                                            <div class="flex flex-col items-center">
                                                <p>Sho</p>
                                                <p class="font-semibold">${playerData.shooting}</p>
                                            </div>
                                            <div class="flex flex-col items-center">
                                                <p>Pas</p>
                                                <p class="font-semibold">${playerData.passing}</p>
                                            </div>
                                            <div class="flex flex-col items-center">
                                                <p>Dri</p>
                                                <p class="font-semibold">${playerData.dribbling}</p>
                                            </div>
                                            <div class="flex flex-col items-center">
                                                <p>Def</p>
                                                <p class="font-semibold">${playerData.defending}</p>
                                            </div>
                                            <div class="flex flex-col items-center">
                                                <p>Phy</p>
                                                <p class="font-semibold">${playerData.physical}</p>
                                            </div>
                                        </div>
                                        <div class=" flags flex h-[10px] gap-3 my-1 justify-center absolute right-0 left-0 bottom-7">
                                            <div class="country flex items-center">
                                                <img class="h-[80%]" src="${playerData.NationalityFlag}" alt="">
                                            </div>
                                            <div class="club">
                                                <img class="h-[100%]" src="${playerData.ClubFlag}" alt="">
                                            </div>
                                        </div>
                                        
                                        </div>
                                        <p style="filter:blur(20px); z-index:-1; background: rgba(16, 16, 16, 0.7);border-radius: 50%;width: 60px; box-shadow: 0 0 0 0 rgb(0, 0, 0);transform: scale(1) translate(-50%, -100%);rotate: x 45deg;height: 40px;position: absolute;left: 50%;color: white;" class="bg-red-500 flex justify-center items-center z-[-2] font-bold"></p>    
                        `
                        classIdOffsetPar = ""
                        idofCard =""
                    })
    
    
                }

            }
            else{
                if (playerData) {
                    document.getElementById("name").value = playerData.Name;
                    document.getElementById("Cover").value = playerData.CardCover;
                    document.getElementById("nations").textContent = playerData.Nationality;
                    document.getElementById("nations").value = countryFlagImg;
                    document.getElementById("clubs").textContent = playerData.Club;
                    document.getElementById("clubs").value = clubFlagImg;
                    document.getElementById("GKRating").value = playerData.rating;
                    document.getElementById("GKDiving").value = playerData.diving;
                    document.getElementById("GKHandling").value = playerData.handling;
                    document.getElementById("GKKicking").value = playerData.kicking;
                    document.getElementById("GKReflexes").value = playerData.reflexes;
                    document.getElementById("GKSpeed").value = playerData.speed;
                    document.getElementById("GKPositioning").value = playerData.positioning;
    
                    FormAddplayer.classList.remove("hidden");
                    document.getElementById("ModifyButton").addEventListener('click', () => {
                        playerData.Name = document.getElementById("name").value;
                        playerData.CardCover = document.getElementById("Cover").value;
                        playerData.Nationality = document.getElementById("nations").textContent;
                        playerData.NationalityFlag = document.getElementById("nations").value;
                        playerData.Club = document.getElementById("clubs").textContent;
                        playerData.ClubFlag = document.getElementById("clubs").value;
                        playerData.rating = document.getElementById("GKRating").value;
                        playerData.diving = document.getElementById("GKDiving").value;
                        playerData.handling = document.getElementById("GKHandling").value;
                        playerData.kicking = document.getElementById("GKKicking").value;
                        playerData.reflexes = document.getElementById("GKReflexes").value;
                        playerData.speed = document.getElementById("GKSpeed").value;
                        playerData.positioning = document.getElementById("GKPositioning").value;
                        
                        localStorage.setItem('AllPlayersData', JSON.stringify(AllDataArraysOfEveryPlayer));
    
    
                        // Operations Just For The Styling
                        FormAddplayer.classList.add("hidden") 
                        document.getElementById("TheEmptyMessage").style.display = "flex"
    
                        let CardParDefault = document.getElementById(idofCard).querySelector(" button .CardParDefault")
                        let cardPlayerOfficiale = document.getElementById(idofCard).querySelector(" button .cardPlayerOfficiale")
                        // Add Player To The Stad 
                        cardPlayerOfficiale.innerHTML = `
                                    <div style="z-index:20;" class="ModifSuppChang text-white absolute bg-[black] p-3 rounded-[5px] flex flex-col gap-6 right-0 translate-x-[40%] float-right">
                                        <div onclick="supprime(${playerData.id},'${idofCard}')" class="Supp">
                                            <i class="fa-solid fa-xmark"></i>
                                        </div>
                                        <div idPlayer="${playerData.id}" onclick="modification(${playerData.id},'${idofCard}')" class="Modif">
                                            <i idPlayer="${playerData.id}"  class="fa-solid fa-pen"></i>
                                        </div>
                                        <div onclick="ChangeThePlayer()" class="Changement">
                                            <i class="fas fa-exchange"></i>
                                        </div>
                                    </div>
                                    <div class="BadgeCover">
                                        <img class="w-[140px]" style=" height:100%;" src="${playerData.CardCover}" alt="">
                                    </div>    
                                    <div style="justify-self: center;height: 93px;overflow: hidden;top: 43px;" class="flex justify-center w-[-webkit-fill-available] informationsBadges absolute top-0 right-0">
                                        <div class="image relative top-8 flex justify-center self-center w-[78%]  ">
                                            <img class="urlImg" src="${playerData.ImageUrl}" alt="">
                                        </div>
                                    </div>   
                                    <div class=" Info absolute top-0 w-[100%] flex flex-col text-[#ffd972]  h-[100%]">
                                        <div class="absolute top-[3.5rem] left-7  text-4xl font-bold">
                                            <p>${playerData.rating}</p>
                                            <p class="positionSelect text-xl mt-[-5px]  text-center">${playerData.Position}</p>
                                        </div>
                                        <p class=" font-bold text-[15px] text-center absolute w-[100%] top-[9.8rem]">${playerData.Name}</p>
                                        <div class="criticalCard flex absolute w-[100%] left-0 bottom-[2.8rem] text-[8px] text-[#ffd972] justify-center gap-1 ">
                                            <div class="flex flex-col items-center">
                                                <p>Div</p>
                                                <p class="font-semibold">${playerData.diving}</p>
                                            </div>
                                            <div class="flex flex-col items-center">
                                                <p>Hand</p>
                                                <p class="font-semibold">${playerData.handling}</p>
                                            </div>
                                            <div class="flex flex-col items-center">
                                                <p>Kick</p>
                                                <p class="font-semibold">${playerData.kicking}</p>
                                            </div>
                                            <div class="flex flex-col items-center">
                                                <p>Ref</p>
                                                <p class="font-semibold">${playerData.reflexes}</p>
                                            </div>
                                            <div class="flex flex-col items-center">
                                                <p>Spd</p>
                                                <p class="font-semibold">${playerData.speed}</p>
                                            </div>
                                            <div class="flex flex-col items-center">
                                                <p>Pos</p>
                                                <p class="font-semibold">${playerData.positioning}</p>
                                            </div>
                                        </div>
                                        <div class=" flags flex h-[10px] gap-3 my-1 justify-center absolute right-0 left-0 bottom-7">
                                            <div class="country flex items-center">
                                                <img class="h-[80%]" src="${playerData.NationalityFlag}" alt="">
                                            </div>
                                            <div class="club">
                                                <img class="h-[100%]" src="${playerData.ClubFlag}" alt="">
                                            </div>
                                        </div>
                                        
                                        </div>
                                        <p style="filter:blur(20px); z-index:-1; background: rgba(16, 16, 16, 0.7);border-radius: 50%;width: 60px; box-shadow: 0 0 0 0 rgb(0, 0, 0);transform: scale(1) translate(-50%, -100%);rotate: x 45deg;height: 40px;position: absolute;left: 50%;color: white;" class="bg-red-500 flex justify-center items-center z-[-2] font-bold"></p>    
                        `
                        classIdOffsetPar = ""
                        idofCard =""
                    })
    
    
                }

            }
};
    

/** FN - 7 - Change The Player **/
/** Function That Change the player From The sub satus to the terain Formation when the user want to swipe **/
function ChangeFromRemp(ChangeId){
    
    let CardParDefault = document.getElementById(idOfEle).querySelector(".CardParDefault")
    let cardPlayerOfficiale = document.getElementById(idOfEle).querySelector(".cardPlayerOfficiale")
    cardPlayerOfficiale.classList.remove("hidden")
    CardParDefault.classList.add("hidden")
    let theChangePlace = document.querySelectorAll(".Change")
    console.log(cardPlayerOfficiale)
    AllDataArraysOfEveryPlayer.forEach(allDataInputs => {
        if (ChangeId === allDataInputs.id) {
            
            cardPlayerOfficiale.innerHTML = `
                    <div style="z-index:20;" class="ModifSuppChang text-white absolute bg-[black] p-3 rounded-[5px] flex flex-col gap-6 right-0 translate-x-[40%] float-right">
                        <div onclick="supprime(${allDataInputs.id},'${idOfEle}')" class="Supp">
                            <i class="fa-solid fa-xmark"></i>
                        </div>
                        <div idPlayer="${allDataInputs.id}" onclick="modification(${allDataInputs.id},'${idOfEle}')" class="Modif" >
                            <i idPlayer="${allDataInputs.id}"  class="fa-solid fa-pen"></i>
                        </div>
                        <div onclick="ChangeThePlayer()" class="Changement">
                            <i class="fas fa-exchange"></i>
                        </div>
                    </div>
                    <div class="BadgeCover">
                        <img class="w-[140px]" style=" height:100%;" src="${allDataInputs.CardCover}" alt="">
                    </div>    
                    <div style="justify-self: center;height: 93px;overflow: hidden;top: 43px;" class="flex justify-center w-[-webkit-fill-available] informationsBadges absolute top-0 right-0">
                        <div class="image relative flex justify-center self-center w-[78%]  ">
                            <img class="urlImg" src="${allDataInputs.ImageUrl}" alt="">
                        </div>
                    </div>   
                    <div class=" Info absolute top-0 w-[100%] flex flex-col text-[#ffd972]  h-[100%]">
                        <div class="absolute top-[3.5rem] left-7  text-4xl font-bold">
                            <p>${allDataInputs.rating}</p>
                            <p class="positionSelect text-xl mt-[-5px]  text-center">${allDataInputs.Position}</p>
                        </div>
                        <p class=" font-bold text-[15px] text-center absolute w-[100%] top-[9.8rem]">${allDataInputs.Name}</p>
                        <div class="criticalCard flex absolute w-[100%] left-0 bottom-[2.8rem] text-[8px] text-[#ffd972] justify-center gap-1 ">
                            <div class="flex flex-col items-center">
                                <p>Pac</p>
                                <p class="font-semibold">${allDataInputs.pace}</p>
                            </div>
                            <div class="flex flex-col items-center">
                                <p>Sho</p>
                                <p class="font-semibold">${allDataInputs.shooting}</p>
                            </div>
                            <div class="flex flex-col items-center">
                                <p>Pas</p>
                                <p class="font-semibold">${allDataInputs.passing}</p>
                            </div>
                            <div class="flex flex-col items-center">
                                <p>Dri</p>
                                <p class="font-semibold">${allDataInputs.dribbling}</p>
                            </div>
                            <div class="flex flex-col items-center">
                                <p>Def</p>
                                <p class="font-semibold">${allDataInputs.defending}</p>
                            </div>
                            <div class="flex flex-col items-center">
                                <p>Phy</p>
                                <p class="font-semibold">${allDataInputs.physical}</p>
                            </div>
                        </div>
                        <div class=" flags flex h-[10px] gap-3 my-1 justify-center absolute right-0 left-0 bottom-7">
                            <div class="country flex items-center">
                                <img class="h-[80%]" src="${allDataInputs.NationalityFlag}" alt="">
                            </div>
                            <div class="club">
                                <img class="h-[100%]" src="${allDataInputs.ClubFlag}" alt="">
                            </div>
                        </div>
                        
                        </div>
                        <p style="filter:blur(20px); z-index:-1; background: rgba(16, 16, 16, 0.7);border-radius: 50%;width: 60px; box-shadow: 0 0 0 0 rgb(0, 0, 0);transform: scale(1) translate(-50%, -100%);rotate: x 45deg;height: 40px;position: absolute;left: 50%;color: white;" class="bg-red-500 flex justify-center items-center z-[-2] font-bold"></p>    
        `
        idOfEle = ""
        }
    });
    
}

/** FN - 8 - REG EXP**/

function regex(checking){
    let namePattern = /^[a-zA-Z\s]+$/
    return namePattern.test(checking)
}

/******************************* All Events ***********************************/
/* EV - 1 - Change The Formation */
/*** The Event => (change) for check when the user change the value of the formation select ***/
SelectFormation.addEventListener("change",()=>{
    // The Function For Change The Formation 
    checkSelect()
})


/* EV - 2 - Add PLayer */
/*** Event => (click) When The User Click on the Add Player button will add it to the terrain ***/
AddButton.addEventListener("click" , ()=>{
    let imageFile = document.getElementById("image").files[0]
    let PlayerId = parseInt(localStorage.getItem("PlayerId")) // Get The Current ID from the Local Storage
    let regexReturn = regex(document.getElementById("name").value)
    if (regexReturn === true) {
        document.getElementById("NameRegex").classList.add("hidden")
        if (!imageFile) {
            document.getElementById("FileRegex").classList.remove("hidden")
        }else{
        if (!isGK) {
            // Write The Object That Will Store All Data From User That Will Push To The LocalStorage After .
            let allDataInputs = {
                id : PlayerId+1 ,
                Name : document.getElementById("name").value,
                ImageUrl : urlimg,
                Position : PositionSelect,
                Nationality : document.getElementById("nations").textContent,
                NationalityFlag : nations.getValue(),
                Club : document.getElementById("clubs").textContent,
                ClubFlag : clubs.getValue(),
                CardCover : Cover.getValue(),
                rating : document.getElementById("NormalPlayerRating").value,
                pace : document.getElementById("NormalPlayerPace").value,
                shooting : document.getElementById("NormalPlayerShooting").value,
                passing : document.getElementById("NormalPlayerPassing").value,
                dribbling : document.getElementById("NormalPlayerDribbling").value,
                defending : document.getElementById("NormalPlayerDefending").value,
                physical : document.getElementById("NormalPlayerPhysical").value
            }
            document.querySelector("#"+idOfEle +" .cardPlayerOfficiale").innerHTML = "" // Amptying The Card For Add New Player
            AllDataArraysOfEveryPlayer.push(allDataInputs) // Push The All Data That Collect From User To The List Of Data Players
            localStorage.setItem('AllPlayersData',JSON.stringify(AllDataArraysOfEveryPlayer)) // Add The New List That Stored The New Player To The Local Storage
            localStorage.setItem("PlayerId",PlayerId+1) // incremment The Id Of The Players To The Local Storage
            // Operations Just For The Styling
            FormAddplayer.classList.add("hidden") 
            document.getElementById("TheEmptyMessage").style.display = "flex"
            document.getElementById(idOfEle).classList.add(idOfEle)
            document.querySelector("#"+idOfEle +" .CardParDefault").classList.add("hidden")
            document.querySelector("#"+idOfEle +" .cardPlayerOfficiale").classList.remove("hidden")
            
            // Add Player To The Stad 
            document.querySelector("#"+idOfEle +" .cardPlayerOfficiale").innerHTML = `
                        <div style="z-index:20; " class="ModifSuppChang text-white absolute bg-[black] p-3 rounded-[5px] flex flex-col gap-6 right-0 translate-x-[40%] float-right">
                            <div onclick="supprime(${allDataInputs.id},'${idOfEle}')" class="Supp">
                                <i class="fa-solid fa-xmark"></i>
                            </div>
                            <div idPlayer="${allDataInputs.id}" onclick="modification(${allDataInputs.id},'${idOfEle}')" class="Modif" >
                                <i idPlayer="${allDataInputs.id}"  class="fa-solid fa-pen"></i>
                            </div>
                            <div onclick="ChangeThePlayer()" class="Changement">
                                <i class="fas fa-exchange"></i>
                            </div>
                        </div>
                        <div class="BadgeCover">
                            <img class="w-[140px]" style=" height:100%;" src="${allDataInputs.CardCover}" alt="">
                        </div>    
                        <div style="justify-self: center;height: 93px;overflow: hidden;top: 43px;" class="flex justify-center w-[-webkit-fill-available] informationsBadges absolute top-0 right-0">
                            <div class="image relative flex justify-center self-center w-[78%]  ">
                                <img class="urlImg" src="${allDataInputs.ImageUrl}" alt="">
                            </div>
                        </div>   
                        <div class=" Info absolute top-0 w-[100%] flex flex-col text-[#ffd972]  h-[100%]">
                            <div class="absolute top-[3.5rem] left-7  text-4xl font-bold">
                                <p>${allDataInputs.rating}</p>
                                <p class="positionSelect text-xl mt-[-5px]  text-center">${allDataInputs.Position}</p>
                            </div>
                            <p class=" font-bold text-[15px] text-center absolute w-[100%] top-[9.8rem]">${allDataInputs.Name}</p>
                            <div class="criticalCard flex absolute w-[100%] left-0 bottom-[2.8rem] text-[8px] text-[#ffd972] justify-center gap-1 ">
                                <div class="flex flex-col items-center">
                                    <p>Pac</p>
                                    <p class="font-semibold">${allDataInputs.pace}</p>
                                </div>
                                <div class="flex flex-col items-center">
                                    <p>Sho</p>
                                    <p class="font-semibold">${allDataInputs.shooting}</p>
                                </div>
                                <div class="flex flex-col items-center">
                                    <p>Pas</p>
                                    <p class="font-semibold">${allDataInputs.passing}</p>
                                </div>
                                <div class="flex flex-col items-center">
                                    <p>Dri</p>
                                    <p class="font-semibold">${allDataInputs.dribbling}</p>
                                </div>
                                <div class="flex flex-col items-center">
                                    <p>Def</p>
                                    <p class="font-semibold">${allDataInputs.defending}</p>
                                </div>
                                <div class="flex flex-col items-center">
                                    <p>Phy</p>
                                    <p class="font-semibold">${allDataInputs.physical}</p>
                                </div>
                            </div>
                            <div class=" flags flex h-[10px] gap-3 my-1 justify-center absolute right-0 left-0 bottom-7">
                                <div class="country flex items-center">
                                    <img class="h-[80%]" src="${allDataInputs.NationalityFlag}" alt="">
                                </div>
                                <div class="club">
                                    <img class="h-[100%]" src="${allDataInputs.ClubFlag}" alt="">
                                </div>
                            </div>
                            
                            </div>
                            <p style="filter:blur(20px); z-index:-1; background: rgba(16, 16, 16, 0.7);border-radius: 50%;width: 60px; box-shadow: 0 0 0 0 rgb(0, 0, 0);transform: scale(1) translate(-50%, -100%);rotate: x 45deg;height: 40px;position: absolute;left: 50%;color: white;" class="bg-red-500 flex justify-center items-center z-[-2] font-bold"></p>    
            `
    
            
    
        }else{
            let allDataInputs = {
                id : PlayerId+1 ,
                Name : document.getElementById("name").value,
                ImageUrl : urlimg,
                Position : PositionSelect,
                Nationality : document.getElementById("nations").textContent,
                NationalityFlag : document.getElementById("nations").value,
                Club : document.getElementById("clubs").textContent,
                ClubFlag : document.getElementById("clubs").value,
                CardCover : document.getElementById("Cover").value,
                rating : document.getElementById("GKRating").value,
                diving : document.getElementById("GKDiving").value,
                handling : document.getElementById("GKHandling").value,
                kicking : document.getElementById("GKKicking").value,
                reflexes : document.getElementById("GKReflexes").value,
                speed : document.getElementById("GKSpeed").value,
                positioning : document.getElementById("GKPositioning").value
            }
            document.querySelector("#"+ idOfEle +" .cardPlayerOfficiale").innerHTML = ""
        
            AllDataArraysOfEveryPlayer.push(allDataInputs)
            localStorage.setItem('AllPlayersData',JSON.stringify(AllDataArraysOfEveryPlayer))
        
            FormAddplayer.classList.add("hidden")
            document.getElementById("TheEmptyMessage").style.display = "block"
        
            localStorage.setItem("PlayerId",PlayerId+1)
            document.querySelector("#"+idOfEle +" .CardParDefault").classList.add("hidden")
            document.querySelector("#"+idOfEle +" .cardPlayerOfficiale").classList.remove("hidden")
            document.querySelector("#"+idOfEle +" .cardPlayerOfficiale").innerHTML  = `
                        <div style="z-index:20;" class="ModifSuppChang text-white absolute bg-[black] p-3 rounded-[5px] flex flex-col gap-6 right-0 translate-x-[40%] float-right">
                            <div class="Supp">
                                <i class="fa-solid fa-xmark"></i>
                            </div>
                            <div idPlayer="${allDataInputs.id}" onclick="modification(${allDataInputs.id},'${idOfEle}',${PositionSelect})" class="Modif">
                                <i class="fa-solid fa-pen"></i>
                            </div>
                            <div onclick="ChangeThePlayer()" class="Changement">
                                <i class="fas fa-exchange"></i>
                            </div>
                        </div>
                        <div class="BadgeCover">
                            <img class="w-[140px]" style=" height:100%;" src="${allDataInputs.CardCover}" alt="">
                        </div>    
                        <div style="justify-self: center;height: 93px;overflow: hidden;top: 43px;" class="flex justify-center w-[-webkit-fill-available] informationsBadges absolute top-0 right-0">
                            <div class="image relative top-8 flex justify-center self-center w-[78%]  ">
                                <img class="" src="${allDataInputs.ImageUrl}" alt="">
                            </div>
                        </div>   
                        <div class=" Info absolute top-0 w-[100%] flex flex-col text-[#ffd972]  h-[100%]">
                            <div class="absolute top-[3.5rem] left-7  text-4xl font-bold">
                                <p>95</p>
                                <p class="text-xl mt-[-5px]  text-center">${allDataInputs.Position}</p>
                            </div>
                            <p class=" font-bold text-[15px] text-center absolute w-[100%] top-[9.8rem]">${allDataInputs.Name}</p>
                            <div class="criticalCard flex absolute w-[100%] left-0 bottom-[2.8rem] text-[8px] text-[#ffd972] justify-center gap-1 ">
                                <div class="flex flex-col items-center">
                                    <p>Div</p>
                                    <p class="font-semibold">${allDataInputs.diving}</p>
                                </div>
                                <div class="flex flex-col items-center">
                                    <p>Hand</p>
                                    <p class="font-semibold">${allDataInputs.handling}</p>
                                </div>
                                <div class="flex flex-col items-center">
                                    <p>Kick</p>
                                    <p class="font-semibold">${allDataInputs.kicking}</p>
                                </div>
                                <div class="flex flex-col items-center">
                                    <p>Ref</p>
                                    <p class="font-semibold">${allDataInputs.reflexes}</p>
                                </div>
                                <div class="flex flex-col items-center">
                                    <p>Spd</p>
                                    <p class="font-semibold">${allDataInputs.speed}</p>
                                </div>
                                <div class="flex flex-col items-center">
                                    <p>Pos</p>
                                    <p class="font-semibold">${allDataInputs.positioning}</p>
                                </div>
                            </div>
                            <div class=" flags flex h-[10px] gap-3 my-1 justify-center absolute right-0 left-0 bottom-7">
                                <div class="country flex items-center">
                                    <img class="h-[80%]" src="${allDataInputs.NationalityFlag}" alt="">
                                </div>
                                <div class="club">
                                    <img class="h-[100%]" src="${allDataInputs.ClubFlag}" alt="">
                                </div>
                            </div>
                        </div>
            `
            idOfEle = ""
    
    
            let AllSupp = document.querySelectorAll('.Supp')
            for (const element of AllSupp) {
                element.addEventListener("click",(e)=>{
                    let TheCardId = e.target.offsetParent.offsetParent.id
                    console.log(TheCardId)
                    let CardParDefault = document.getElementById(TheCardId).querySelector(".CardParDefault")
                    let cardPlayerOfficiale = document.getElementById(TheCardId).querySelector(".cardPlayerOfficiale")
                    CardParDefault.classList.remove("hidden")
                    cardPlayerOfficiale.innerHTML = '';
                })
            }
            
        }
    }
    }else{
        document.getElementById("NameRegex").classList.remove("hidden")
        if (!imageFile) {
            document.getElementById("FileRegex").classList.remove("hidden")
            
        }
    }
    nations.clear();
    clubs.clear();
    Cover.clear();
})


/* EV - 3 - Get Image Url */
/*** Event => (change) When The User Change the Image We Get The Url Image And We Save It In The urlimg Variable ***/
document.getElementById("image").addEventListener('change', (event) => {
  const file = event.target.files[0];
  if(file) {
      const reader = new FileReader();
      reader.onload = function(e) {
          urlimg = e.target.result;
      };
      reader.readAsDataURL(file);
    }
})


/* EV - 4 - Remove The Bottom Section  */
/*** Event => (click) When The User Click on the Close button The Section Where The Already Players Exist Will Desappear  ***/
document.querySelector(".TheCloseChangeExist").addEventListener("click",()=>{
    document.querySelector(".changement").classList.remove("hidden")
    document.querySelector(".TheCloseChangeExist").style.display = "none"
    document.getElementById("SectionOfChangment").classList.add("hidden")
})


/* EV - 5 - Hover Card Shadow */
/*** Events => (mouseenter) && (mouseout) For The Hover Of Every Empty Card ***/
for (const element of allCardsDispo) {
    // Event => (mouseenter)  When The User Hover
    element.addEventListener("mouseenter",()=>{
        let imgHovering = document.querySelector("#"+element.id + " .BadgeCover .hoverImg")
        imgHovering.classList.add("scale-[1.05]")
        imgHovering.classList.add("blur-[4px]")
    })
    // Event => (mouseout) When The User Hover
    element.addEventListener("mouseout",()=>{
        let imgHovering = document.querySelector("#"+element.id + " .BadgeCover .hoverImg")
        imgHovering.classList.remove("scale-[1.05]")
    })
}


/* EV - 6 - The Empty Card Player  */
/*** Event => (click)  When The User Click On The Empty Card ***/
for (const element of buttonsCard) {
    // Event => (click) When The User click on the card
    element.addEventListener("click",(e)=>{
        idOfEle = e.target.offsetParent.id // get id Of the Card of the card that user clicked on
        document.getElementById("TheEmptyMessage").style.display = "none"
        FormAddplayer.classList.remove("hidden")
        let elementPosition = window.getComputedStyle(element.parentElement).gridTemplateAreas //get the position of the player from the css Grid Template Area
        PositionSelect = elementPosition.replace(/['"]+/g, '') 
        document.getElementById("PositionSelection").innerHTML = PositionSelect // CHange The Position on the form 
        // Check The Position Of The Clicked Card If Its A normal Player Or A goal Keeper
        if (PositionSelect === "GK") {
            // Change The input to the GK input
            for (const GKinput of GKInputs) {
                GKinput.classList.remove("hidden") 
            }
            for (const Player of NormalPlayers) {
                Player.classList.add("hidden")
            }
            isGK = true;
        }else{
            // Change The input to the Normal Players input
            for (const GKinput of GKInputs) {
                GKinput.classList.add("hidden")
            }
            for (const Player of NormalPlayers) {
                Player.classList.remove("hidden")
            }
            isGK = false;
        }
        ChangeThePlayer() // Execute The Function For Appear The Change Section That contains the players already exist
    })
}


/* EV - 7 -  Change The Range Label Value */
/*** Event => (Change) The Value Of the Range When the User Change The Value From ***/
for (const element of theRange) {
    element.querySelector("input").addEventListener("input",()=>{
        element.querySelector("p").textContent = element.querySelector("input").value
    })
}



// let cardChange = document.querySelectorAll(".cardChange")
// cardChange.forEach(element => {
//     element.addEventListener("click",(e)=>{
//         console.log(element)
//         idOfEle = e.target.id
//         document.getElementById("TheEmptyMessage").style.display = "none"
//         FormAddplayer.classList.remove("hidden")
        
//     })
// });








// Use Library Of Tom select for the drop down list Of The both of The Nations input & the clubs input
// Select For Nations
const nations = new TomSelect('#nations',{
    valueField: 'img',
    labelField: 'name',
    searchField: 'name',
    maxItems: 1,
    // fetch remote data
    load: function(query, callback) {
  
      fetch('./assets/public/data/nation.json')
        .then(response => response.json())
        .then(json => {
          callback(json);
        }).catch(()=>{
          callback();
        });
  
    },
    // custom rendering functions for options and items
    render: {
      option: function(item) {
        return `<div class="custom-option " style="display:flex;">
                    <img src="${item.img}" ><span >${item.name}</span>
                </div>`;
      },
      item: function(item) {
        return `<div id="Flaginput" class="custom-option" style="display:flex;">
                    <img src="${item.img}" ><span>${item.name}</span>
                </div>`;
      }
    },
});
// Select For Clubs
const clubs = new TomSelect('#clubs',{
    valueField: 'img',
    labelField: 'name',
    searchField: 'name',
    maxItems: 1,
    // fetch remote data
    load: function(query, callback) {
  
      fetch('./assets/public/data/clubs.json')
        .then(response => response.json())
        .then(json => {
          callback(json);
        }).catch(()=>{
          callback();
        });
  
    },
    // custom rendering functions for options and items
    render: {
      option: function(item) {
        return `<div class="custom-option " style="display:flex;">
                    <img src="${item.img}" ><span >${item.name}</span>
                </div>`;
      },
      item: function(item) {
        return `<div id="Flaginput" class="custom-option" style="display:flex;">
                    <img  src="${item.img}" ><span>${item.name}</span>
                </div>`;
      }
    },
});
// Select For Clubs
const Cover = new TomSelect('#Cover',{
    valueField: 'img',
    labelField: 'name',
    searchField: 'name',
    maxItems: 1,
    // fetch remote data
    load: function(query, callback) {
  
      fetch('./assets/public/data/card.json')
        .then(response => response.json())
        .then(json => {
          callback(json);
        }).catch(()=>{
          callback();
        });
  
    },
    // custom rendering functions for options and items
    render: {
      option: function(item) {
        return `<div class="custom-option " style="display:flex;">
                    <img src="${item.img}" ><span >${item.name}</span>
                </div>`;
      },
      item: function(item) {
        return `<div id="Flaginput" class="custom-option" style="display:flex;">
                    <img src="${item.img}" ><span>${item.name}</span>
                </div>`;
      }
    },
});
/*------------------------------------------------------------------------------------------------*/