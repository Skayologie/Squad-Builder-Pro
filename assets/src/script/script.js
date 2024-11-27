const SelectFormation = document.getElementById("SelectFormation");
const Tachkila = document.getElementById("formation")

const GKInputs = document.querySelectorAll(".GK")
const NormalPlayers  = document.querySelectorAll(".NormalPlayer ")

const PositionSelect = document.getElementById("PositionSelection")

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

let allDataInputs = {
        Name : document.getElementById("name"),
        ImageUrl : document.getElementById("imageUrl"),
        Position : document.getElementById("Position"),
        Nationality : document.getElementById("Nationality"),
        NationalFlag : document.getElementById("NationalFlag"),
        Club : document.getElementById("Club"),
        LogoUrl : document.getElementById("LogoUrl"),

        
}

let AllDataArraysOfEveryPlayer = []


let Name = document.getElementById("name");
let ImageUrl = document.getElementById("imageUrl");
let AddButton = document.getElementById("AddButton");
let allCardsDispo = document.querySelectorAll(".cardIndiv")

let buttonsCard = document.querySelectorAll(".cardIndiv button")
let FormAddplayer = document.getElementById("FormAddplayer")


for (const element of allCardsDispo) {
    element.addEventListener("mouseenter",()=>{
        let imgHovering = document.querySelector("#"+element.id + " .BadgeCover .hoverImg")
        imgHovering.classList.add("scale-[1.05]")
        imgHovering.classList.add("blur-[4px]")
    })

    element.addEventListener("mouseout",()=>{
        let imgHovering = document.querySelector("#"+element.id + " .BadgeCover .hoverImg")
        imgHovering.classList.remove("scale-[1.05]")
    })
}



for (const element of buttonsCard) {
    
    element.addEventListener("click",(e)=>{
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

        AddButton.addEventListener("click" , ()=>{
            let idOfEle = ""
            idOfEle = e.target.offsetParent.id
            document.getElementById(idOfEle).classList.add("scale-125")
            document.getElementById(idOfEle).innerHTML = `
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
        })
    })
}





