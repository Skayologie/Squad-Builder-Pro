const SelectFormation = document.getElementById("SelectFormation");
const Tachkila = document.getElementById("formation")

const GKInputs = document.querySelectorAll(".GK")
const NormalPlayers  = document.querySelectorAll(".NormalPlayer ")

const PositionSelect = document.getElementById("PositionSelection")


let playersData ;
const checkSelect = function (){
    if (SelectFormation.value === "433") {
        Tachkila.classList.replace("formation-442","formation-433")
        document.querySelector("select option[value='LW']").removeAttribute("disabled","")
        document.querySelector("select option[value='RW']").removeAttribute("disabled","")
        document.querySelector("select option[value='LM']").setAttribute("disabled","")
        document.querySelector("select option[value='RM']").setAttribute("disabled","")

    }else if (SelectFormation.value === "442") {
        Tachkila.classList.replace("formation-433","formation-442")
        document.querySelector("select option[value='LW']").setAttribute("disabled","")
        document.querySelector("select option[value='RW']").setAttribute("disabled","")
        document.querySelector("select option[value='LM']").removeAttribute("disabled","")
        document.querySelector("select option[value='RM']").removeAttribute("disabled","")
    }
}

document.addEventListener("DOMContentLoaded",()=>{
    FillArray()
    checkSelect()
})

SelectFormation.addEventListener("change",()=>{
    checkSelect()
})

PositionSelect.addEventListener("change",()=>{
    if (PositionSelect.value != "GK") {
        for (const GKinput of GKInputs) {
            GKinput.classList.add("hidden")
        }
        for (const Player of NormalPlayers) {
            Player.classList.remove("hidden")
        }
    }else{
        for (const GKinput of GKInputs) {
            GKinput.classList.remove("hidden")
        }
        for (const Player of NormalPlayers) {
            Player.classList.add("hidden")
        }
    }
})

// ******************************************** //
let formationPositionNumber = {
    442 : [
        CB = 2,
        CM = 2,
        RM = 1,
        LM = 1,
        RB = 1,
        LB = 1,
        ST = 2,
        GK = 1
    ],
    433 : [
        CB = 2,
        CM = 3,
        RW = 1,
        LW = 1,
        RB = 1,
        LB = 1,
        ST = 1,
        GK = 1
    ]
}

// AllInputs 



let AllDataArraysOfEveryPlayer;


function FillArray(){
    let allData = localStorage.getItem("AllPlayersData")
    AllDataArraysOfEveryPlayer = JSON.parse(allData)
}
let Name = document.getElementById("name");
let ImageUrl = document.getElementById("imageUrl");
let AddButton = document.getElementById("AddButton");
let allCardsDispo = document.querySelectorAll(".cardIndiv")

let buttonsCard = document.querySelectorAll(".cardIndiv button")
let FormAddplayer = document.getElementById("FormAddplayer")


for (const element of allCardsDispo) {
    element.addEventListener("mouseenter",()=>{
        // console.log(element)
        let imgHovering = document.querySelector("#"+element.id + " .BadgeCover .hoverImg")
        imgHovering.classList.add("scale-[1.05]")
        imgHovering.classList.add("blur-[4px]")
    })

    element.addEventListener("mouseout",()=>{
        let imgHovering = document.querySelector("#"+element.id + " .BadgeCover .hoverImg")
        imgHovering.classList.remove("scale-[1.05]")
    })
}



