let weatherpart=document.querySelector(".weather-part");
let input=document.querySelector(".input");// for the section input
let infotxt=document.querySelector(".info-txt");
let requestButton =document.querySelector(".button");


let mytemp=document.querySelector(".numb");
let loc=document.querySelector(".loc");
let desc=document.querySelector(".desc");
let hum=document.querySelector(".hum");

let ico=document.querySelector(".weather-part .image img");

let interval=null;
let api;
let apiKey=`db58b9838255e2a2f33cd2c75cc09cd8`;

 function searchLocation(){
 	let location=document.getElementById("location").value;
 	if(location!=""){
 	//console.log(location);
 	
 	  interval=setInterval(requestApi(location),600000);
 }else{
  infotxt.classList.remove("normal");
 	infotxt.innerHTML="Please Input...";
  infotxt.classList.add("error");
 }
 }

 function requestApi(city){
 	
 	api =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
 	console.log("Requesting to server");
 	
 	fetchData();
}

//f0r getting the device location
 function showmyLocation(){
    if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(onSuccess,onError);
  }
  else{
    alert("Your Browser not supported geolocation api ");
  }
 }
function onSuccess(position){
   const {latitude,longitude}=position.coords;
   api=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
   console.log("Requesting to server");
   fetchData();
}

function onError(error){
  console.log(error);
  infotxt.classList.remove("normal");
   infotxt.innerHTML=error.message;
   infotxt.classList.add("error");
}
//f0r getting the device location


//for fetching the data
 function fetchData(){
  infotxt.innerHTML="Getting weather details...";
  infotxt.classList.add("normal");
  fetch(api).then(response=>response.json()).then(result=>weatherDetails(result));

 }
 function weatherDetails(info){
  	if(info.cod==404){
  		infotxt.innerHTML="Please Enter Valid City";
  		infotxt.classList.remove("normal");
 	  	infotxt.classList.add("error");	
 	}else{
 		const {feels_like,humidity,temp}=info.main;
 		const name=info.name;
 		const {description,icon,id}=info.weather[0];

        
        if(id==800){
        	ico.src="http://openweathermap.org/img/wn/10d@2x.png";
        }
        else if(id==801){
        	ico.src="http://openweathermap.org/img/wn/02d@2x.png";
        }
        else if(id==802){
        	ico.src="http://openweathermap.org/img/wn/03d@2x.png";
        }
         else if(id>=803 &&id<=804){
         	hum.innerHTML="Cloudy"
        	ico.src="http://openweathermap.org/img/wn/04d@2x.png";
        }
        else if(id<800 && id>=701){
        	ico.src="http://openweathermap.org/img/wn/50d@2x.png";
        }
         else if(id<=622 && id>=600){
        	ico.src="http://openweathermap.org/img/wn/13d@2x.png";
        }
         else if(id<=531 && id>=500){
        	ico.src="http://openweathermap.org/img/wn/10d@2x.png";
        }
         else if(id<=321 && id>=300){
        	ico.src="http://openweathermap.org/img/wn/09d@2x.png";
        }
         else if(id<=232 && id>=200){
        	ico.src="http://openweathermap.org/img/wn/11d@2x.png";
        }
        
        
 	  	mytemp.innerHTML=temp;
 	 	  loc.innerHTML=name;
      desc.innerHTML=description;
       
 	  	input.style.display="none";
    	weatherpart.style.display="block";



 	}

 	console.log(info);
 }



function goBackBtn(){
    weatherpart.style.display="none";
    input.style.display="block";
    location.reload();
}