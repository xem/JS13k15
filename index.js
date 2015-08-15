/*
* JS13kGames 2015 - GEO Quiz - Maxime EUZIERE
*
* The game contains 13 levels with increasing difficulty and varying challenges.
* The goal is to go through the 13 levels of the game and try to find the countries, capitols and places that appear on screen, ten by ten.
* Sometimes, the levels can be reversed!
*
* Explorer mode:
* -------------
*
* In this mode, you can't lose. It's made to help you learn the world's geography without time limit.
* At the end, you get a score corresponding to your cumulated mistakes.
* Try to make the lowest score possible and learn things!
*
* Traveler mode:
* --------------
*
* This mode is a real challenge.
* In each level, you have an error gauge of 30,000km and you have to find 10 different places.
* When the name of a place appears, click on the map where you think it is placed before the end of the allowed time (10 seconds).
* If you make an error, your error gauge decreases according to the offset in km between your click and the real place.
* If you don't answer in the allowed time, you get a penalty of 10,000km.
* When you finish a level, the remaining km are added to your score.
* If your gauge gets to zero, the game is over.
*
* Levels:
* -------
*
* - Countries (easy)
* - Capitols (easy)
* - Famous places (easy)
* - USA states (easy)
* - Countries (medium)
* - Capitols (medium)
* - Famous places (medium)
* - USA capitols (easy)
* - Countries (hard)
* - Capitols (hard)
* - USA states (hard)
* - Famous places (hard)
* - USA capitols (hard)
*/


/* Variables summary:
  -------------------

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
n: current puzzle (0-9)
o: time counter (.5s / 15 frames display + 2s / 60 frames alert) after a click on a puzzle before showing the next one
p: closest point
q: distance to closest point
r: current level score
s: setInterval handler
t: all countries and capitols
u: easy countries shuffled
v: medium countries shuffled
w: hard countries shuffled
x: current X coordinate to draw
y: current Y coordinate to draw
z: -
A: easy capitols shuffled
B: medium capitols shuffled
C: hard capitols shuffled
D: -
E: easy places shuffled
F: medium places shuffled
G: hard places shuffled
H: function that draws the presentation screen for a level
I: X coordinate clicked
J: Y coordinate clicked
K: clicked inside a country or not
L: -
M: Math
N: current "side" (-1 left, 1 right) of a country on the 3D view
O: current subpath (island)
P: current path (whole country)
Q: -
R: total score
S: stars rotation offset
T: world rotation offset
U: -
V: -
W: canvas
X: temp var
Y: temp var
Z: temp var
_: temp var
$: temp var

*/

/** Initializations **/

// Math
M = Math;

// Game data
a = "";

// Context2d
c = W.getContext("2d");

// Game status
e = 0;

// Stars position and size
f = [];
for(i = 0; i < 300; i++) f[i] = [M.random() * 1200, M.random() * 650, M.random() + .5];

// Game over
g = 0;

// time counter
h = 0;

// Log
l = function(a){ console.log(a) }

// Level
m = 0;

// Puzzle
n = 0;

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

// Side of a country
N = 0;

// Country clicked perfectly
K = 0;

// Total score
R = 0;

// Stars scroll offset
S = 0;

// Earth rotation offset
T = 0;



/** Gather data **/

// Load the game's data in AJAX, as an arrayBuffer, from the file called "0"

