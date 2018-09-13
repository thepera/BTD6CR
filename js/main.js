var difficutiesArray = ['easy','primary only', 'deflation','normal','military only','apocalypse', 'reverse','hard','magic only','double hp moab', 'half cash','alternate baloon rounds', 'impoppable', 'chimps'];

document.addEventListener("DOMContentLoaded", function(event) {
    generateDifficultiesList();
 });
 
function renderTemplate(template,keyword){
	return template.replace(/{{data}}/g,keyword);
}

function generateDifficultiesList(){
	var i;
	var checkBoxList = '<div> <label>Difficulties:</label>';
	const difficultDivTemplate= '<div> <input type="checkbox" id="{{data}}" checked/> <label> {{data}} </label> </div>';
	for(i = 0; i < difficutiesArray.length; i++){
	checkBoxList += renderTemplate(difficultDivTemplate,difficutiesArray[i]);
	}
	checkBoxList += '</div>';
	document.getElementById('thirdColumn').insertAdjacentHTML('afterbegin', checkBoxList);
}

function randomizeTowerNumber(){
	var towersTot = 0;
	do{
		var primaryTowerNumber = Math.abs(Math.floor(Math.random() * towers.primary.length - 2));
		var militaryTowerNumber = Math.abs(Math.floor(Math.random() * towers.military.length - 1));
		var magicTowerNumber = Math.abs(Math.floor(Math.random() * towers.magic.length - 1));
		var supportTowerNumber = Math.abs(Math.floor(Math.random() * towers.support.length - 1));
		towersTot = supportTowerNumber + magicTowerNumber + militaryTowerNumber + primaryTowerNumber;
	}while(towersTot <= 0)
	document.getElementById('primary').value = primaryTowerNumber;
	document.getElementById('military').value = militaryTowerNumber;
	document.getElementById('magic').value = magicTowerNumber;
	document.getElementById('support').value = supportTowerNumber;
}

function checkUncheck(boolean){
	console.log(boolean);
	for(i = 0; i < difficutiesArray.length; i++){
		document.getElementById(difficutiesArray[i]).checked = boolean;
	}
}

function randomizeChallenge(){
	showChallenge(randomizeHero(),randomizeMap(),randomizeTowers(randomizeMode()),randomizeMode(),randomizeExtraRule());
}
function showChallenge(hero,map,towers,mode,extra){
	if(!map) {window.alert("You have to choose at least one map difficult!"); return;}
	if(!mode) {window.alert("You have to choose at least one mode!"); return;}
	if(!towers) {window.alert("You have to choose at least one tower!"); return;}
	var display = document.getElementById("challengeDisplay");
	var towersDiv = '';
	while (display.firstChild) {
		display.removeChild(display.firstChild);
	}
	display.insertAdjacentHTML('beforeend','<div> NOTE: Challenge may not be possible </div>');
	display.insertAdjacentHTML('beforeend','<div> Mode: ' + mode +' </div>');
	display.insertAdjacentHTML('beforeend','<div> Map: ' + map +' </div>');
	if(extra){
		display.insertAdjacentHTML('beforeend','<div> Rules: ' + extra +' </div>');
		if(extra == '#FindACoolName'){
			var explanation = 'Upgrade the first tower you place using top path, the second one using middle path, the third one using bottom path, the fourth one again using top path and so on... <br>'+
			'When you place a tower you have to buy the tier one upgrade as soon as u can. You can choose for example for the first tower, if it will be a *-2-0 or a *-0-2';
			display.insertAdjacentHTML('beforeend','<p>' + explanation +' </p>');
			}
	}
	if (hero){display.insertAdjacentHTML('beforeend','<div> Hero: ' + hero +' </div>');}
	
	for (key in towers){
		towersDiv += '<p>'+towers[key]+'</p>';
	}
	display.insertAdjacentHTML('beforeend','<div id="displayTowers"> Towers: ' + towersDiv + '</div>' );
}

function randomizeHero(){
	if(document.getElementById('isHeroDesired').value == 1){
		console.log('HERO: ' + heroes[Math.floor(Math.random() * heroes.length)].name);
		return heroes[Math.floor(Math.random() * heroes.length)].name;
	}
	
}

function randomizeMap(){
	var mapPool = [];
	var Mapsdifficulties = ['beginner','intermediate','advanced','expert'];
	var i;
	for(i = 0; i < Mapsdifficulties.length; i++){
		if(document.getElementById(Mapsdifficulties[i]).checked){
			for (var key in maps[Mapsdifficulties[i]]){
				mapPool.push(maps[Mapsdifficulties[i]][key].name);
			}
		}
	}
	console.log('MAP: ' + mapPool[Math.floor(Math.random() * mapPool.length)]);
	return mapPool[Math.floor(Math.random() * mapPool.length)];
}

function randomizeMode(){
	var modePool = [];
	for(i = 0; i < difficutiesArray.length; i++){
		if(document.getElementById(difficutiesArray[i]).checked){
			modePool.push(difficutiesArray[i]);
		}
	}
	console.log('MODE: '+ modePool[Math.floor(Math.random() * modePool.length)]);
	return modePool[Math.floor(Math.random() * modePool.length)];
}

function randomizeTowers(mode){
	var towersArray = [];
	switch (mode){
		case 'primary only':
			for (var key in towers.primary){
				towersArray.push(towers.primary[key].name);
			}
			break;
		case 'military only': 
			for (var key in towers.military){
				towersArray.push(towers.military[key].name);
			}
			break;
		case 'magic only':
			for (var key in towers.magic){
				towersArray.push(towers.magic[key].name);
			}
			break;
		default:
			var towerTypes = ['primary','military','magic','support'];
			var randomTower;
			for (var x = 0; x < towerTypes.length; x++){
				for (var y = 0; y < document.getElementById(towerTypes[x]).value; y++){
					do {
						randomTower = towers[towerTypes[x]][Math.floor(Math.random() * towers[towerTypes[x]].length)].name;
					}while(towersArray.indexOf(randomTower) !== -1);
					towersArray.push(randomTower)
				}
			}
	}
	console.log('tower: ' + towersArray + '----');
	return towersArray;
	
}

function randomizeExtraRule(){
	if(!document.getElementById('extraRule').checked) {return null}
	var extraRuleList = ['Use top path only','Use middle path only','Use bottom path only','#FindACoolName','No 4th tier upgrade','Use max 2 towers'];
	return extraRuleList[Math.floor(Math.random() * extraRuleList.length)]
}