let idOfEle;
for (const element of buttonsCard) {
    
    element.addEventListener("click",(e)=>{
        idOfEle = e.target.offsetParent.id

        document.getElementById("TheEmptyMessage").style.display = "none"
        FormAddplayer.classList.remove("hidden")
        let elementPosition = window.getComputedStyle(element.parentElement).gridTemplateAreas
        PositionSelect.value = elementPosition.replace(/['"]+/g, '')
        
        
        if (PositionSelect.value === "GK") {
        
            for (const GKinput of GKInputs) {
                GKinput.classList.remove("hidden")
            }
            for (const Player of NormalPlayers) {
                Player.classList.add("hidden")
            }
        
        }else{
        
            for (const GKinput of GKInputs) {
                GKinput.classList.add("hidden")
            }
            for (const Player of NormalPlayers) {
                Player.classList.remove("hidden")
            }
            
        }
        
       

    })
}


(!localStorage.getItem("AllPlayersData")) ? localStorage.setItem("AllPlayersData", '[{"id":0,"Name":"","ImageUrl":"","Position":"RM","Nationality":null,"NationalFlag":null,"Club":null,"LogoUrl":null}]') : "";
(!localStorage.getItem("PlayerId")) ? localStorage.setItem("PlayerId", 0) : '';

AddButton.addEventListener("click" , ()=>{
    let PlayerId = parseInt(localStorage.getItem("PlayerId"))
    document.getElementById(idOfEle).innerHTML = ""
    let allDataInputs = {
        id : PlayerId+1 ,
        Name : document.getElementById("name").value,
        ImageUrl : document.getElementById("imageUrl").value,
        Position : document.getElementById("PositionSelection").value,
        Nationality : document.getElementById("Nationality"),
        NationalFlag : document.getElementById("NationalFlag"),
        Club : document.getElementById("Club"),
        LogoUrl : document.getElementById("LogoUrl")
    }
    AllDataArraysOfEveryPlayer.push(allDataInputs)
    localStorage.setItem('AllPlayersData',JSON.stringify(AllDataArraysOfEveryPlayer))

    FormAddplayer.classList.add("hidden")
    document.getElementById("TheEmptyMessage").style.display = "block"

    document.getElementById(idOfEle).classList.add("scale-125")
    localStorage.setItem("PlayerId",PlayerId+1)
    document.getElementById(idOfEle).innerHTML = `
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
                    <img class="w-[140px]" style=" height:100%;" src="./assets/public/images/badge_ballon_dor.webp" alt="">
                </div>    
                <div class="flex justify-center w-[-webkit-fill-available] informationsBadges absolute top-0 right-0">
                    <div class="image relative top-8 flex justify-center self-center w-[100%]  ">
                        <img class="w-[75%] " src="${ImageUrl.value}" alt="">
                    </div>
                </div>   
                <div class=" Info absolute top-0 w-[100%] flex flex-col text-[#ffd972]  h-[100%]">
                    <div class="absolute top-[3.5rem] left-7  text-4xl font-bold">
                        <p>95</p>
                        <p class="text-xl mt-[-5px]  text-center">${PositionSelect.value}</p>
                    </div>
                    <p class=" font-bold text-[15px] text-center absolute w-[100%] top-[9.8rem]">${Name.value}</p>
                    <div class="criticalCard flex absolute w-[100%] left-0 bottom-[2.8rem] text-[8px] text-[#ffd972] justify-center gap-1 ">
                        <div class="flex flex-col items-center">
                            <p>Pac</p>
                            <p class="font-semibold">88</p>
                        </div>
                        <div class="flex flex-col items-center">
                            <p>Sho</p>
                            <p class="font-semibold">88</p>
                        </div>
                        <div class="flex flex-col items-center">
                            <p>Pas</p>
                            <p class="font-semibold">88</p>
                        </div>
                        <div class="flex flex-col items-center">
                            <p>Dri</p>
                            <p class="font-semibold">88</p>
                        </div>
                        <div class="flex flex-col items-center">
                            <p>Def</p>
                            <p class="font-semibold">88</p>
                        </div>
                        <div class="flex flex-col items-center">
                            <p>Phy</p>
                            <p class="font-semibold">88</p>
                        </div>
                    </div>
                    <div class=" flags flex h-[10px] gap-3 my-1 justify-center absolute right-0 left-0 bottom-7">
                        <div class="country flex items-center">
                            <img class="h-[80%]" src="https://cdn.sofifa.net/flags/ar.png" alt="">
                        </div>
                        <div class="club">
                            <img class="h-[100%]" src="https://cdn.sofifa.net/meta/team/239235/120.png" alt="">
                        </div>
                    </div>
                </div>
    `
    idOfEle = ""
    
})

    
document.querySelector(".TheCloseChangeExist").addEventListener("click",()=>{
    document.querySelector(".changement").classList.remove("hidden")
    document.querySelector(".TheCloseChangeExist").style.display = "none"
    document.getElementById("SectionOfChangment").classList.add("hidden")
})

// Function For Change The Player When the user click on The Changment Btn
function ChangeThePlayer(){
    document.getElementById("SectionOfChangment").classList.remove("hidden")
    document.getElementById("SectionOfChangment").innerHTML =""

    let maxPlayers = 0;
    document.querySelector(".changement").classList.add("hidden")
    document.querySelector(".TheCloseChangeExist").style.display = "flex"

    AllDataArraysOfEveryPlayer.forEach((element , i) => {
        if (element.Position === PositionSelect.value) {
            maxPlayers++;
            console.log(maxPlayers)
            if (maxPlayers < 6) {
                document.getElementById("SectionOfChangment").innerHTML += `
                <div class="relative">
                        <button>
                            
                            <div style="z-index:20; transform: translate(-50%,-50%); top: 50%; left: 50%; background: #000; height:30px; width: 30px; display: flex; justify-content: center; border-radius:50%;" class="ModifSuppChang text-white absolute bg-[black]  w-fit rounded-[5px] flex flex-col gap-6 right-0 translate-x-[40%] float-right">
                                <div class="Change">
                                    <i class="fas fa-exchange"></i>
                                </div>
                            </div>
                       <div class="BadgeCover">
                           <img class="w-[140px]" style=" height:100%;" src="./assets/public/images/badge_ballon_dor.webp" alt="">
                       </div>    
                       <div class="flex justify-center w-[-webkit-fill-available] informationsBadges absolute top-0 right-0">
                           <div class="image relative top-8 flex justify-center self-center w-[100%]  ">
                               <img class="w-[75%] " src="${element.ImageUrl}" alt="">
                           </div>
                       </div>   
                       <div class=" Info absolute top-0 w-[100%] flex flex-col text-[#ffd972]  h-[100%]">
                           <div class="absolute top-[3.5rem] left-7  text-4xl font-bold">
                               <p>95</p>
                               <p class="text-xl mt-[-5px]  text-center">${element.Position}</p>
                           </div>
                           <p class=" font-bold text-[15px] text-center absolute w-[100%] top-[9.8rem]">${element.Name}</p>
                           <div class="criticalCard flex absolute w-[100%] left-0 bottom-[2.8rem] text-[8px] text-[#ffd972] justify-center gap-1 ">
                               <div class="flex flex-col items-center">
                                   <p>Pac</p>
                                   <p class="font-semibold">88</p>
                               </div>
                               <div class="flex flex-col items-center">
                                   <p>Sho</p>
                                   <p class="font-semibold">88</p>
                               </div>
                               <div class="flex flex-col items-center">
                                   <p>Pas</p>
                                   <p class="font-semibold">88</p>
                               </div>
                               <div class="flex flex-col items-center">
                                   <p>Dri</p>
                                   <p class="font-semibold">88</p>
                               </div>
                               <div class="flex flex-col items-center">
                                   <p>Def</p>
                                   <p class="font-semibold">88</p>
                               </div>
                               <div class="flex flex-col items-center">
                                   <p>Phy</p>
                                   <p class="font-semibold">88</p>
                               </div>
                           </div>
                           <div class=" flags flex h-[10px] gap-3 my-1 justify-center absolute right-0 left-0 bottom-7">
                               <div class="country flex items-center">
                                   <img class="h-[80%]" src="https://cdn.sofifa.net/flags/ar.png" alt="">
                               </div>
                               <div class="club">
                                   <img class="h-[100%]" src="https://cdn.sofifa.net/meta/team/239235/120.png" alt="">
                               </div>
                           </div>
                       </div>
                        </button>
                    </div>`
            }
            
        }
    });
    
}


// Function For Change The Player When the user click on The Changment Btn
document.querySelector(".Modif").addEventListener("click",()=>{
    alert("this is Modify")
})


// Function For Change The Player When the user click on The Changment Btn
document.querySelector(".Supp").addEventListener("click",()=>{
    alert("this is Supp")
})






