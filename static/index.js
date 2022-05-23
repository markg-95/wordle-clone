let num_word_guesses = 0;
let current_char_in_word = 0;
let correct_word = "";
let current_guess = "";
let max_number_of_guesses = 6;
let word_length = 5;
let wrong_letters = [];
let letters = "abcdefghijklmnopqrstuvwxyz";
let has_won = false;

window.onload = function(){
    
    correct_word = document.getElementById("secret_word").innerText;
    document.getElementById("secret_word").style.visibility='collapsed';
    

    make_boxes();
    make_keyboard();
    window.onkeydown = function(gfg){
        if(gfg.keyCode==13){
            // enter key pressed. 
            // check if word is correct
            if(current_guess.length==word_length && num_word_guesses < max_number_of_guesses){
                // console.log("Guess made!");
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
                        if(wrong_letters.indexOf(current_guess[i])<0){
                            wrong_letters.push(current_guess[i]);
                        }
                    }

                }
                // update UI showing wrong letters
                for(let letter of wrong_letters){
                    let corresponding_key = document.getElementById(`key_button_${letter}`);
                    corresponding_key.classList.add("wrong_key");
                }
                if(current_guess==correct_word){
                    console.log("Winner!");
                    
                }
                num_word_guesses += 1;
                current_guess="";
            }
            if(num_word_guesses>=max_number_of_guesses && ! has_won){
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
            enter_letter(gfg.keyCode, "typed")
        }
        document.getElementById("debug").innerHTML = `Current Guess: ${current_guess}. Length: ${current_guess.length}. Number of Guesses Made: ${num_word_guesses}.`;
        // console.log(gfg.keyCode);
    }
}


function make_boxes(){
    let wrapper = document.getElementById("center");
    let big_box = document.createElement("div");
    big_box.className = "big_box";
    for(let j = 0; j<max_number_of_guesses; j++){
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

function make_keyboard(){
    let keys = 'qwertyuiopassdfghjklzxcvbnm';
    let keyboard_div = document.getElementById("virtual_keyboard");
    let top_row = document.createElement("div");
    top_row.className = "key_row";
    let middle_row = document.createElement("div");
    middle_row.className = "key_row";
    let bottom_row = document.createElement("div");
    bottom_row.className = "key_row";
    let c = 0;
    for(let key of keys){
        let kb = document.createElement("button");
        kb.innerText = key;
        kb.className = "key_button";
        kb.id = `key_button_${key}`;
        kb.setAttribute("type", "button");
        kb.onclick = function(){
            enter_letter(key, "button");
        };
        if(c<=9){
            top_row.appendChild(kb);
        }
        else if(c<=19){
            middle_row.appendChild(kb);
        }
        else{
            bottom_row.appendChild(kb);
        }
        c++;
    }
    keyboard_div.appendChild(top_row);
    keyboard_div.appendChild(middle_row);
    keyboard_div.appendChild(bottom_row);
}

function enter_letter(key, input_type){
    console.log(key);
    if(current_guess.length<5){
        let letter = "";
        if(input_type=='typed'){
            let letter_index = key - 65;
            letter = letters.substring(letter_index,letter_index+1);
            console.log("typed");
        }
        else{
            // pressed virtual keyboard button
            letter = key;
            console.log("here");
        }
        current_guess = current_guess + letter;
        
        let current_box_id = num_word_guesses + "," + (current_guess.length-1);
        console.log(`Guessed: ${letter}. CurrentBoxID=${current_box_id}`);
        document.getElementById(current_box_id).innerText=letter;
    }
    console.log(key);
}