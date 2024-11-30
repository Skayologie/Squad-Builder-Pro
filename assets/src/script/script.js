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
                            <div class="image relative top-8 flex justify-center self-center w-[100%]  ">
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
                            <div class=" flags flex h-[10px] gap-3 my-1 justify-center absolute right-0 left-0 bottom-7">
                                <div class="country flex items-center">
                                    <img class="h-[80%]" src="${element.NationalityFlag}" alt="">
                                </div>
                                <div class="club">
                                    <img class="h-[100%]" src="${element.ClubFlag}" alt="">
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
                            <div  class="image relative top-8 flex justify-center self-center w-[78%]  ">
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
                            <div class=" flags flex h-[10px] gap-3 my-1 justify-center absolute right-0 left-0 bottom-7">
                                <div class="country flex items-center">
                                    <img class="h-[80%]" src="${element.NationalityFlag}" alt="">
                                </div>
                                <div class="club">
                                    <img class="h-[100%]" src="${element.ClubFlag}" alt="">
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
    localStorage.setItem("AllPlayersData", '[{"id":0,"Name":"","ImageUrl":"","Position":"RM","Nationality":null,"NationalFlag":null,"Club":null,"LogoUrl":null}]')
}
// Condition for set an initial id if its not exist  
if (!localStorage.getItem("PlayerId")) {
    localStorage.setItem("PlayerId", 0)
}
}


/** FN - 5 - Remove Player **/
/** Function For Remove The Player From The Stad When the user click on The Delete Btn**/ 
function supprime(){
    let AllSupp = document.querySelectorAll('.Supp')
        for (const element of AllSupp) {
            element.addEventListener("click",(e)=>{
                let TheCardId = e.target.offsetParent.offsetParent.id
                let CardParDefault = document.getElementById(TheCardId).querySelector(".CardParDefault")
                let cardPlayerOfficiale = document.getElementById(TheCardId).querySelector(".cardPlayerOfficiale")
                CardParDefault.classList.remove("hidden")
                cardPlayerOfficiale.innerHTML = '';
            })
        }

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
    let PlayerId = parseInt(localStorage.getItem("PlayerId")) // Get The Current ID from the Local Storage
    if (!isGK) {
        // Write The Object That Will Store All Data From User That Will Push To The LocalStorage After .
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
        document.getElementById("TheEmptyMessage").style.display = "block"
        document.getElementById(idOfEle).classList.add("cardClass"+allDataInputs.id)
        document.querySelector("#"+idOfEle +" .CardParDefault").classList.add("hidden")
        document.querySelector("#"+idOfEle +" .cardPlayerOfficiale").classList.remove("hidden")
        
        // Add Player To The Stad 
        document.querySelector("#"+idOfEle +" .cardPlayerOfficiale").innerHTML = `
                    <div style="z-index:20;" class="ModifSuppChang text-white absolute bg-[black] p-3 rounded-[5px] flex flex-col gap-6 right-0 translate-x-[40%] float-right">
                        <div class="Supp">
                            <i class="fa-solid fa-xmark"></i>
                        </div>
                        <div class="Modif">
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
                            <p>${allDataInputs.rating}</p>
                            <p class="text-xl mt-[-5px]  text-center">${allDataInputs.Position}</p>
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
        idOfEle = "" // Initial The id Of The Player

        supprime()
        

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
                        <div class="Modif">
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






// Function For Change The Player When the user click on The Changment Btn
// document.querySelector(".Modif").addEventListener("click",()=>{
//     alert("this is Modify")
// })




// Use Library Of Tom select for the drop down list Of The both of The Nations input & the clubs input
// Select For Nations
new TomSelect('#nations',{
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
                    <img id="imgCoverCombo"  src="${item.img}" ><span>${item.name}</span>
                </div>`;
      }
    },
});
// Select For Clubs
new TomSelect('#clubs',{
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
                    <img id="imgCoverCombo"  src="${item.img}" ><span>${item.name}</span>
                </div>`;
      }
    },
});
// Select For Clubs
new TomSelect('#Cover',{
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
                    <img id="imgCoverCombo"  src="${item.img}" ><span>${item.name}</span>
                </div>`;
      }
    },
});
/*------------------------------------------------------------------------------------------------*/












// ******************************************** //
// let formationPositionNumber = {
//     442 : [
//         CB = 2,
//         CM = 2,
//         RM = 1,
//         LM = 1,
//         RB = 1,
//         LB = 1,
//         ST = 2,
//         GK = 1
//     ],
//     433 : [
//         CB = 2,
//         CM = 3,
//         RW = 1,
//         LW = 1,
//         RB = 1,
//         LB = 1,
//         ST = 1,
//         GK = 1
//     ]
// }

