/*
* The game contains 13 levels with increasing difficulty and varying challenges.
* In each level you have a distance gauge of 30,000km and you have to find 10 different places.
* When the name of a place appears, click on the map where you think it is placed before the end of the allowed time (10 seconds).
* If you make an error, your distance gauge decreases according to the offset in km between your click and the real place.
* If you don't answer in the allowed time, you get a penalty of 10,000km
* If your gauge gets to zero, the game is over and you can see and share your score.
* When you finish a level, the remaining km are added to your score.
* Levels:
* - Countries (easy)
* - Famous places (easy)
* - Capitols (easy)
* - USA states (10,000kn only)
* - Countries (medium)
* - Famous places (medium)
* - Capitols (medium)
* - USA capitols (10,000km only)
* - Countries (hard)
* - Famous places (hard)
* - Capitols (hard)
* - TBD
* - TBD
*/


/** Variables summary **/

/*
a: all data (countries, capitols, places...)
b: Uint8Array during data load
c: canvas context
d: function used to display the earth (flat or 3D)
e: current state of the game (1: home screen, 2: level description, 3: puzzle, 4: game over)
f: stars position
g: game over
h: time counter (10s / 600 frames per puzzle)
i: loop var
j: loop var
k: loop var
l: console.log
m: current level (0-12)
n: current question (0-9)
o: time counter (.5s / 30 frames display + 2s / 120 frames alert) after a click on a puzzle before showing the next one
p: closest point
q: distance to closest point
r: current level score
s: setInterval handler
t: all countries 
u: easy countries shuffled
v: medium countries shuffled
w: hard countries shuffled
x: current X coordinate to draw
y: current Y coordinate to draw
z: all capitols
A: easy capitols shuffled
B: medium capitols shuffled
C: hard capitols shuffled
D: all places
E: easy places shuffled
F: medium places shuffled
G: hard places shuffled
H: function that draws the presentation screen for a level
I: X coordinate clicked
J: Y coordinate clicked
K: clicked inside a country or not
L:
M: Math
N: current "side" (-1 left, 1 right) of a country on the 3D view
O: current subpath (island)
P: current path (whole country)
Q:
R: total score
S: stars rotation offset
T: world rotation offset
U:
V:
W: canvas
X: temp var
Y: temp var
Z: temp var
_:
$:

*/


/** Console log shortcut */
l = function(a){ console.log(a) }

/** Initializations **/

// Math
M = Math;

// Context
c = W.getContext("2d");

// Game states
e  =  0;

// Stars
f = [];
for(i = 0; i < 300; i++){
    f[i] = [M.random() * 1200, M.random() * 650, M.random() + .5];
}

// Game over
g = 0;

// time counter
h = 0;

// Answer time counter
o = 0;

// Min distance to a country
q = 2000;

// All countries
t = [];

// Easy countries
u = [];

// Medium countries
v = [];

// Hard countries
w = [];

// All capitols
z = [];

// Easy capitols
A = [];

// Medium capitols
B = [];

// Hard capitols
C = [];

// All places
D = [];

// Easy places
E = [];

// Medium places
F = [];

// Hard places
G = [];

// Coordinates clicked
I = 0;
J = 0;

// Country clicked
K = 0;

// Total score
R = 0;

// Stars rotation
S = 0;

// Earth rotation
T = 0;



/** Data **/

// Load the data in AJAX, as an arrayBuffer
with(new XMLHttpRequest){
    open("GET", "data.bin"), 
    responseType = 'arraybuffer', 
    send(), 
    onload = function(){
        a = "";
        for(i in b = new Uint8Array(response)) a += String.fromCharCode(b[i]);
        a = a.split("þ");
        for(i = 0; i < a.length - 1; i += 2){
            
            X = [a[i], a[i + 1]];
            Y = [a[i].split(",")[0], a[i + 1].split("ÿ")];
            Z = [a[i].split(",")[0], a[i].split(",")[1], a[i + 1].split("ÿ")];
            t.push(Y);
            z.push(Z);
            

            // Retrieve easy countries and capitols
            if(i < 2 * 76){
                u.push(Y);
                A.push(Z);
            }
            
            // Retrieve medium countries and capitols
            else if(i < 2 * (76 + 47)){
                v.push(Y);
                B.push(Z);
            }
            
            // Retrieve hard countries and capitols
            else if(i < 2 * (76 + 47 + 74)){
                w.push(Y);
                C.push(Z);
            }
            
            // Retrieve easy places
            
            // Retrieve medium places
            
            // Retrieve hard places
         
        }
        
        // Shuffle the puzzles
        u.sort(X=function(){return 0.5 - M.random()});
        v.sort(X);
        w.sort(X);
        A.sort(X);
        B.sort(X);
        C.sort(X);
        
        
        
        /** Game loop **/

        s = setInterval(function(){
        
            // Reset canvas
            W.width ^= 0;
            
            /** Welcome screen **/
            
            if(e==0){
                d(1,0);
            }
            
            /** Level 1 **/
            
            // Presentation
            if(e==1){
                H(0);
                r = 30000;
            }
            
            // Game
            if(e==2){
                d(0,1,0,0,0);
            }

            /** Level 2 **/

            /** Level 3 **/

            /** Level 4 **/

            /** Level 5 **/

            /** Level 7 **/

            /** Level 8 **/

            /** Level 9 **/

            /** Level 10 **/

            /** Level 11 **/

            /** Level 12 **/

            /** Level 13 **/

            /** Score **/

            /** Game over **/

        }, 33);
    }
}


