const SelectFormation = document.getElementById("SelectFormation");
const Tachkila = document.getElementById("formation")

const GKInputs = document.querySelectorAll(".GK")
const NormalPlayers  = document.querySelectorAll(".NormalPlayer ")

let PositionSelect ;
let urlimg;



let playersData ;
const checkSelect = function (){
    if (SelectFormation.value === "433") {
        Tachkila.classList.replace("formation-442","formation-433")

    }else if (SelectFormation.value === "442") {
        Tachkila.classList.replace("formation-433","formation-442")
    }
}


let AllDataArraysOfEveryPlayer = [] ;
document.addEventListener("DOMContentLoaded",()=>{
    FillArray()
})

 if (!localStorage.getItem("AllPlayersData")) {
     localStorage.setItem("AllPlayersData", '[{"id":0,"Name":"","ImageUrl":"","Position":"RM","Nationality":null,"NationalFlag":null,"Club":null,"LogoUrl":null}]')
 }
 if (!localStorage.getItem("PlayerId")) {
     localStorage.setItem("PlayerId", 0)
 }

SelectFormation.addEventListener("change",()=>{
    checkSelect()
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
        return `<div id="Flaginput" class="custom-option">
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
        return `<div id="Flaginput" class="custom-option">
                    <img id="imgCoverCombo"  src="${item.img}" ><span>${item.name}</span>
                </div>`;
      }
    },
});







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
let isGK;
for (const element of buttonsCard) {
    
    element.addEventListener("click",(e)=>{
        idOfEle = e.target.offsetParent.id
        
        document.getElementById("TheEmptyMessage").style.display = "none"
        FormAddplayer.classList.remove("hidden")
        let elementPosition = window.getComputedStyle(element.parentElement).gridTemplateAreas
        PositionSelect = elementPosition.replace(/['"]+/g, '')
        console.log(PositionSelect)
        document.getElementById("PositionSelection").innerHTML = PositionSelect
        if (PositionSelect === "GK") {
            
            for (const GKinput of GKInputs) {
                GKinput.classList.remove("hidden")
            }
            for (const Player of NormalPlayers) {
                Player.classList.add("hidden")
            }
            isGK = true;
        }else{
            
            for (const GKinput of GKInputs) {
                GKinput.classList.add("hidden")
            }
            for (const Player of NormalPlayers) {
                Player.classList.remove("hidden")
            }
            isGK = false;
            
        }
        
        
        ChangeThePlayer()

    })
}






document.getElementById("image").addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
          urlimg = e.target.result;
          console.log(urlimg);
      };
      reader.readAsDataURL(file);
    }
})


AddButton.addEventListener("click" , ()=>{





    let PlayerId = parseInt(localStorage.getItem("PlayerId"))
    if (!isGK) {
        let allDataInputs = {
            id : PlayerId+1 ,
            Name : document.getElementById("name").value,
            ImageUrl : urlimg,
            Position : PositionSelect,
            Nationality : document.getElementById("nations").textContent,
            NationalityFlag : document.getElementById("nations").value,
            Club : document.getElementById("clubs").textContent,
            ClubFlag : document.getElementById("clubs").value,
    
            rating : document.getElementById("NormalPlayerRating").value,
            pace : document.getElementById("NormalPlayerPace").value,
            shooting : document.getElementById("NormalPlayerShooting").value,
            passing : document.getElementById("NormalPlayerPassing").value,
            dribbling : document.getElementById("NormalPlayerDribbling").value,
            defending : document.getElementById("NormalPlayerDefending").value,
            physical : document.getElementById("NormalPlayerPhysical").value
        }
        console.log(allDataInputs.Nationality)
        document.getElementById(idOfEle).innerHTML = ""
    
        AllDataArraysOfEveryPlayer.push(allDataInputs)
        localStorage.setItem('AllPlayersData',JSON.stringify(AllDataArraysOfEveryPlayer))
    
        FormAddplayer.classList.add("hidden")
        document.getElementById("TheEmptyMessage").style.display = "block"
    
        document.getElementById(idOfEle).classList.add("scale-125")
        document.getElementById(idOfEle).classList.add("cardClass"+allDataInputs.id)

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
                            <img class="w-[75%] " src="${allDataInputs.ImageUrl}" alt="">
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
        idOfEle = ""
        

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
    
            rating : document.getElementById("GKRating").value,
            diving : document.getElementById("GKDiving").value,
            handling : document.getElementById("GKHandling").value,
            kicking : document.getElementById("GKKicking").value,
            reflexes : document.getElementById("GKReflexes").value,
            speed : document.getElementById("GKSpeed").value,
            positioning : document.getElementById("GKPositioning").value
        }
        document.getElementById(idOfEle).innerHTML = ""
    
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
                            <img class="w-[75%] " src="${allDataInputs.ImageUrl}" alt="">
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
        
    }

})

    
document.querySelector(".TheCloseChangeExist").addEventListener("click",()=>{
    document.querySelector(".changement").classList.remove("hidden")
    document.querySelector(".TheCloseChangeExist").style.display = "none"
    document.getElementById("SectionOfChangment").classList.add("hidden")
})


// Function For Change The Player When the user click on The Changment Btn
function ChangeThePlayer(){
    document.getElementById("SectionOfChangment").innerHTML =""
    document.getElementById("SectionOfChangment").classList.remove("hidden")

    let maxPlayers = 0;
    document.querySelector(".changement").classList.add("hidden")
    document.querySelector(".TheCloseChangeExist").style.display = "flex"

    AllDataArraysOfEveryPlayer.forEach((element , i) => {
        console.log(element.kicking)        
        if (element.Position === PositionSelect) {
            maxPlayers++;
            console.log(maxPlayers)
            if (maxPlayers < 6) {

                


                if (element.Position != "GK") {
                    document.getElementById("SectionOfChangment").innerHTML += `
                <div id="cardChangement${element.id}" class="relative">
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
                    document.getElementById("SectionOfChangment").innerHTML += `
                <div id="cardChangement${element.id}" class="relative">
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

                }
                
            }
            
        }
    });
    
}


// Function For Change The Player When the user click on The Changment Btn
// document.querySelector(".Modif").addEventListener("click",()=>{
//     alert("this is Modify")
// })


// // Function For Change The Player When the user click on The Changment Btn
// document.querySelector(".Supp").addEventListener("click",()=>{
//     alert("this is Supp")
// })
















