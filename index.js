/*
* The game contains 13 levels with increasing difficulty and varying challenges.
* In each level you have an error gauge of 30, 000km and you have to find 10 different places.
* When the name of a place appears,  click on the map where you think it is placed before the end of the allowed time (10 seconds).
* If you make an error,  your error gauge decreases according to the offset in km between your click and the real place.
* If you don't answer in the allowed time,  you get a penalty of 10, 000km
* If your gauge gets to zero,  the game is over and you can see and share your score.
* When you finish a level,  the remaining km are added to your score.
* Levels:
* - Countries (easy)
* - Famous places (easy)
* - Capitols (easy)
* - USA states
* - planets of the solar system
* - Countries (medium)
* - Famous places (medium)
* - Capitols (medium)
* - USA capitols
* - Countries (hard)
* - Famous places (hard)
* - Capitols (hard)
* - Satellites of planets of the solar system
*/


/** Variables summary **/

/*
a: all data (countries,  capitols,  places)
b: Uint8Array during data load
c: canvas context
d: function used to display the earth (flat or 3D)
e: current state of the game (1: home screen,  2: in-game,  3: game over)
f: stars position
g: game over
h: 
i: loop var
j: loop var
k: loop var
l: console.log
m: current level (0-12)
n: current question (0-9)
o: current earth rotation offset
p: current target
q: current distance from target
r: current score
s: setInterval handler
t: all countries 
u: easy countries shuffled
v: medium countries shuffled
w: hard countries shuffled
x: X coord
y: Y coord
z: all capitols
A: easy capitols shuffled
B: medium capitols shuffled
C: hard capitols shuffled
D: all places
E: easy places shuffled
F: medium places shuffled
G: hard places shuffled
H:
I:
J:
K:
L:
M: Math
N: Current side of a country on a 3D view
O: Current subpath (island)
P: Current path (whole country)
Q:
R:
S: Stars rotation offset
T: World rotation offset
U:
V:
W: Canvas
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
    f[i] = [M.random() * 1200, M.random() * 650, M.random() * 2];
}

// Game over
g = 0;

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
        
        
        
        
        
        /** Game loop **/

        s = setInterval(function(){
        
            // Reset canvas
            W.width ^= 0;
            
            /** Welcome screen **/
            
            if(e==0) d(1,0);

            /** Level 1 **/
            if(e==1) d(0,1);

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

        }, 16);
    }
}


/** Draw the game **/

d = function(title, flat, country, capitol, place){
    
    // Background
    W.style.background = flat ? "#def" : "#000"
    
    // Earth / star rotation
    if(!flat){
        S--;
        S %= 1200;
        T += .5;
        T %= 220;
        N = 0;
    }

    // Text title screen
    if(title){
        c.fillStyle = "#fff";
        c.font = "300px Impact, Charcoal";
        c.fillText("GE      Quiz", 30, 380);
        c.font = "30px Impact, Charcoal";
        c.fillText("JS13kGames 2015", 880, 410);
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
    
    
    c.beginPath();
    c.fillStyle = "#75D1FF";
    if(!flat){
        c.arc(470, 290, 140, 0, 7);
    }
    
    c.fill();
    c.strokeStyle = "#83864F";
    c.fillStyle = "#95D866";
    for(i = 0; i < t.length; i++){
        P = t[i][1];
        for(j = 0; j < P.length; j++){
            O = P[j];
            c.beginPath();
            
            
            if(flat){
                //c.moveTo(O.charCodeAt(0) * 4 + 50 - .1,  O.charCodeAt(1) * 2 + 50 - .1);
                for(k = 0;k < O.length; k += 2){
                    x2 = O.charCodeAt(k);
                    y2 = O.charCodeAt(k + 1);
                    c.lineTo(x2 * 4.4 + 40, y2 * 2.2 + 30);
                }
                c.closePath();
                c.fill();
                c.stroke();
            }
            
            else{
                for(k = 0; k < O.length; k += 2){
                    x2 = (O.charCodeAt(k) + 220 - T) / 110;
                    y2 = -(O.charCodeAt(k + 1) - 120) / 150;
                    while(x2 > 1) x2-=2;
                    if(x2 > -1 && x2 < -.5) x2 = -0.5;
                    if(x2 > .5 && x2 < 1) x2 = 0.5;
                    if(!k && t[i][0] != "Russia" && t[i][0] != "Canada"){
                        if(x2 < 0) N = -.5;
                        if(x2 > 0) N = .5;
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
                    if((x2 <= -.5 || x2 >= .5)) x2 = N;
                    x2 = M.sin(x2 * M.PI) * M.cos(y2 * M.PI / 2);
                    y2 = M.sin(-y2 * M.PI / 2);
                    x2 = x2 * 140 + 470;
                    y2 = y2 * 140 + 290;
                    c.lineTo(x2, y2);

                }
                c.closePath();
                c.fill();
                c.stroke();
            }
            
        }
    
    }
}

/* Handle Clicks */
onclick = function(){
    if(e==0){
        e=1;
    }
}