// JavaScript document

function viewVideo(el) {			// zaimplementować inne działanie dla urządzeń mobilnych!!!!!!!!!!!!!
	// akcja przycisku "zobacz video" w sekcji 4 - video
	el.innerHTML = "";
	el.style.transition = "width 1s ease 0s, height 1s ease 0s";
	el.style.width = "800px";
	el.style.height = "600px";
  }

function changeHeaderBgr(headerBgr) {
	// czarny pasek dla zablokowanego nagłówka - używane przy scrollu poniżej nagłówka (scrollManager) i otwarciu menu (showMenu)
	if(headerBgr) {	
		document.getElementById("locked_header_box").style.background = "rgba(25,25,25,0.9)";
	  } else {
		document.getElementById("locked_header_box").style.background = "none";
	  }
  }

	var menu_open = false;
function showMenu() {
	// otwarcie menu z przycisku w zablokowanym nagłówku - rozwija menu i animuje przycisk
	if(menu_open) {	
		document.getElementById("header_menu").style.height = "0";
		document.getElementById("menu_button").style.transform = "rotate(0deg) rotateX(0deg)";
	  } else {
		document.getElementById("header_menu").style.height = "300px";
		changeHeaderBgr(true);		// na wypadek otwarcia przy scrollu 0
		document.getElementById("menu_button").style.transform = "rotate(-90deg) rotateX(180deg)";
	  }
	menu_open = !menu_open;
  }

function showProjects(klasa) {
	// wybór wyświetlanych projektów z menu w sekcji 3 - portfolio
	var j=0;
	if(klasa=="all") {		// "all" - pojawić wszystkie
		var obiekty = document.getElementsByClassName("project");
		for(let obj of obiekty) {
			obj.style.animation = "appear 1.5s ease-out "+(j*0.2)+"s forwards";
			obj.style.display = "block";
			j++;
		  }
		
	  } else {			// inny - zniknąć wszystkie...
		var obiekty = document.getElementsByClassName("project");
		for(let obj of obiekty) {
			obj.style.display = "none";
		  }
							// ...i pojawić wybrane
		obiekty = document.getElementsByClassName(klasa);
		for(let obj of obiekty) {
			obj.style.animation = "appear 1.5s ease-out "+(j*0.2)+"s forwards";
			obj.style.display = "block";
			j++
		  }
	  }
  }


function scrollManager() {
	var gora_ekranu = document.documentElement.scrollTop;
	var dol_ekranu = gora_ekranu + window.innerHeight;
	
	var offset = 0;
	var element = '';
	var gora_el = 0;
	var dol_el = 0;
	
			// tło zablokowanego headera
	if(gora_ekranu > 500 || menu_open) {	// przy otwartym menu zawsze jest tło
		changeHeaderBgr(true);
	  } else {
		changeHeaderBgr(false);
	  }
	
			// pojawienie elementów: sekcji 1, nagłówków sekcji 2, 3 i 5 
			// tablica z id elementów poza funkcją
	
			// ZASADY KONSTRUKCJI DOM DO POJAWIANIA ELEMENTÓW
			// - pojedynczy element: musi mieć klasę "appears" i własne id
			// - elementy sekwencyjne: nie muszą mieć id, tylko klasę "appears_seq"
			// i rodzica z id oraz klasą "appears_box"
	
	for(var i=0; i<pojawiane.length; i++) {
		element = document.getElementById(pojawiane[i]);
		offset = countOffset(element);
		
		trig_gora = offset + 150;							// górny trigger pojawienia
		trig_dol = offset + element.offsetHeight - 150;		// dolny trigger pojawienia
		
		if((dol_ekranu > trig_gora) && (gora_ekranu < trig_dol)) {		// jest na ekranie 
			element.style.animation = "appear 1.5s ease-out forwards";
			pojawiane.splice(i, 1);			// usuwa pojawiony element z tablicy, żeby nie sprawdzać go już przy każdym scrollu
		  }
	  }
			// koniec
	
			// pojawienie sekwencji okienek w sekcji 2 - services 
			// i animacja ich zawartości - paski skilli i liczb statystyk
			// [ tablica z id elementów ładowana na starcie w index.html ]
	
	for(var i=0; i<pojawiane2.length; i++) {
		element = document.getElementById(pojawiane2[i]);
		offset = countOffset(element);
		
		trig_gora = offset + 150;							// górny trigger pojawienia
		trig_dol = offset + element.offsetHeight - 150;		// dolny trigger pojawienia
		
					// uwzględnić ustawienie w kolumnie przy mniejszych rozdzielczościach
		
		if((dol_ekranu > trig_gora) && (gora_ekranu < trig_dol)) {		// jest na ekranie 
			for(var j=0; j<element.children.length; j++) {		// sekwencyjne pojawienie okienek
				element.children[j].style.animation = "appear 1.5s ease-out "+(j*0.2)+"s forwards";
			  }
			
			
				// napełnienie pasków skilli w sekcji 2 - services
			if(pojawiane2[i] == "skills_box") {
				var meters = document.getElementsByClassName("meter_box");
				
				for(var k=0; k<meters.length; k++) {
					meters[k].firstChild.style.animation = "meter"+(k+1)+" 2s ease-out 0.3s forwards";			// delay 0.3 żeby zdążyły się pojawić
				  }
		  }
				// koniec paskow skilli
			
				// countery statystyk w sekcji 2 - services
			if(pojawiane2[i] == "stats_box") {
				var counters = document.getElementsByClassName("counter");
				
				for(let counter of counters) {
					var goal = counter.innerHTML;
					var time = 2; 		// sekundy
					var time_step = Math.floor((time*1000)/goal);
					var count_step = 1;
					if(time_step < 20) {		// odświeżanie szybciej niż 50 razy na sekundę - nie nadąża się wyświetlać, trzeba zwiększyć krok liczenia
						time_step = 20;
						count_step = Math.ceil(goal/((1000/time_step)*time));	// zwiększamy krok
					  }
					counter.innerHTML = "0";
					setTimeout(countUp, time_step, counter, goal, time_step, count_step);
				  }
		  }
				// koniec counterów statystyk
			
			
			pojawiane2.splice(i, 1);			// usuwa pojawiony element z tablicy, żeby nie sprawdzać go już przy każdym scrollu
		  }
	  }
			// koniec sekwencji okienek i animacji ich zawartości

  }

function findIds(klasa) {
	// znajduje id elementów o podanej klasie 
	//- używane przez scrollManager
	
	var tablica = [];
	var obiekty = document.getElementsByClassName(klasa);
	
	for(let obj of obiekty) {
		tablica.push(obj.id);
	  }
	return tablica;
  }

function countOffset(element) {
	// liczy offset elementu od początku strony, uwzględniając offsety rodziców
	
	var offset = 0;
	do { 
		offset += element.offsetTop;
		element = element.offsetParent;
	  } while(element != null);
		
	return offset;
  }

function countUp(element, goal, time_step, count_step) {
	// rekurencyjnie zwiększa zawartość elementu DOM do ustalonej wielkości 
	// o ustalony krok i z ustaloną szybkością (parametry wyliczane 
	// w funkcji scorllManager)
	
	var now = parseInt(element.innerHTML)+count_step;
	if(now < goal) {
		element.innerHTML = now;
		setTimeout(countUp, time_step, element, goal, time_step, count_step);
	  } else {
		element.innerHTML = goal;
	  }
  }
	