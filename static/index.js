let num_word_guesses = 0;
let current_char_in_word = 0;
let correct_word = "";
let current_guess = "";
let max_number_of_guesses = 5;
let word_length = 5;


window.onload = function(){
    
    correct_word = document.getElementById("secret_word").innerText;
    document.getElementById("secret_word").style.visibility='hidden';
    let letters = "abcdefghijklmnopqrstuvwxyz";

    make_boxes();
    window.onkeydown = function(gfg){
        if(gfg.keyCode==13){
            // space bar
            if(current_guess.length==word_length && num_word_guesses < max_number_of_guesses){
                console.log("Guess made!");
                for(let i=0;i<word_length;i++){
                    let current_box_id = num_word_guesses + "," + i;
                    let box = document.getElementById(current_box_id);
                    if(current_guess[i]==correct_word[i]){
                        // in correct spot
                        
                        box.style.background = 'linear-gradient(0deg, rgba(79, 167, 37, 0.8) 0%, rgba(78, 78, 78,1) 100%)';
                    }
                    else if(correct_word.indexOf(current_guess[i])>=0){
                        // in word but wrong location
                        
                        box.style.background = 'linear-gradient(0deg, rgba(196, 188, 43, 0.8) 0%, rgba(78, 78, 78,1) 100%)';
                    }
                    else {
                        // not in word 
                    }

                }
                if(current_guess==correct_word){
                    console.log("Winner!");
                }
                num_word_guesses += 1;
                current_guess="";
            }
            if(num_word_guesses>=max_number_of_guesses){
                console.log("Out of Guesses...");
            }
        }
        else if(gfg.keyCode==8 || gfg.keyCode==46){
            // backspace / delete
            if(current_guess.length>0){
                let current_box_id = num_word_guesses + "," + (current_guess.length-1);
                document.getElementById(current_box_id).innerText="";
                current_guess = current_guess.substring(0,current_guess.length-1);
            }
        }
        else if(gfg.keyCode >= 65 && gfg.keyCode <=90){
            if(current_guess.length<5){
                let letter_index = gfg.keyCode - 65;
                let letter = letters.substring(letter_index,letter_index+1);
                current_guess = current_guess + letter;
                console.log(`Guessed: {letter}. Num_letter_guesses`);
                let current_box_id = num_word_guesses + "," + (current_guess.length-1);
                document.getElementById(current_box_id).innerText=letter;
            }
        }
        document.getElementById("debug").innerHTML = `Current Guess: ${current_guess}. Length: ${current_guess.length}. Number of Guesses Made: ${num_word_guesses}.`;
        // console.log(gfg.keyCode);
    }
}


function make_boxes(){
    let wrapper = document.getElementById("wrapper");
    let big_box = document.createElement("div");
    big_box.className = "big_box";
    for(let j = 0; j<5; j++){
        let small_box = document.createElement("div");
        small_box.className = "small_box";
        for(let i = 0; i<5; i++){
            let box = document.createElement("p");
            box.className = "letter_box";
            box.id = `${j},${i}`;
            small_box.appendChild(box);
        }
        big_box.appendChild(small_box);    
    }
    wrapper.appendChild(big_box);
    return;
}