/** Draw the world map and the game's UI **/

d = function(title, flat, countryorcapitolorplace, difficulty, puzzle){
    
    // Background
    W.style.background = "#75D1FF";
    W.style.background = flat ? "radial-gradient(#75D1FF 50%, #3591bF)" : "#000";
    
    // Earth / star rotation
    if(!flat){
        S--;
        S %= 1200;
        T += 1;
        T %= 220;
        N = 0;
    }

    // Text title screen
    if(title){
        c.fillStyle = "#fff";
        c.font = "300px Impact, Charcoal";
        c.fillText("GE", 30, 375, 300);
        c.fillText("Quiz", 620, 375, 500);
        c.font = "30px Impact, Charcoal";
        c.fillText("JS13kGames 2015", 900, 405);
        c.font = "80px Impact, Charcoal";
        c.fillText("START", 500, 570);
    }
    
    // Stars
    if(!flat){
        for(i = 0; i < 300; i++){
          c.beginPath();
          c.arc(f[i][0] + S, f[i][1], f[i][2] + M.random() * .5, 0, 7);
          c.arc(f[i][0] + S + 1200, f[i][1], f[i][2] + M.random() * .5, 0, 7);
          c.fill();
          
        }
    }
    
    // UI
    if(flat){
        c.rect(0, 0, 1200, 66);
        c.fill();
        c.beginPath();
        c.fillStyle = "#fff";
        c.rect(0, 60, h * 4, 5);
        c.fill();
        c.font = "40px Impact, Charcoal";
        c.fillText(["Country: ","Capitol: ","Place: "][countryorcapitolorplace] + [[u,v,w],[A,B,C],[E,F,G]][countryorcapitolorplace][difficulty][puzzle][0], 10,45);
    }
    
    
    // Blue circle
    if(!flat){
        c.beginPath();
        gradient = c.createLinearGradient(300,0,600,0);
        gradient.addColorStop(0,"#75D1FF");
        gradient.addColorStop(1,"#3591bF");
        c.fillStyle = gradient;
        c.arc(470, 260, 140, 0, 7);
        c.fill();
    }
    
    // Draw countries
    c.strokeStyle = "#83864F";
    c.fillStyle = "#95D866";
    for(i = 0; i < t.length; i++){
        P = t[i][1];
        for(j = 0; j < P.length; j++){
            O = P[j];
            c.beginPath();
            
            // Map (flat)
            if(flat){
                //c.moveTo(O.charCodeAt(0) * 4 + 50 - .1,  O.charCodeAt(1) * 2 + 50 - .1);
                for(k = 0;k < O.length; k += 2){
                    x = O.charCodeAt(k);
                    y = O.charCodeAt(k + 1);
                    c.lineTo(x * 4.6 + 40, y * 2.3 + 70);
                }
                c.closePath();
                c.fill();
                c.stroke();
            }
            
            // Globe (3D)
            else{
  
                for(k = 0; k < O.length; k += 2){
                    x = (O.charCodeAt(k) + 220 - T) / 110;
                    y = -(O.charCodeAt(k + 1) - 120) / 150;
                    while(x > 1) x-=2;
                    if(x > -1 && x < -.5) x = -0.5;
                    if(x > .5 && x < 1) x = 0.5;
                    if(!k && t[i][0] != "Russia" && t[i][0] != "Canada"){
                        if(x < 0) N = -.5;
                        if(x > 0) N = .5;
                    }
                    if(t[i][0] == "Russia"){
                        N = -.5;
                        if(T > 70) N = .5;
                        if(T > 170) N = -.5;
                    }
                    if(t[i][0] == "Canada"){
                        N = .5;
                        if(T > 40) N = -.5;
                        if(T > 140) N = .5;
                    }
                    if((x <= -.5 || x >= .5)) x = N;
                    x = M.sin(x * M.PI) * M.cos(y * M.PI / 2);
                    y = M.sin(-y * M.PI / 2);
                    x = x * 140 + 470;
                    y = y * 140 + 260;
                    c.lineTo(x, y);

                }
                c.closePath();
                c.fill();
                c.stroke();
                
                
            }
        }
    }
    
    // After a click, show the good country, the distance, etc
    if(flat && (I || J)){

        P = [[u,v,w],[A,B,C],[E,F,G]][countryorcapitolorplace][difficulty][puzzle][1];
        
        // Draw the target country
        for(j = 0; j < P.length; j++){
            O = P[j];
            c.fillStyle = "yellow";
            c.beginPath();
            
            //c.moveTo(O.charCodeAt(0) * 4.6 + 40 - .1,  O.charCodeAt(1) * 2.3 + 70 - .1);
            for(k = 0;k < O.length; k += 2){
                x = O.charCodeAt(k);
                y = O.charCodeAt(k + 1);
                c.lineTo(x * 4.6 + 40, y * 2.3 + 70);
                
                // Compute the distance between point and flag
                X = M.sqrt(M.pow((x * 4.6 + 40) - I, 2) + M.pow((y * 2.3 + 70) - J, 2));
                //if(o==1) l(X);
                
                // Save it if it's the smallest
                if(X < q){
                    q = X;
                    p = [x * 4.6 + 40, y * 2.3 + 70];
                }
            }
            
            
            //if(o==1) l(q);
            
            if(c.isPointInPath(I, J)) K = 1;
            c.closePath();
            c.fill();
            c.stroke();
        }
        
        
        // Drop flag
        c.fillStyle = "blue";
        c.beginPath();
        c.moveTo(I,J);
        c.lineTo(I-1, J);
        c.lineTo(I-1, J-40);
        c.lineTo(I, J-40);
        c.lineTo(I+20, J-30);
        c.lineTo(I, J-20);
        c.stroke();
        c.fill();
        
        if(!K){
            c.strokeStyle = "red";
            c.lineWidth = "2";
            c.setLineDash([5, 5]);
            c.beginPath();
            c.moveTo(I, J);
            c.lineTo(p[0], p[1]);
            c.stroke();
        }
        
        // Count until the next
        o++;
        
        if(o > 30){
            c.textAlign = "center";
            c.fillStyle = "#000";
            c.font = "100px Impact, Charcoal";
            if(K || q < 5){
                c.fillText("PERFECT", 600, 350);
            }
            else{
                c.fillText(["GREAT","NICE","HMMM","MEH","OWW","NOOO"][~~(q/30)] || "EEEK", 600, 350);
                c.font = "50px Impact, Charcoal";
                c.fillText("You're " + ( q < 100  ?  (~~(q/5))*100  :  (~~(q/50))*1000 ) + "km away", 600, 400);
                
                
            }
        }
    }
    
    // Time out
    if(flat && h == 0){
        c.textAlign = "center";
        o++;
        c.fillStyle = "#000";
        c.font = "100px Impact, Charcoal";
        c.fillText("TIME OUT", 600, 350);
        c.font = "50px Impact, Charcoal";
        c.fillText("10,000km penalty", 600, 400);
        
    }
    
    if(flat && !o) h--;
}

/** Draw a level's homescreen **/
H = function(n){
    
    // Background
    W.style.background = "#000";
    c.fillStyle = "#fff";
    c.font = "60px Impact, Charcoal";
    c.textAlign = "center";
    c.fillText("Level " + (n+1) + ":", 600, 280, 800);
    c.fillText("World Countries (easy)", 600, 360, 800);
    
}

/** Handle Clicks **/
W.onclick = function(a){
    
    // Home screen
    if(e==0){
        e = 1;
    }
    
    // Level presentation screen
    else if(e==1){
        e = 2;
        h = 300;
    }
    
    // Puzzle screen
    else if(e==2 && !o){
        I = a.pageX;
        J = a.pageY;
    }
}