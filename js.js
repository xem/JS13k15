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

// Level score
r = 30000;

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


/** Gather & shuffle the data **/

// Load the game's data in AJAX, as an arrayBuffer, from the file called "0"

with(new XMLHttpRequest){
    open("GET",0), 
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
            Z[3] = Z[2][Z[2].length - 1].slice(-2);
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
                d(0);

                // Text
                c.fillStyle = "#fff";
                c.font = "300px Impact, Charcoal";
                c.fillText("GE", 30, 375, 300);
                c.fillText("Quiz", 620, 375, 500);
                c.font = "30px Impact, Charcoal";
                c.fillText("JS13kGames 2015", 900, 405);
                c.font = "80px Impact, Charcoal";
                c.fillText("START", 500, 570);
            }
            
            // Level presentation
            if(e == 1){
                H();
            }
            
            // Puzzle
            if(e == 2){
                
                // Level 1
                if(m == 0) d(1,0,0,n);
                
                // Level 2
                if(m == 1) d(1,1,0,n);
                
                // Level 3
                if(m == 2) d(1,2,0,n);
                
                // Level 4
                if(m == 3) d(1,0,1,n);
                
                // Level 5
                if(m == 4) d(1,1,1,n);
                
                // Level 6
                if(m == 5) d(1,2,1,n);
                
                // Level 7
                if(m == 6);// d(1,0,2,n);
                
                // Level 8
                if(m == 7);// d(1,1,2,n);
                
                // Level 9
                if(m == 8);// d(1,2,2,n);
                
                // Level 10
                if(m == 9);
               
                // Level 11
                if(m == 10);
                
                // Level 12
                if(m == 11);
                
                // Level 13
                if(m == 12);
            }

            /** Game over **/

        }, 33);
    }
}


/** Draw the world map and the game's UI **/

d = function(flat, countryorcapitolorplace, difficulty, puzzle){
    
    // Background
    W.style.background = flat ? "radial-gradient(#75D1FF 50%, #3591bF)" : "#000";
    
    // 2D view
    if(flat){
        
        // UI
        c.rect(0, 0, 1200, 66);
        c.fill();
        c.beginPath();
        c.fillStyle = "#fff";
        c.rect(0, 60, h * 4, 5);
        c.fill();
        c.font = "40px Impact, Charcoal";
        c.fillText(["Country: ","Capitol: ","Place: "][countryorcapitolorplace] + [[u,v,w],[A,B,C],[E,F,G]][countryorcapitolorplace][difficulty][puzzle][[0,1,0][countryorcapitolorplace]], 10, 45);
        
        c.textAlign = "right";
        c.fillText(r + "km remaining", 1190, 45)
    }
    
    // 3D view
    else {
        
        // Earth rotation
        T += 1;
        T %= 220;
        
        // Star scrolling
        S--;
        S %= 1200;

        for(i = 0; i < 300; i++){
          c.fillStyle = "#fff";
          c.beginPath();
          c.arc(X = f[i][0] + S, Y = f[i][1], Z = f[i][2] + M.random() * .5, 0, 7);
          c.arc(1200 + X, Y, Z, 0, 7);
          c.fill();
        }

        // Blue circle
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
    
    if(o < 85){
        for(i = 0; i < t.length; i++){
            
            // Current country
            P = t[i][2];
            
            for(j = 0; j < P.length; j++){
                
                // Current island / territory to draw
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
    }
    
    // Gameplay
    if(flat){
        
        // After a click, show the good country, the distance, etc
        if(I || J){

            P = [[u,v,w],[A,B,C],[E,F,G]][countryorcapitolorplace][difficulty][puzzle][2];
            Q = [[u,v,w],[A,B,C],[E,F,G]][countryorcapitolorplace][difficulty][puzzle][3];
            l(Q);
            
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
                
                c.closePath();
                c.fill();
                c.stroke();
                
                // Country / place
                if(countryorcapitolorplace != 1){
                    if(c.isPointInPath(I, J)) K = 1;
                    else{
                        if(o == 15) r -= ( q < 100  ?  (~~(q/5))*100  :  (~~(q/50))*1000 );
                        if(r < 0){
                            r = 0;
                            clearInterval(s);
                            l("game over");
                        }
                    }
                }
                
                // Capitol
                else {
                    x = Q.charCodeAt(0);
                    y = Q.charCodeAt(1);
                    p = [x * 4.6 + 40, y * 2.3 + 70];
                    
                    // Compute the distance between capitol and flag
                    q = M.sqrt(M.pow((x * 4.6 + 40) - I, 2) + M.pow((y * 2.3 + 70) - J, 2));
                }
            }
            
            // Drop flag
            if(!K && q > 5){
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
                    c.fillText(["NICE!","GOOD...","MEH.","OWW...","NOOO!"][~~(q/30)] || "WRONG!", 600, 350);
                    c.font = "50px Impact, Charcoal";
                    c.fillText("You're " + ( q < 100  ?  (~~(q/5))*100  :  (~~(q/50))*1000 ) + "km away", 600, 400);
                }
            }
        }
        
        // Time out
        if(h == 0){
            c.textAlign = "center";
            o++;
            c.fillStyle = "#000";
            c.font = "100px Impact, Charcoal";
            c.fillText("TIME OUT", 600, 350);
            c.font = "50px Impact, Charcoal";
            c.fillText("10,000km penalty", 600, 400);
        }
        
        if(!o) h--;
        
        // Next puzzle
        // Black screen for 5 frames
        if(o > 85){
            c.fillStyle = "#000";
            c.fillRect(0,0,1200,650);
        }
        
        // Reset everything for next puzzle
        if(o == 90){
            n++; // puzzle
            I = 0; // MouseX
            J = 0; // Mouse Y
            o = 0; // Time counter after a click
            K = 0; // Perfect click
            h = 300; // puzzle timer
            q = 2000; // distance to target
            
            // After 10th puzzle: reset everything for next level
            if(n == 10){
                n = 0;  // puzzle
                e = 1; // state (level presentation)
                R += r; // total score
                r = 30000; // level score
                m++;  // level
                
                // After 9th level: game over (win)
                if(m == 9){
                    clearInterval(s);
                    l("game over. score: " + R);
                }
            }
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