with(new XMLHttpRequest){
    open("GET", 0), 
    responseType = 'arraybuffer', 
    send(), 
    onload = function(){
        
        // Fill a with the file's text content
        for(i in b = new Uint8Array(response)) a += String.fromCharCode(b[i]);
        
        // Separate entries using "þ"
        a = a.split("þ");
        
        // Loop on all the entries
        for(i = 0; i < a.length - 1; i += 2){
            
            // Make an array with [country, capitol, coords, capitol coords] or [place, , coords, ]
            Z = [a[i].split(",")[0], a[i].split(",")[1], a[i + 1].split("ÿ")];
            
            // The last 2 chars are the capitol's coordinates. 
            z[3] = Z[2][Z[2].length - 1].slice(-2);
            Z[2][Z[2].length - 1] = Z[2][Z[2].length - 1].slice(0,-2);
            
            // Add it to the list of all countries and capitols
            t.push(Z);

            // Retrieve easy countries and capitols
            if(i < 2 * 76){
                u.push(Z);
                A.push(Z);
            }
            
            // Retrieve medium countries and capitols
            else if(i < 2 * (76 + 47)){
                v.push(Z);
                B.push(Z);
            }
            
            // Retrieve hard countries and capitols
            else if(i < 2 * (76 + 47 + 74)){
                w.push(Z);
                C.push(Z);
            }
            
            // Retrieve easy places
            
            // Retrieve medium places
            
            // Retrieve hard places
         
        }
        
        // Shuffle the levels' puzzles
        X = function(){return .5 - M.random()}
        u.sort(X);
        v.sort(X);
        w.sort(X);
        A.sort(X);
        B.sort(X);
        C.sort(X);
        
        /** Game loop **/

        s = setInterval(function(){
        
            // Reset canvas
            W.width ^= 0;
            
            // Welcome screen
            if(e == 0){
                d(1, 0);
            }
            
            // Level presentation
            if(e == 1){
                H();
            }
            
            // Puzzle
            if(e == 2){
                
                // Level 1
                if(m == 0){
                    d(0,1,0,0,n);
                }
                
                // Level 2
                if(m == 1){
                    d(0,1,1,0,n);
                }
                
                /*
                // Level 3
                if(m == 2){
                    d(0,1,2,0,n);
                }
                
                // Level 4
                if(m == 3){
                    m++;
                    //d(0,1,0,0,n);
                }
                
                // Level 5
                if(m == 4){
                    d(0,1,0,1,n);
                }
                
                // Level 6
                if(m == 5){
                    d(0,1,1,1,n);
                }
                
                // Level 7
                if(m == 6){
                    d(0,1,2,1,n);
                }
                
                // Level 8
                if(m == 7){
                    m++; //d(0,1,0,0,n);
                }
                
                // Level 9
                if(m == 8){
                    d(0,1,0,2,n);
                }
                
                // Level 10
                if(m == 9){
                    d(0,1,1,2,n);
                }
               
                // Level 11
                if(m == 10){
                    d(0,1,2,2,n);
                }
                
                // Level 12
                if(m == 11){
                    d(0,1,0,0,n);
                }
                
                // Level 13
                if(m == 12){
                    d(0,1,0,0,n);
                }
                */
            }

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
        c.fillText(["Country: ","Capitol: ","Place: "][countryorcapitolorplace] + [[u,v,w],[A,B,C],[E,F,G]][countryorcapitolorplace][difficulty][puzzle][[0,1,0][countryorcapitolorplace]], 10, 45);
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
        P = t[i][2];
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

        P = [[u,v,w],[A,B,C],[E,F,G]][countryorcapitolorplace][difficulty][puzzle][2];
        
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
            
            if(c.isPointInPath(I, J)) K = 1;
            c.closePath();
            c.fill();
            c.stroke();
        }
        
        
        // Drop flag
        if(!K){
            c.fillStyle = "green";
            c.strokeStyle = "green";
            c.beginPath();
            c.moveTo(p[0],p[1]);
            c.lineTo(p[0]-1, p[1]);
            c.lineTo(p[0]-1, p[1]-40);
            c.lineTo(p[0], p[1]-40);
            c.lineTo(p[0]+20, p[1]-30);
            c.lineTo(p[0], p[1]-20);
            c.stroke();
            c.fill();
            
            c.strokeStyle = "red";
            c.lineWidth = "2";
            c.setLineDash([5, 5]);
            c.beginPath();
            c.moveTo(I, J);
            c.lineTo(p[0], p[1]);
            c.stroke();
        }
        
        c.setLineDash([0,0]);
        c.fillStyle = "blue";
        c.strokeStyle = "blue";
        c.beginPath();
        c.moveTo(I,J);
        c.lineTo(I-1, J);
        c.lineTo(I-1, J-40);
        c.lineTo(I, J-40);
        c.lineTo(I+20, J-30);
        c.lineTo(I, J-20);
        c.stroke();
        c.fill();
        
        // Count until the next
        o++;
        
        if(o > 15){
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
    
    // Next puzzle
    // Black screen for 5 frames
    if(o>85){
        c.fillStyle = "#000";
        c.fillRect(0,0,1200,650);
    }
    
    // Reset everything for next puzzle
    if(o == 90){
        n++;
        I = 0;
        J = 0;
        o = 0;
        K = 0;
        h = 300;
        q = 2000;
        
        // If level 10: reset everything for next level
        if(n == 10){
            n = 0;
            m++;
            e = 1;
            r = 30000;
        }
    }
}

/** Draw a level's homescreen **/
H = function(){
    
    // Background
    W.style.background = "#000";
    c.fillStyle = "#fff";
    c.font = "60px Impact, Charcoal";
    c.textAlign = "center";
    c.fillText("Level " + (m+1) + ":", 600, 280, 800);
    c.fillText([
    "World Countries (easy)",
    "Capitols (easy)",
    /*
    "Famous places (easy)",
    "World Countries (medium)",
    "Capitols (medium)",
    "Famous places (medium)",
    "World countries (hard)",
    "Famous places (hard)",
    "Capitols (hard)"
    */
    ][m], 600, 360, 800);
    
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